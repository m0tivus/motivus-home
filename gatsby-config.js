module.exports = {
  siteMetadata: {
    title: 'Motivus',
    description: 'High performance computing network',
    author: 'Motivus',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '2g00hyzc',
        dataset: 'production',
      },
    },
    /*{
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          'article',
          'user',
          'human'
        ],
        queryLimit: 1000,
      },
    },*/
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/motivus-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
