import { allTeams } from './teams.mock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app'
import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';

const { app } = new App();

chai.use(chaiHttp)

const { expect } = chai;

describe('Testa a Rota GET /teams', () => {
    afterEach(sinon.restore);
    let chaiHttpResponse: Response;

    it('Testa se Retornar todos os Times', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[])
        chaiHttpResponse = await chai.request(app).get('/teams');

        expect(chaiHttpResponse.status).to.be.equal(200)
        expect(chaiHttpResponse.body).to.be.deep.equal(allTeams);
    })

    describe('Testa a Rota GET /teams/:id', () => {
    it('Testa se Retornar o time por Id', async () => {
        sinon.stub(TeamModel, 'findByPk').resolves(allTeams[0] as TeamModel)
        chaiHttpResponse = await chai.request(app).get('/teams/1');

        expect(chaiHttpResponse.status).to.be.equal(200)
        expect(chaiHttpResponse.body).to.be.deep.equal(allTeams[0]);
    })
})
})