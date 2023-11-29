const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');

app.use(cors({
    origin: 'http://localhost:3000' || 'https://countries-f.onrender.com', 
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
            var string = encodeURIComponent('Error fetching data from the API');
            res.redirect('/error/?data=' + string);
            console.error('Error fetching data:', error.message);
        });
        
    } catch (error) {
        res.status(500).send('Error fetching data from the API');
    }


})

app.get('/result', (req, res) => {
    if (req.session.resultData) {
        res.json(req.session.resultData);
    } else {
        res.status(404).send('Error fetching data from the API');
    }
    
});


app.listen(5000);
