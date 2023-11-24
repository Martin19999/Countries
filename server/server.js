const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.text());


app.post('/submit', (req, res) => {
    console.log(req.body);
    res.status(200).send('Data received');
})

app.listen(5000);
