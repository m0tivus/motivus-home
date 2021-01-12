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
