import axios from 'axios'

const BASE_URL = 'http://localhost:4000'
export const dataGetter = ({ data: { data } }) => data

export const User = {
  current: () => axios.get(`${BASE_URL}/api/account/user`).then(dataGetter),
}
