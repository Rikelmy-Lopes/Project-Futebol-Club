import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app'
import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';
import * as jwt from '../utils/jwt'
import { modelResponse, tokenInvalido, tokenResponse } from './login.mock'

const { app } = new App();

chai.use(chaiHttp)

const { expect } = chai;

describe('Testa a rota POST /login', () => {

      afterEach(sinon.restore);

        let chaiHttpResponse: Response;

    it('Testa se faz login com sucesso', async () => {
        sinon.stub(UserModel, 'findOne').resolves(modelResponse as UserModel);
        chaiHttpResponse = await chai.request(app).post('/login').send(
            {
                email: "user@user.com",
                password: "secret_user"
            }
        )
        expect(chaiHttpResponse.status).to.be.equal(200)
    })

    it('Testa se retorna um erro com senha invalida', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
            {
                email: "user@user.com",
                password: "senha_senha"
            }
        )
        expect(chaiHttpResponse.status).to.be.equal(401)
        expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
    })


    it('Testa se retorna um erro sem o campo email', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
            {
                password: "secret_user"
            }
        )
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    })

    describe('Testa a rota GET /login/validate', () => {
        it('Testa se valida com token Valido', async () => {
            chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2Njk4MzU2MDF9.tl4NTMIu9hHEam4vOfcJeb_1yeQssmuthpANirf3qt0')
            .send({role: 'user'})
            
            expect(chaiHttpResponse.status).to.be.equal(200)
            expect(chaiHttpResponse.body.role).to.be.equal('user')
        })

        it('Testa se valida retorna 401 sem passar o token', async () => {
            chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', '')
            .send({role: 'user'})

            expect(chaiHttpResponse.status).to.be.equal(401)
            expect(chaiHttpResponse.body.message).to.be.equal('Token not found')
        })
        it('Testa se retorna 401 com token invalido', async () => {
            chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', tokenInvalido)

            expect(chaiHttpResponse.status).to.be.equal(401)
            expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token')
        })
    })

})