import axios from 'axios'

export const User = {
  current: () => axios.get(`${BASE_URL}/api/account/`).then(dataGetter),
}
