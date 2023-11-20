const express = require('express');
const app = express();

const axios = require('axios');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// render the main page
app.get('/', (req, res) => {
    res.render('index');
})


// render the result page
app.get('/result', (req, res) => {
    const country = req.query.countryName;
    
    // Record the error(s) of the form data
    const errors = [];
    
    if (!country) { // Empty input
        errors.push("No input is found");
    } else  { // not empty
        // sanitize data
        let cleanCountry = DOMPurify.sanitize(country);
        // check if that country is usually called by neither official name or common name
        cleanCountry = popularAlt(cleanCountry);

        const url = `https://restcountries.com/v3.1/name/${cleanCountry}?fullText=true`;

        axios.get(url)
            .then(response => {
            const countryData = response.data[0];
            // Redirect to the success page
            res.render('result', { countryData });
            })
            // if there is an error
            .catch(error => {
                // redirect to the error page
                errors.push('Country not found')
                res.render('error', { errors });
            });
    } 
    
    if (errors.length > 0) {
        // If there are errors, display them to the user and redisplay the form
        res.render('error', { errors });
    }
})

app.listen(3000);

function popularAlt(country) {
    const US = ['USA', 'US', 'America', 'United States of America', 'United States'];
    const UK = ['United Kingdom', 'UK']

    if (US.includes(country)) {
        return 'United States of America';
    } else if (UK.includes(country)) {
        return 'United Kingdom';
    } else {
        return country;
    }
}


module.exports = popularAlt