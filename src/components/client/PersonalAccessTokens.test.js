import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PersonalAccessTokens from './PersonalAccessTokens'
import { PersonalAccessToken } from '../../models'
import { SnackbarProvider } from 'notistack'

jest.mock('../../models')

describe('PersonalAccessTokens', () => {
  it('renders new personal access token', async () => {
    const formPersonalAccessToken = {
      description: 'example token',
    }

    const personalAccessTokens = [
      {
        id: 1,
        description: 'example token',
        valid: true,
        value: 'MWBpatasdasdad',
        inserted_at: '2022-02-28T17:22:00',
      },
    ]

    const create = jest.fn()
    PersonalAccessToken.create.mockImplementation(create)
    const all = jest
      .fn()
      .mockImplementationOnce(() => [])
      .mockImplementation(() => personalAccessTokens)
    PersonalAccessToken.all.mockImplementation(all)

    render(
      <SnackbarProvider>
        <PersonalAccessTokens />
      </SnackbarProvider>,
    )

    userEvent.click(
      screen.getByRole('button', { name: /create personal access token/i }),
    )

    const form = screen.getByRole('presentation', {
      name: /new-personal-access-token/i,
    })

    const description = within(form).getByRole('textbox', {
      name: /description/i,
    })
    userEvent.type(description, 'example token')
    userEvent.click(within(form).getByRole('button', { name: /submit/i }))

    await screen.findByText(/personal access token created successfully/i)
    await waitFor(() => expect(form).not.toBeInTheDocument())

    expect(create).toHaveBeenCalledWith(formPersonalAccessToken)

    expect(all).toHaveBeenCalled()
    await screen.findByText(/example token/i)
  })
})
