/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require('react')

exports.onRenderBody = ({ setHeadComponents } ) => {
  setHeadComponents([
    <React.Fragment>
      <script src="https://motivus-webpage.s3.amazonaws.com/widgetLoader.js" async></script>
      <script>
        var Motivus = window.Motivus || {};
        Motivus.client_id = '1234';
      </script>
    </React.Fragment>
])
}

