import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app'
import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';
import * as jwt from '../utils/jwt'
import { modelResponse } from './login.mock'

const { app } = new App();

chai.use(chaiHttp)

const { expect } = chai;

describe('Testa a rota /Login', () => {

    beforeEach(async () => {
        sinon
          .stub(UserModel, "findOne")
          .resolves(modelResponse as any);
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

        expect(chaiHttpResponse.status).to.be.equal(200);
    })
})