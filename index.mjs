import Fastify from 'fastify'
import crypto from 'node:crypto'

const fastify = Fastify({
  logger: true
})

const salt = crypto.randomBytes(128).toString('base64');
const users = {}

const pdkbf2Promise = (
  password,
  salt,
  iterations,
  keylen,
  digest,
) => new Promise((resolve, reject) => {
  crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
    if (err) {
      reject(err);
    } else {
      resolve(derivedKey);
    }
  });
})

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.get('/newUser-sync', (req, reply) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || users[username]) {
    return reply.code(400).send('Bad Request');
  }
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  users[username] = { salt, hash: hash.toString('hex') };

  return reply.code(200).send();
});

fastify.get('/newUser-callback', (req, reply) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || users[username]) {
    return reply.code(400).send('Bad Request');
  }
  crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    users[username] = { salt, hash: derivedKey.toString('hex') };
    return reply.code(200).send();
  });
});

fastify.get('/newUser-promise', (req, reply) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || users[username]) {
    return reply.code(400).send('Bad Request');
  }
  const salt = crypto.randomBytes(128).toString('base64');
  pdkbf2Promise(password, salt, 10000, 512, 'sha512').then(derivedKey => {
    users[username] = { salt, hash: derivedKey.toString('hex') };
    return reply.code(200).send();
  }).catch(err => {
    reply.code(500).send(err);
  });
});

fastify.get('/userStats', (req, reply) => {
  return reply.send({ users: Object.keys(users).length });
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})
