const express = require('express')
const app = express()

app.set('view engine','ejs')

app.get('/',(req,resp) => {
    resp.send('Hello World')
})

app.listen(8080)
