const { result } = require('lodash')
const _ = require('lodash')
const path = require('path')
const { string } = require('prop-types')
const axios = require('axios')

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      }),
    )
  })

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const _algorithms = await axios.get(
    'http://localhost:4000/api/package_registry/algorithms',
  )
  console.log(_algorithms.data.data)

  const algorithms = _(_algorithms.data.data)
    .map((a) => ({
      ...a,
      publishDate: a.inserted_at,
      cost: a.default_cost,
      chargeSchema: a.default_charge_schema,
      stars: 0,
      image:
        'https://motivus.cl/favicon-32x32.png?v=e8b9681aacb5205f5c0c047f77d351df',
    }))
    .map((a) => ({
      ...a,
      lastVersion: a.versions[0],
    }))
    .map(({ lastVersion: { metadata, name }, ...a }) => ({
      ...a,
      author: metadata.author,
      abstract: metadata.short_description,
      description: metadata.short_description,
      longDescription: metadata.long_description,
      web: metadata.url,
      github: metadata.upstream_url,
      license: metadata.license,
      version: name,
    }))

  /*author: a.metadata.author,
    abstract: metadata.short_description,
    description: metadata.short_description,
    longDescription: metadata.long_description,
    web: metadata.url,
    github: metadata.upstream.url,
    license: metadata.license,
*/
  /*
  const algorithms = [
    
    {
      name: 'sii-scrapers',
      author: 'alba',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin pharetra maximus. Aenean non sodales nulla, id ultricies massa. Ut a porta velit. Integer congue justo in ante eleifend luctus. Vestibulum quis lorem sed felis rhoncus condimentum sed porttitor turpis. Duis varius sit amet ipsum quis semper. Pellentesque mattis convallis ipsum vitae malesuada. Sed a aliquam lectus. Maecenas sit amet diam fermentum, interdum lectus ut, sodales diam. Aenean in semper magna, sed porttitor justo. Fusce magna odio, lacinia in viverra sit amet, iaculis at urna. Aenean gravida ultricies pellentesque. ',
      longDescription: ``,
      publishDate: '01/10/2021',
      version: '0.0.1',
      cost: '0.12',
      web: 'www.example.com',
      github: 'github.com',
      stars: '1.9k',
      license: 'OpenSource',
    },
  ]*/

  algorithms.forEach((algorithm) => {
    const node = {
      ...algorithm,

      id: createNodeId(`Algorithm-${algorithm.name}`),
      internal: {
        type: 'Algorithm',
        contentDigest: createContentDigest(algorithm),
      },
    }
    actions.createNode(node)
  })
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getAlgorithms = makeRequest(
    graphql,
    `
    {
      allAlgorithm {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    `,
  ).then((result) => {
    // Create pages for each article.
    result.data.allAlgorithm.edges.forEach(({ node }) => {
      createPage({
        path: `client/marketplace/${node.name}`,
        component: path.resolve('src/templates/algorithm.js'),
        context: {
          id: node.id,
        },
      })
      createPage({
        path: `marketplace/${node.name}`,
        component: path.resolve('src/templates/homeAlgorithm.js'),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getArticles = makeRequest(
    graphql,
    `
    {
      allSanityPost {
        edges {
          node {
            id
            _id
            i18n_lang
            i18n_refs{
              _key
              lang
              ref {
                slug {
                  current
                }
              }
            }
            slug{
              current
            }
          }
        }
      }
    }
    `,
  ).then((result) => {
    const posts = _(result.data.allSanityPost.edges)
      .map('node')
      .keyBy('_id')
      .value()

    const getRefs = (refs, addNode = {}) =>
      _.map([...refs, { _key: addNode._id }], (n) => posts[n._key])
    const translations = _(result.data.allSanityPost.edges)
      .map(({ node }) => {
        const parent = posts[_.split(node._id, '.')[1]]

        return {
          _id: node._id,
          translations: _(
            node.i18n_refs.length
              ? getRefs(node.i18n_refs, node)
              : getRefs(parent.i18n_refs, parent),
          )
            .filter()
            .keyBy('i18n_lang')
            .mapValues((p) => `blog/${p.slug.current}`),
        }
      })
      .keyBy('_id')
      .mapValues('translations')

    // Create pages for each article.
    result.data.allSanityPost.edges.forEach(({ node }) => {
      createPage({
        path: `blog/${node.slug.current}`,
        component: path.resolve('src/templates/article.js'),
        context: {
          id: node.id,
          _id: node._id,
          translations,
        },
      })
    })
  })

  // Query for articles nodes to use in creating pages.
  return getArticles, getAlgorithms
}
