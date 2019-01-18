// /* 
// Explicación del porque sustituir cookies y url parameters por sessions -> https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm
// */

// const express = require('express')
// const next = require('next')
// const bodyParser = require('body-parser')
// //middlewares para storage session de los usuarios en session files
// const session = require('express-session')
// const FileStore = require('session-file-store')(session)
// //middleware de firebase 
// const admin = require('firebase-admin')

// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev }) // -> delega el proveedor del server a next
// const handle = app.getRequestHandler()

// /* -------------- API SERVER --------------------------------------------------- */

// const firebase = admin.initializeApp(
//   {
//     credential: admin.credential.cert(require('../credentials/server')),
//     databaseURL: process.env.DATABASE_URL
//   },
//   'server'
// )

// // bloque de código que aparentemente inicializa el servidor
// app.prepare().then(() => {
//   const server = express();

//   // instancia del middleware(?)
//   server.use(bodyParser.json());

//   // código que crea la sesión y el filestore
//   server.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       store: new FileStore({ path: '/tmp/sessions', secret: process.env.SESSION_SECRET }),
//       saveUninitialized: true,
//       resave: false,
//       rolling: true,
//       httpOnly: true,
//       cookie: { maxAge: 604800000, secure: true } // week
//     })
//   )

//   server.use((req, res, next) => {
//     req.firebaseServer = firebase
//     next()
//   })

//   server.post('/api/login', (req, res) => {
//     if (!req.body) return res.sendStatus(400)

//     const token = req.body.token
//     firebase
//       .auth()
//       .verifyIdToken(token)
//       .then(decodedToken => {
//         req.session.decodedToken = decodedToken
//         return decodedToken
//       })
//       .then(decodedToken => res.json({ status: true, decodedToken }))
//       .catch(error => res.json({ error }))
//   })

//   server.post('/api/logout', (req, res) => {
//     req.session.decodedToken = null
//     res.json({ status: true })
//   })

//   server.get('*', (req, res) => {
//     return handle(req, res)
//   })

//   server.listen(port, err => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`);
//   })
// })
