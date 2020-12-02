const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.static(__dirname + '/public'));
const port = 3333

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/index.html', (req, res) => {
    const string = fs.readFileSync('public/index.html').toString()
    console.log(string)
    res.send(string)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})