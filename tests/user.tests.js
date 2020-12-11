const chai = require('chai');
const chaiHttp = require('chai-http');
const BASE_URL = 'http://localhost:3000';
chai.use(chaiHttp);
const expect = chai.expect;

describe('User API service', () => {
    /**
        "username": "admin",
        "password": "admin",
        "name": "0",
        "email": "admin"
     */
    it('should get a user', (done) => {
        chai.request(BASE_URL)
            .get('/api/user/me')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.equal(true);
                expect(res.body.data._id).to.be.equal('5fb5d78d8ca5e50b293a0b6c');
                expect(res.body.data.username).to.be.equal('admin');
                expect(res.body.data.email).to.be.equal('admin');
                done()
            });
    });

    /**
        "username": "admin",
        "password": "admin",
        "name": "0",
        "email": "admin"
     */
    it('should update a user', (done) => {
        chai.request(BASE_URL)
            .get(`/api/user/me`)
            .end((err, res) => {
                let current = parseInt(res.body.data.name);
                let next = current + 1;
                const update = {
                    "current_password": "admin",
                    "name": `${next}`
                }
                chai.request(BASE_URL)
                    .put(`/api/user/update/me`)
                    .send(update)
                    .end((err, res) => {
                        let success = res.body.success;
                        expect(success).to.equal(true);
                        chai.request(BASE_URL)
                            .get(`/api/user/me`)
                            .end((err, res) => {
                                const updated = parseInt(res.body.data.name);
                                expect(updated).to.equal(current + 1);
                                done();
                            });
                    });
            });
    });
});
