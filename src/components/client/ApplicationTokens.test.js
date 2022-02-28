import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ApplicationTokens from './ApplicationTokens'
import { ApplicationToken } from '../../models'
import { SnackbarProvider } from 'notistack'

jest.mock('../../models')

describe('ApplicationTokens', () => {
  it('renders new application token', async () => {
    const formApplicationToken = {
      description: 'example token',
    }

    const applicationTokens = [
      {
        id: 1,
        description: 'example token',
        valid: true,
        value: 'MWBatasdasdad',
        inserted_at: '2022-02-28T17:22:00',
      },
    ]

    const create = jest.fn()
    ApplicationToken.create.mockImplementation(create)
    const all = jest
      .fn()
      .mockImplementationOnce(() => [])
      .mockImplementation(() => applicationTokens)
    ApplicationToken.all.mockImplementation(all)

    render(
      <SnackbarProvider>
        <ApplicationTokens />
      </SnackbarProvider>,
    )

    userEvent.click(screen.getByRole('button', { name: /create token/i }))

    const form = screen.getByRole('presentation', {
      name: /new-application-token/i,
    })

    const description = within(form).getByRole('textbox', {
      name: /description/i,
    })
    userEvent.type(description, 'example token')
    userEvent.click(within(form).getByRole('button', { name: /submit/i }))

    await screen.findByText(/application token created successfully/i)
    await waitFor(() => expect(form).not.toBeInTheDocument())

    expect(create).toHaveBeenCalledWith(formApplicationToken)

    expect(all).toHaveBeenCalled()
    await screen.findByText(/example token/i)
  })
})
