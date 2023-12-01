/**
 * server.js
 * 
 * Nodejs backend running Express. 
 * Receives input from client in POST, send corresponding JSON back in GET.
 * Important: 
 *      1. cors
 *      2. session
 *      3. Handle alternative names like US, USA...       
 */


// const url = 'http://localhost:3000';
// **** Only uncomment below when in deployment ****
const url = 'https://countries-f.onrender.com';

const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');

app.use(cors({
    origin: url, 
    credentials: true
}));

app.use(express.text());

const session = require('express-session');

// **** Only uncomment below when in deployment ****
app.set("trust proxy", 1); 
app.use(session({
  secret: 'aabc',  
  resave: false,
  saveUninitialized: false
// **** Only uncomment below when in deployment ****
  ,cookie: { secure: true, sameSite: 'none'}
}));

app.post('/result', (req, res) => {
    var country = req.body.trim().toLowerCase()
    country = alt(country);
    const url = `https://restcountries.com/v3.1/name/` + country + `?fullText=true`;

    try {
        axios.get(url)
        .then(response => {
            req.session.resultData = response.data[0]; 
            req.session.save(() => { // save the data in session for later use in GET
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

// the server should handle simplified names like US, UK, which people use commonly 
// but not available on API
function alt(input) {
    const US = ['usa', 'us', 'america', 'united states of america', 'united states'];
    const UK = ['united kingdom', 'uk']

    if (US.includes(input.toLowerCase())) {
        return 'United States of America';
    } else if (UK.includes(input.toLowerCase())) {
        return 'United Kingdom';
    } else {
        return input;
    }
}

app.listen(5000);

module.exports = app;  

