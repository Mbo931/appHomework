import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3000/api/role/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getReferentBoard() {
    return axios.get(API_URL + 'ref', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default UserService;

