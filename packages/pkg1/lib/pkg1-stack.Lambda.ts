import axios from 'axios'

export async function handler() {
  await axios.get('https://google.com')
}
