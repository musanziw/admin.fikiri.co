import axios from 'axios';
import { API_URL } from '@/app/config/api';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
