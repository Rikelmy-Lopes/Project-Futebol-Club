import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app'
import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';

const { app } = new App();

chai.use(chaiHttp)

const { expect } = chai;

const test = {
     dataValues: {
       id: 2,
       username: 'User',
       role: 'user',
       email: 'user@user.com',
       password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
     },
     _previousDataValues: {
       id: 2,
       username: 'User',
       role: 'user',
       email: 'user@user.com',
       password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
     },
   };

describe('Testa a rota /Login', () => {

    beforeEach(async () => {
        sinon
          .stub(UserModel, "findOne")
          .resolves(test as any);
      });
      
      afterEach(()=>{
        (UserModel.findOne as sinon.SinonStub).restore();
      })

        let chaiHttpResponse: Response;

    it('Testa se faz login com sucesso e retornar um token', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
            {
                email: 'user@user.com',
                password: 'secret_user'
            }
        )
            console.log(chaiHttpResponse)
        expect(chaiHttpResponse.status).to.be.eq(200)
    })
})