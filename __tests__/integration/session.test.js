const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');


describe('Authentication', ()=>{

    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () =>{
        
        const user = await factory.create("User")

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () =>{

        const user = await factory.create("User")

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'password123'
            });

        expect(response.status).toBe(401);
    })

    it('should return jwt token when authenticated', async () => {

        const user = await factory.create("User")


        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: user.password
        });

        expect(response.body).toHaveProperty('token');
    })

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create("User")

        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    })

    it('should not be able to access private routes without jwt token', async () => {
        const user = await factory.create("User")

        const response = await request(app)
        .get('/dashboard')

        expect(response.status).toBe(401);
    })

    it('should not be able to access private routes with invalid jwt token', async () => {
        const user = await factory.create("User")

        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer 1231231231231212`);

        expect(response.status).toBe(401);
    })

});
/*  1. GO BACK AND CHECK WHAT YOU DID WRONG BECAUSE YOU CAN'T USE THE SAME EMAIL AFTER TESTING
    2. REFACTOR STUFF USING THE OTHER THINGS FROM JEST THAT YOU'RE NOT USING
*/