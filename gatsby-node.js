const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) reject(result.errors)

        // Create blog posts pages.
        const pages = result.data.allMarkdownRemark.edges;

        const createPageWithSlug = ({ path, component, slug, otherContext = {} }) => createPage({
          path,
          component,
          context: {
            slug,
            ...otherContext
          },
        })

        pages.forEach(elm => {
          const slug = _.get(elm, 'node.fields.slug', null)
          console.log("\n 👉 Creating the page: ", slug)
          switch (true) {
            case /\/posts\//i.test(slug):
              createPageWithSlug({
                slug,
                path: slug,
                component: path.resolve('./src/templates/blogPost.js')
              })
            break;

            case /\/blog\//i.test(slug):
              createPageWithSlug({
                slug,
                path: slug,
                component: path.resolve('./src/templates/blog.js')
              })
              break;
            case /\/apps\//i.test(slug):
              createPageWithSlug({
                slug,
                path: slug,
                component: path.resolve('./src/templates/apps.js')
              })
            break;

            case /\/about\//i.test(slug):
              createPageWithSlug({
                slug,
                path: slug,
                component: path.resolve('./src/templates/about.js')
              })
            break;
          
            default:
              break;
          }
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
