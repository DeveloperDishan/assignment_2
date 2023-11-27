# Question: how to run the application locally?

Ans: My assignment task is database create. and createted database get update and deleted validation etc function management.

Application run localy for I use npm.

fast I install npm init -y

then I install express js

const express = require('express')
const app = express()
const port = 3000

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

I copy this code express js documentation.

I install cors

I give this command (node {my file location here})

after deploy express js help us to run my application localy
