/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

export const wrapRootElement = ({ element }) => {
  if (!window.Motivus.gaTrackEvent) {
    window.Motivus.gaTrackEvent = trackCustomEvent
  }
  return element
}

export const onClientEntry = () => {
  if (!/^\/account\//.test(window.location.pathname)) {
    const element = document.getElementById('static-loading')
    if (element) {
      element.className = 'hidden-static-loading'
    }
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  const newPathname = location.pathname
  const oldPathname = prevLocation ? prevLocation.pathname : null

  if (oldPathname === null && /^\/account\//.test(newPathname)) {
    console.log('loading true')
  } else {
    console.log('loafing false')
  }
}
