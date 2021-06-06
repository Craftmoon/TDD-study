const bcrypt = require('bcryptjs');
const factory= require('../factories');
const truncate = require('../utils/truncate')

describe('User', ()=>{

    beforeEach(async () =>{
        await truncate();
    });

    it('should encrypt user password', async ()=>{
        const user = await factory.create('User')

        const compareResult = await bcrypt.compare(user.password, user.password_hash)

        expect(compareResult).toBe(true);
    });
});