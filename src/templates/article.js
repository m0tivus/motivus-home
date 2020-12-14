import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 
import ReactMarkdown from "react-markdown"
import SEO from '../components/seo'



const ArticleTemplate = ({ data, ...props}) => (
  <Layout { ...props}>
    <SEO title={data.sanityPost.title} description={data.sanityPost.abstract}/>
    <h1>{data.sanityPost.title}</h1>
    
    <p>by <Link to={`/authors/User_${data.sanityPost.author.id}`}>{data.sanityPost.author.name}</Link></p>
    <Img fixed={data.sanityPost.image.asset.fixed}/>
    <ReactMarkdown
      escapeHtml={false}
      source={data.sanityPost.content}
      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
    />
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    sanityPost(id: {eq: $id}) {
      title
      content
      abstract 
      image {
          asset {
            fixed(width: 200, height: 125) {
              ...GatsbySanityImageFixed
            }
          }
        }
      author {
        id
        name
        
      }
    }
  }
`