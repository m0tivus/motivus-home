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
  try {
    const _algorithms = await axios.get(
      'http://127.0.0.1:4000/api/package_registry/algorithms/',
    )
    console.log(_algorithms.data.data)

    const algorithms = _(_algorithms.data.data)
      .map((a) => ({
        ...a,
        publishDate: a.inserted_at,
        cost: a.cost,
        chargeSchema: a.charge_schema,
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
  } catch (e) {
    console.log('could not get algorithms', e)
    const algorithm = {
      publishDate: '2022-01-19T17:12:05',
      cost: '1',
      chargeSchema: 'a.charge_schema',
      stars: '0',
      image:
        'https://motivus.cl/favicon-32x32.png?v=e8b9681aacb5205f5c0c047f77d351df',
      author: 'metadata.author',
      abstract: 'metadata.short_description',
      description: 'metadata.short_description',
      longDescription: 'metadata.long_description',
      web: 'metadata.url',
      github: 'metadata.upstream_url',
      license: 'metadata.license',
      version: 'name',
      name: 'name',
    }
    const node = {
      ...algorithm,

      id: createNodeId(`Algorithm-${algorithm.name}`),
      internal: {
        type: 'Algorithm',
        contentDigest: createContentDigest(algorithm),
      },
    }
    actions.createNode(node)
  }
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
  )
    .then((result) => {
      // Create pages for each article.
      result.data.allAlgorithm.edges.forEach(({ node }) => {
        createPage({
          path: `marketplace/${node.name}`,
          component: path.resolve('src/templates/homeAlgorithm.js'),
          context: {
            id: node.id,
          },
        })
      })
    })
    .catch((e) => {
      console.log(`could not get algorithms`, e)
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

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*'
    // Update the page.
    createPage(page)
  }
}
