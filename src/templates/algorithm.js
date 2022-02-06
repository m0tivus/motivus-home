import React, { useState } from 'react'
import Layout from '../layouts/ClientLayout'
import Title from '../components/client/Title'
import { graphql } from 'gatsby'
import AlgorithmRender from '../components/Algorithm'
import { transformAlgorithm } from '../utils'
import LoadingComponent from '../components/Loading'
import useUser from '../hooks/useUser'
import { Algorithm } from '../models'

export default function AlgorithmTemplate({ name, ...props }) {
  const { isLoading } = useUser()
  const [isLoadingAlgorithm, setIsLoadingAlgorithm] = useState(true)

  const [algorithm, setAlgorithm] = React.useState({})

  const getAlgorithmData = async () => {
    try {
      const algoritm_ = await Algorithm.find(name)
      setAlgorithm(transformAlgorithm(algoritm_))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingAlgorithm(false)
    }
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [])

  return isLoading || isLoadingAlgorithm ? (
    <LoadingComponent fullscreen />
  ) : (
    <Layout {...props}>
      <Title text={algorithm.name} />
      <AlgorithmRender data={{ algorithm }} {...props} />
    </Layout>
  )
}
