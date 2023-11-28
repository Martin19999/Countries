const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');

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
    const url = `https://restcountries.com/v3.1/name/` + country + `?fullText=true`;

    try {

        axios.get(url)
        .then(response => {
            req.session.resultData = response.data[0]; 
            req.session.save(() => {
                return res.json({ resultData: req.session.resultData });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        
    } catch (error) {
        res.status(500).send('Error fetching data from the API');
    }


})

app.get('/result', (req, res) => {
    if (req.session.resultData) {
        res.json(req.session.resultData);
    } else {
        res.status(404).send('No data available');
    }
    
});

app.listen(5000);
