### This is a benchmark to test the performance between NodeJS native synchronous api and callback api

**Scenario**\
We will have 3 apis will do the exact same thing: hashing an user password using PBKDF2 functions.
- First api is using the NodeJS native synchronous [api](https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest).
- Second api using NodeJS callback [api](https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback).
- Third api is wrapping the callback api of NodeJS inside a Promise.

**Testing**\
Using [k6](https://k6.io/) tool with 100 virtual users call each apis within 10 seconds.

The result is that the first api is significantly slower in compare with other two. Promise and callback implementation have roughly similarity result in compare with each other.