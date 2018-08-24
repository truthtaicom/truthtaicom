import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Box, Card, CardContent, Media, MediaLeft, MediaContent, Image, Title, Subtitle, Content, Section, Columns } from 'bloomer'
import Layout from '../components/Layout'

class BlogTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const author = get(this.props, 'data.site.siteMetadata.author')
    const posts = get(this.props, 'data.allMarkdownRemark.edges', null)

    return (
      <Layout>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Section>
          <Columns>
            <Box>
              <Title isSize={4}>{post.frontmatter.title}</Title>
              <Subtitle isSize={4}>{post.frontmatter.date}</Subtitle>
              <Title isSize={6}  dangerouslySetInnerHTML={{ __html: post.html }} />
            </Box>
          </Columns>

          <Columns>
            {
              posts.map((post) => (
                <Link style={{ boxShadow: 'none' }} to={post.node.fields.slug} key={post.node.fields.slug}>
                  <Card>
                    <CardContent>
                      <Media>
                        <MediaLeft>
                          <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
                        </MediaLeft>
                        <MediaContent>

                          <Subtitle isSize={6}>@{author}</Subtitle>
                        </MediaContent>
                      </Media>
                      <Content dangerouslySetInnerHTML={{ __html: post.node.html }} />
                    </CardContent>
                  </Card>
                </Link>
              ))
            }
          </Columns>
        </Section>
      </Layout>
    )
  }
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogTemplate($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    },
    allMarkdownRemark(filter: { fields: { slug: { regex: "/post/i" }} }) {
      edges {
        node {
          id
          html
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