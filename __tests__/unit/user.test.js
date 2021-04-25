const bcrypt = require('bcryptjs');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate')

describe('User', ()=>{

    beforeEach(async () =>{
        await truncate();
    });

    it('should encrypt user password', async ()=>{
        const user = await User.create({name:"Vitor", email:"v.augustosilva@gmail.com", password:"senhadenoob"});

        const hash = await bcrypt.hash('senhadenoob', 8);

        const compareResult = await bcrypt.compare('senhadenoob', user.password_hash)

        expect(compareResult).toBe(true);
    });
});