const request = require('supertest');
const app = require('../server.js'); 

describe('POST /result', () => {
    it('responds with json for a valid country name', async () => {
        const response = await request(app)
            .post('/result')
            .send('france') // Sending a valid country name
            .set('Content-Type', 'text/plain')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('resultData');
    });

    it('handles alternative country names', async () => {
        const response = await request(app)
            .post('/result')
            .send('US') // Sending an alternative country name
            .set('Content-Type', 'text/plain')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('resultData');
    });
});


