import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

const app = express()
const PORT = 4000

app.use(cors())

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://saseburg.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:4000',
  issuer: 'https://saseburg.eu.auth0.com/',
  algorithms: ['RS256']
});


app.use(jwtCheck)

app.get('/', (req, res)=> {
    res.send('Hello There')
})

app.get('/without', (req, res) => {
    res.send('Without bearer')
})


app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(status).send(message)
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))