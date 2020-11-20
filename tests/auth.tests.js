const chai = require('chai');
const chaiHttp = require('chai-http');
const BASE_URL = 'http://localhost:3000';
chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth API service', () => {
    /**
        "username": "admin",
        "password": "admin",
        "name": "admin",
        "email": "admin"
     */
    it('should register a user', (done) => {
        const random = Math.floor(Math.random() * 100).toString();
        chai.request(BASE_URL)
            .post('/api/auth/register')
            .send({
                "username": random,
                "password": random,
                "name": random,
                "email": random
            })
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.equal(true);
                expect(res.body.message).to.be.equal('registered user');
                done();
            });
    });
});
