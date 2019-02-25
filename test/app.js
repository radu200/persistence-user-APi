const request = require('supertest');
const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


const fakeUser = {
    email: 'john.d@example.com',
    givenName: 'John',
    familyName: 'Doe'
}




describe("Homepage", () => {
    it('welcomes the user', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect(/Welcome/, done)
    })
})



describe("API TESTING", () => {

    it('Works when empty', done => {
        request(app)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.msg.should.equal('No users found');
                res.body.code.should.equal(404)
                res.body.success.should.equal(false);
                done();
            });
    });


    //create user
    it('Works with correct data', done => {
        chai.request(app)
            .post('/user')
            .send(fakeUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.have.property('errors');
                res.body.users[0].should.have.property('id');
                res.body.users[0].should.have.property('email');
                res.body.users[0].should.have.property('givenName');
                res.body.users[0].should.have.property('familyName');
                res.body.users[0].should.have.property('created');
                fakeUser.id = res.body.users[0].id;
                done();
            });
    });




    ///find user by id

    it('GET /user/:id', (done) => {
        request(app)
            .get(`/user/${fakeUser.id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.have.property('errors');
                res.body.User.should.have.property('email');
                res.body.User.should.have.property('givenName');
                res.body.User.should.have.property('familyName');
                res.body.User.should.have.property('created');
                res.body.User.email.should.equal('john.d@example.com');
                res.body.User.givenName.should.equal('John');
                res.body.User.familyName.should.equal('Doe');

                done();
            });

    });

    it('Sends an error meassage on non existant userId', done => {
        const id = 999999999999;
        request(app)
            .get(`/user/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.equal('Unable to find this user.');
                done();
            });
    });




    it('Fails correctly on NaN', done => {
        request(app)
            .get('/user/username')
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.equal('Invalid user ID supplied');

                done();
            });
    });


    ///update user
    it('PUT /user/:id', (done) => {
        request(app)
            .put(`/user/${fakeUser.id}`)
            .send(fakeUser)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(302);
                res.body.should.not.have.property('errors');
                res.body.should.be.a('object');
                done();
            });

    });

    it('DELETE /user/:id',  (done) => {
        request(app)
            .delete('/user/' + fakeUser.id)
            .expect(204)
            .end( (err) =>{
                if (err) {
                    return done(err);
                }

                done();
            });

    })
})