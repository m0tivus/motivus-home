import React, { useEffect, useRef } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { globalHistory } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  parent: {
    position: 'fixed',
    top: 0,
    left: 0,
    paddingTop: '150px',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: '0',
  },
}))

const SmoothScroll = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
  // 1.
  const windowSize = useWindowSize()

  //2.
  const scrollingContainerRef = useRef()

  // 3.
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  }

  // 4.
  useEffect(() => {
    setBodyHeight()
  }, [windowSize.height, globalHistory.location.pathname])

  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollingContainerRef.current?.getBoundingClientRect().height + 150
    }px`
  }

  // 5.
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler())
  }, [])

  const smoothScrollingHandler = () => {
    data.current = window.scrollY
    data.previous += (data.current - data.previous) * data.ease
    data.rounded = Math.round(data.previous * 100) / 100

    if (scrollingContainerRef.current) {
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`
    }

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler())
  }

  return (
    <div className={classes.parent}>
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  )
}

export default SmoothScroll
