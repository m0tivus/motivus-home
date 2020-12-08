import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 
import ReactMarkdown from "react-markdown"
import SEO from '../components/seo'



const ArticleTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.strapiArticle.title} description={data.strapiArticle.abstract}/>
    <h1>{data.strapiArticle.title}</h1>
    <p>by <Link to={`/authors/User_${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
    <Img fixed={data.strapiArticle.image.childImageSharp.fixed}/>
    <ReactMarkdown
      escapeHtml={false}
      source={data.strapiArticle.content}
      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
    />
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      abstract
      image {
          childImageSharp {
            fixed(width: 200, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      author {
        id
        username
        
      }
    }
  }
`