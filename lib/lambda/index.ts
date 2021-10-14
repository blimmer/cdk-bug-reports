import axios from 'axios';

export async function handler() {
  return axios.get('https://google.com');
}
