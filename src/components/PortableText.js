import React from 'react'
import ReactDOM from 'react-dom'
import BasePortableText from '@sanity/block-content-to-react'
import BlockContent from '@sanity/block-content-to-react'
import { Box, Divider, Typography } from '@material-ui/core'
import urlBuilder from '@sanity/image-url'

const serializers = {
  types: {
    codepen: (props) => <Divider></Divider>,
    image: (props) => (
      <Box display='flex' width='100%' justifyContent='center'>
        <img
          src={props.node.asset.url}
          alt={props.node.asset.originalFilename}
        ></img>
      </Box>
    ),
    block: (props) => {
      const { style = 'normal' } = props.node
      if (/^h\d/.test(style)) {
        const level = style
        switch (level) {
          case 'h1':
            return (
              <Typography variant='h1' gutterBottom>
                {props.children}
              </Typography>
            )
          case 'h2':
            return (
              <Typography variant='h2' gutterBottom>
                {props.children}
              </Typography>
            )
          case 'h3':
            return (
              <Typography variant='h3' gutterBottom>
                {props.children}
              </Typography>
            )
          case 'h4':
            return (
              <Typography variant='h4' gutterBottom>
                {props.children}
              </Typography>
            )
          case 'h5':
            return (
              <Typography variant='h5' gutterBottom>
                {props.children}
              </Typography>
            )
          case 'h6':
            return (
              <Typography variant='h6' gutterBottom>
                {props.children}
              </Typography>
            )
          case 'h7':
            return (
              <Typography variant='h7' gutterBottom>
                {props.children}
              </Typography>
            )
          default:
            return <span>{props.children}</span>
        }
      }
      if (style === 'blockquote') {
        return <blockquote>{props.children}</blockquote>
      }
      if (style === 'normal') {
        return (
          <Typography variant='body1' align='justify' gutterBottom>
            {props.children}
          </Typography>
        )
      }
      if (style === 'li') {
        return (
          <Typography variant='body1'>esto es li: {props.children}</Typography>
        )
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props)
    },
  },
}

const PortableText = ({ blocks }) => (
  <BasePortableText blocks={blocks} serializers={serializers} />
)

export default PortableText
