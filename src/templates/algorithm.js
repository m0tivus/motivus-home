import React from 'react'
import Layout from '../layouts/ClientLayout'
import Title from '../components/client/Title'
import { graphql } from 'gatsby'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import StarBadge from '../components/client/StarBadge'
import AlgorithmLinks from '../components/client/AlgorithmLinks'
import AlgorithmCallToAction from '../components/client/AlgorithmCallToAction'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const AntTabs = withStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
    height: '5px',
  },
}))(Tabs)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontSize: '1.4rem',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ['Asap'].join(','),
    '&:hover': {
      color: theme.palette.secondary.main,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.secondary.main,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />)

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontFamily: 'Roboto Mono',
    fontWeight: '400',
    fontSize: '1.5rem',
    marginRight: '20px',
  },
  description: {
    fontSize: '1.25rem',
    fontWeight: '300',
    marginRight: '20px',
  },
}))

export default function AlgorithmTemplate({ data, ...props }) {
  return (
    <Layout {...props}>
      <Algorithm data={data} {...props} />
    </Layout>
  )
}

function Algorithm({ data }) {
  const algorithmData = data?.algorithm
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Title text={algorithmData.name} />
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='flex-start'
        mt='10px'
        alignItems='center'
      >
        <Typography variant='h3' color='primary' className={classes.subtitle}>
          {algorithmData.author} | {algorithmData.publishDate}
        </Typography>
        <StarBadge stars={algorithmData.stars} />
      </Box>
      <Box display='flex' justifyContent='space-between' mt='20px' mb='20px'>
        <Typography variant='body1' className={classes.description}>
          {algorithmData.description}
        </Typography>
        <AlgorithmLinks web={algorithmData.web} github={algorithmData.github} />
      </Box>
      <AlgorithmCallToAction
        console={`motivus install ${algorithmData.name} template`}
      />
      <AntTabs value={value} onChange={handleChange} aria-label='ant example'>
        <AntTab label='Readme' {...a11yProps(0)} />
        <AntTab label='Versions' {...a11yProps(1)} />
        <AntTab label='Cost' {...a11yProps(2)} />
        <AntTab label='License' {...a11yProps(3)} />
      </AntTabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant='h5'>Current</Typography>
        <Typography variant='body1' gutterBottom>
          version: {algorithmData.version}____________
          {algorithmData.publishDate}
        </Typography>
        <Typography variant='h5'>History</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </React.Fragment>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export const pageQuery = graphql`
  query AlgorithmTemplate($id: String!) {
    algorithm(id: { eq: $id }) {
      author
      github
      description
      name
      publishDate
      stars
      version
      web
    }
  }
`
