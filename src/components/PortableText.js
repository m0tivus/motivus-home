import React from 'react'
import ReactDOM from 'react-dom'
import BasePortableText from '@sanity/block-content-to-react'
import BlockContent from '@sanity/block-content-to-react'
import { Box, Divider, Typography } from '@material-ui/core'
import urlBuilder from '@sanity/image-url'
import { makeStyles } from '@material-ui/core/styles'
import { BorderColor } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  quotes: {
    ...theme.typography.body2,
    textAlign: 'justify',
    textJustify: 'inter-word',
    borderLeft: '3px solid',
    borderColor: theme.palette.secondary.main,
  },
  h3: {
    ...theme.typography.h3,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '2rem',
    fontWeight: '700',
  },
  externalLink: {
    background: '#000',
    color: theme.palette.secondary.main,
    padding: '2px',
    textDecoration: 'none',
    fontWeight: '500',
  },
  width: {
    width: '100%',
  },
}))

const serializers = {
  marks: {
    link: ({ children, mark }) => {
      const classes = useStyles()
      return (
        <a
          className={classes.externalLink}
          href={mark.href}
          rel='noopener noreferrer'
        >
          {children}
        </a>
      )
    },
  },

  types: {
    codepen: (props) => <Divider></Divider>,
    image: (props) => (
      <Box width='100%' display='flex' justifyContent='center'>
        <img
          src={props.node.asset.url}
          alt={props.node.asset.originalFilename}
        ></img>
      </Box>
    ),
    block: (props) => {
      const classes = useStyles()
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
            return <Box className={classes.h3}>{props.children}</Box>
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
        return (
          <Box mx='20px' my='20px' pl='15px' className={classes.quotes}>
            {props.children}
          </Box>
        )
      }
      if (style === 'normal') {
        return (
          <Box width='100%'>
            <Typography variant='body2' align='justify' gutterBottom>
              {props.children}
            </Typography>
          </Box>
        )
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props)
    },
  },
}

const PortableText = ({ blocks }) => {
  const classes = useStyles()
  return (
    <BasePortableText
      className={classes.width}
      blocks={blocks}
      serializers={serializers}
    />
  )
}

export default PortableText
