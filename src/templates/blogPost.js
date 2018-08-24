import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Box, Card, CardContent, Media, MediaLeft, MediaContent, Image, Title, Subtitle, Content, Section, Columns } from 'bloomer'
import Layout from '../components/Layout'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const author = get(this.props, 'data.site.siteMetadata.author')

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
        </Section>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostTemplate($slug: String!) {
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
    }
  }
`