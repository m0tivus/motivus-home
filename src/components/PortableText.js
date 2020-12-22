import React from 'react'
import ReactDOM from "react-dom";
import BasePortableText from '@sanity/block-content-to-react'
import BlockContent from "@sanity/block-content-to-react";
import { Divider, Typography } from '@material-ui/core'
import urlBuilder from "@sanity/image-url";


const serializers = {
  types: {
    codepen: props => (
      <Divider></Divider>
    ),
    block: props => {
      const {style = 'normal'} = props.node;
      if (/^h\d/.test(style)) {
         const level = style
        switch (level) {
          case 'h1':
             return <Typography variant="h1">{props.children}</Typography>
          case 'h2':
            return <Typography variant="h2">{props.children}</Typography>
          case 'h3':
            return <Typography variant="h3">{props.children}</Typography>
          case 'h4':
            return <Typography variant="h4">{props.children}</Typography>
          case 'h5':
            return <Typography variant="h5">{props.children}</Typography>
          case 'h6':
            return <Typography variant="h6">{props.children}</Typography>
          case 'h7':
            return <Typography variant="h7">{props.children}</Typography>
           default:
            return <span>{props.children}</span>
        }
      }
      if (style === 'blockquote') {
        return <blockquote>{props.children}</blockquote>
      }
      if (style ==='normal') {
        return <Typography variant="body1">{props.children}</Typography>
      }
      if (style === 'li') {
        return <Typography variant="body1">esto es li: {props.children}</Typography>
      }
      // Fall back to default handling
        return BlockContent.defaultSerializers.types.block(props)
      }
  }
}   
  


const PortableText = ({blocks}) => (
  <BasePortableText blocks={blocks} serializers={serializers} />
)

export default PortableText