import express from 'express'
import { data, error } from './cats.js'

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.json(data)
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})