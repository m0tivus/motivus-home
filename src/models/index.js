import axios from 'axios'
import { first } from 'lodash'

const BASE_URL = 'http://localhost:4000'
export const dataGetter = ({ data: { data } }) => data

export const User = {
  current: () => axios.get(`${BASE_URL}/api/account/user`).then(dataGetter),
}

export const AlgorithmUser = {
  all: (algorithmId) =>
    axios
      .get(`${BASE_URL}/api/package_registry/algorithms/${algorithmId}/users`)
      .then(dataGetter),
  create: (algorithmId, algorithm_user) =>
    axios
      .post(
        `${BASE_URL}/api/package_registry/algorithms/${algorithmId}/users`,
        {
          algorithm_user,
        },
      )
      .then(dataGetter),
  remove: (algorithmId, algorithmUserId) =>
    axios
      .delete(
        `${BASE_URL}/api/package_registry/algorithms/${algorithmId}/users/${algorithmUserId}`,
      )
      .then(dataGetter),
}

export const Algorithm = {
  myAlgorithms: () => Algorithm.all({ role: 'OWNER' }),
  all: (params) =>
    axios
      .get(`${BASE_URL}/api/package_registry/algorithms`, { params })
      .then(dataGetter),
  find: (name) =>
    axios
      .get(`${BASE_URL}/api/package_registry/algorithms`, { params: { name } })
      .then(dataGetter)
      .then(first)
      .then((a) => a || {}),
  get: (id) =>
    axios
      .get(`${BASE_URL}/api/package_registry/algorithms/${id}`)
      .then(dataGetter),
  create: (algorithm) =>
    axios
      .post(`${BASE_URL}/api/package_registry/algorithms/`, {
        algorithm,
      })
      .then(dataGetter),
  update: () => null,
}
