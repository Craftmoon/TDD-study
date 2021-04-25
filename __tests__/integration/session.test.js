const { User } = require('../../src/app/models');
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

describe('Authentication', ()=>{

    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () =>{
        const user = await User.create({ 
            name: "Vitor", 
            email:"v.augustosilva@gmail.com", 
            password_hash:"123456789123456789"
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password:'123456789123456789'
            });

        expect(response.status).toBe(200);
    });
});