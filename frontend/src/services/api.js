// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true // Ensures cookies are sent for auth
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Backend URL
  withCredentials: true // Ensures cookies (auth tokens) are sent with requests
});

export default api;

