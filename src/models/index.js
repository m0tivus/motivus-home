import axios from 'axios'
import { first } from 'lodash'

export const API_BASE_URL =
  process.env.GATSBY_MARKETPLACE_API_URL || 'http://localhost:4000'
export const dataGetter = ({ data: { data } }) => data

export const User = {
  current: () => axios.get(`${API_BASE_URL}/api/account/user`).then(dataGetter),
}

export const AlgorithmUser = {
  all: (algorithmId) =>
    axios
      .get(
        `${API_BASE_URL}/api/package_registry/algorithms/${algorithmId}/users`,
      )
      .then(dataGetter),
  create: (algorithmId, algorithm_user) =>
    axios
      .post(
        `${API_BASE_URL}/api/package_registry/algorithms/${algorithmId}/users`,
        {
          algorithm_user,
        },
      )
      .then(dataGetter),
  remove: (algorithmId, algorithmUserId) =>
    axios
      .delete(
        `${API_BASE_URL}/api/package_registry/algorithms/${algorithmId}/users/${algorithmUserId}`,
      )
      .then(dataGetter),
}

export const Algorithm = {
  myAlgorithms: () => Algorithm.all({ role: 'OWNER' }),
  all: (params) =>
    axios
      .get(`${API_BASE_URL}/api/package_registry/algorithms`, { params })
      .then(dataGetter),
  find: (name) =>
    axios
      .get(`${API_BASE_URL}/api/package_registry/algorithms`, {
        params: { name },
      })
      .then(dataGetter)
      .then(first)
      .then((a) => a || {}),
  get: (id) =>
    axios
      .get(`${API_BASE_URL}/api/package_registry/algorithms/${id}`)
      .then(dataGetter),
  create: (algorithm) =>
    axios
      .post(`${API_BASE_URL}/api/package_registry/algorithms/`, {
        algorithm,
      })
      .then(dataGetter),
  update: () => null,
}

export const ApplicationToken = {
  all: (params) =>
    axios
      .get(`${API_BASE_URL}/api/account/application_tokens`, { params })
      .then(dataGetter),
  create: (application_token) =>
    axios
      .post(`${API_BASE_URL}/api/account/application_tokens`, {
        application_token,
      })
      .then(dataGetter),
}
export const PersonalAccessToken = {
  all: (params) =>
    axios
      .get(`${API_BASE_URL}/api/account/personal_access_tokens`, { params })
      .then(dataGetter),
  create: (personal_access_token) =>
    axios
      .post(`${API_BASE_URL}/api/account/personal_access_tokens`, {
        personal_access_token,
      })
      .then(dataGetter),
}
