const _ = require('lodash')
const path = require('path')
const { string } = require('prop-types')

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

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

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
      .map(({ node }) => ({
        _id: node._id,
        translations: _(
          node.i18n_refs.length
            ? getRefs(node.i18n_refs)
            : getRefs(posts[_.split(node._id, '.')[1]].i18n_refs, node),
        )
          .map((x) => {
            console.log(x)
            return x
          })
          .filter()
          .keyBy('i18n_lang')
          .mapValues((p) => p.slug.current),
      }))
      .keyBy('_id')
      .mapValues('translations')

    // Create pages for each article.
    result.data.allSanityPost.edges.forEach(({ node }) => {
      createPage({
        path: `blog/${node.slug.current}`,
        component: path.resolve('src/templates/article.js'),
        context: {
          id: node.id,
          translations,
          posts,
        },
      })
    })
  })

  // Query for articles nodes to use in creating pages.
  return getArticles
}
