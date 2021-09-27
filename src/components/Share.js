import React from 'react'
import SEO from '../components/seo'
import { Box, Typography } from '@material-ui/core'
import '../components/layout.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { classicNameResolver } from 'typescript'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import RedditIcon from '@material-ui/icons/Reddit'
import TwitterIcon from '@material-ui/icons/Twitter'

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div>
      <FacebookShareButton url={url}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={tags}
      >
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>

      <RedditShareButton url={url} title={title}>
        <RedditIcon size={40} round={true} />
      </RedditShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.background.langSelector,
  },
  backgroundTexture: {
    backgroundColor: '#ffffff',
    opacity: 1,
    backgroundImage: 'radial-gradient(#000 0.1px, #fff 1px)',
    backgroundSize: '8px 8px',
  },
  fade: {
    background:
      'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%)',
  },
  icons: {
    fill: theme.palette.text.white,
  },
  title: {
    color: theme.palette.text.white,
  },
}))

export default function Share(title, url, twitterHandle, tags) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box id='root' display='flex' alignItems='center' flexDirection='column'>
        <Box
          display='flex'
          width='100%'
          height='90px'
          mt='30px'
          className={classes.backgroundTexture}
        >
          <Box
            width='100%'
            height='90px'
            display='flex'
            justifyContent='center'
            className={classes.fade}
          >
            <Box mt='30px' width='85%' height='90px' className={classes.body}>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100%'
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='flex-end'
                  pr='10px'
                >
                  <Typography className={classes.title} variant='h4'>
                    Thanks for Reading!
                  </Typography>
                  <Typography variant='h5' color='secondary'>
                    Share this on
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-around'
                  width='210px'
                >
                  <ShareButtons
                    title={title}
                    url={url}
                    twitterHandle={twitterHandle}
                    tags={tags}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
