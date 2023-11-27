const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(express.text());

const session = require('express-session');

app.use(session({
  secret: 'aabc',  
  resave: false,
  saveUninitialized: false,
}));

app.post('/result', (req, res) => {
    const country = req.body.trim().toLowerCase()
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    req.session.resultData = url
    req.session.save(() => {
        return res.send({
            resultData : url,
        });
    });

})

app.get('/result', (req, res) => {
    if (req.session.resultData) {
        res.send(req.session.resultData);
    } else {
        res.status(404).send('No data available');
    }
    
});

app.listen(5000);
