const chai = require('chai');
const chaiHttp = require('chai-http');
const BASE_URL = 'http://localhost:3000';
chai.use(chaiHttp);
const expect = chai.expect;

describe('item API service', () => {
    /**
        "_id": "5fb5ed9c17e6ba18eabb8594",
        "name": "Test Item",
        "type": "READ",
        "created_date": "2020-11-19T03:09:35.229Z",
        "__v": 0
     */
    it('should get all fields on an item', (done) => {
        const itemId = '5fb5ed9c17e6ba18eabb8594';
        chai.request(BASE_URL)
            .get(`/api/item/${itemId}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body._id).to.be.equal(itemId);
                expect(res.body.name).to.be.equal("Test Item");
                expect(res.body.type).to.be.equal("READ");
                done();
            });
    });

    /**
        "_id": "5fb5e1ef78e6311241f641fc",
        "name": "Test Item",
        "type": "CREATE",
        "created_date": "2020-11-19T03:09:35.229Z",
        "__v": 0
     */
    it('should create an item', (done) => {
        chai.request(BASE_URL)
            .post('/api/item')
            .send({
                name: "Test Item",
                type: "CREATE"
            })
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    /**
        "_id": "5fb5edec17e6ba18eabb8595",
        "name": "0",
        "type": "UPDATE",
        "created_date": "2020-11-19T03:25:52.024Z",
        "__v": 0
     */
    it('should update an item', (done) => {
        const itemId = '5fb5edec17e6ba18eabb8595';
        chai.request(BASE_URL)
            .get(`/api/item/${itemId}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                let current = parseInt(res.body.name);
                let next = current + 1;
                const update = {
                    "name": `${next}`
                }
                chai.request(BASE_URL)
                    .put(`/api/item/${itemId}`)
                    .send(update)
                    .end((err, res) => {
                        let updated = parseInt(res.body.name);
                        expect(updated).to.equal(current + 1);
                        done();
                    });
            });
    });

    /**
        "_id": "xxxxxxxxxxxxxxxxxxxxxx",
        "name": "Test Item",
        "type": "DELETE",
        "created_date": "2020-11-19T03:25:52.024Z",
        "__v": 0
     */
    it('should delete an item', (done) => {
        chai.request(BASE_URL)
            .post('/api/item')
            .send({
                name: "Test Item",
                type: "DELETE"
            })
            .end((err, res) => {
                const itemId = res.body._id;
                chai.request(BASE_URL)
                    .delete(`/api/item/${itemId}`)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        done();
            });
        });
    });
});
