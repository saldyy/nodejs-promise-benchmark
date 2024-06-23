import http from 'k6/http';
import { sleep } from 'k6';
import { generateRandomUsername } from './random.js';

export const options = {
  vus: 10,
  duration: '10s',
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {
  http.get(`http://localhost:3000/newUser-sync?username=${generateRandomUsername()}&password=12345678`);
  sleep(1);
}
