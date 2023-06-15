import axios from 'axios';

export const baseUrl1="https://648892c40e2469c038fe0414.mockapi.io/job-data"

const client = axios.create({
    baseUrl1,
})

export default client;