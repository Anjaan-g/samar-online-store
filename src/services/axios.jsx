import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888/api/v1/',
  // headers: {
  //   // "Content-Type": "application/json",
  // },
});

export default api;


/*
    Date: Thu, 22 Dec 2022 04:25:14 GMT
    Server: WSGIServer/0.2 CPython/3.10.6
    Content-Type: application/json
    Vary: Accept
    Allow: POST, OPTIONS
    X-Frame-Options: DENY
    Content-Length: 519
    X-Content-Type-Options: nosniff
    Referrer-Policy: same-origin
    Cross-Origin-Opener-Policy: same-origin
*/