import { tokenResponse } from './login.mock';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app'
import { Response } from 'superagent';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import { allMatches, responseCreateMatch } from './matches.mock';

const { app } = new App();

chai.use(chaiHttp)

const { expect } = chai;

describe('Testa a Rota GET /matches', () => {
    afterEach(sinon.restore);
    let chaiHttpResponse: Response;

    it('Testa se retorna todos os jogos', async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(allMatches as [])
        chaiHttpResponse = await chai.request(app).get('/matches');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(allMatches)
    })

    it('Testa se retorna todos os jogos em inProgress === true', async () => {
        const inProgressMatches = allMatches.filter((match) => match.inProgress === true)
        sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatches as [])
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches)
    })

    it('Testa se retorna todos os jogos em inProgress === false', async () => {
        const inProgressMatches = allMatches.filter((match) => match.inProgress === false)
        sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatches as [])
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches)
    })

    describe('Testa a Rota POST /matches', () => {

        it('Testa se salva uma Partida com sucesso', async () => {
            sinon.stub(MatchesModel, 'create').resolves(responseCreateMatch as any)
            chaiHttpResponse = await chai.request(app).post('/matches')
            .set('Authorization', tokenResponse)
            .send({
                homeTeam: 16,
                awayTeam: 8,
                homeTeamGoals: 2,
                awayTeamGoals: 2,
              })
              expect(chaiHttpResponse.status).to.be.equal(201);
              expect(chaiHttpResponse.body).to.be.deep.equal(responseCreateMatch)
        })

        it('Testa se retorna um erro ao salvar uma Partida com times iguais', async () => {
            chaiHttpResponse = await chai.request(app).post('/matches')
            .set('Authorization', tokenResponse)
            .send({
                homeTeam: 16,
                awayTeam: 16,
                homeTeamGoals: 2,
                awayTeamGoals: 2,
              })
              expect(chaiHttpResponse.status).to.be.equal(422);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                { message: "It is not possible to create a match with two equal teams" }
                )
        })

        it('Testa se retorna um erro ao salvar uma Partida com times inexistentes', async () => {
            sinon.stub(TeamModel, 'findByPk').resolves(undefined)
            chaiHttpResponse = await chai.request(app).post('/matches')
            .set('Authorization', tokenResponse)
            .send({
                homeTeam: 899,
                awayTeam: 999,
                homeTeamGoals: 2,
                awayTeamGoals: 2,
              })
              expect(chaiHttpResponse.status).to.be.equal(404);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                { message: "There is no team with such id!" }
                )
        })
    })

    describe('Testa a Rota PATCH /matches/:id/finish', () => {
        it('Testa se é possível alterar o status da Partida para Inprogress === false', async () => {
            sinon.stub(MatchesModel, 'update').resolves(undefined)
            chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })
        })
    })

    describe('Testa a Rota PATCH /matches/:id', () => {
        it('Testa se é possível atualizar uma Partida', async () => {
            sinon.stub(MatchesModel, 'update').resolves(undefined)
            chaiHttpResponse = await chai.request(app).patch('/matches/1').send(
                {
                    homeTeamGoals: 3,
                    awayTeamGoals: 1
                }
            )

            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })
        })
    })
})