import axios from 'axios'
import { first } from 'lodash-es'

const BASE_URL = 'http://localhost:4000'
export const dataGetter = ({ data: { data } }) => data

export const User = {
  current: () => axios.get(`${BASE_URL}/api/account/user`).then(dataGetter),
}

export const Algorithm = {
  all: () =>
    axios.get(`${BASE_URL}/api/package_registry/algorithms`).then(dataGetter),
  find: (name) =>
    axios
      .get(`${BASE_URL}/api/package_registry/algorithms`, { params: { name } })
      .then(dataGetter)
      .then(first)
      .then((a) => a || {}),
}
