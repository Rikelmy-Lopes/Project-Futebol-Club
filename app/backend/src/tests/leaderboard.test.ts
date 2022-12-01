import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app'
import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';
import { allMatches } from './matches.mock';
import MatchesModel from '../database/models/MatchesModel';
import { allTeams } from './teams.mock';
import { leaderboardAll, leaderboardAway, leaderboardHome } from './leaderboard.mock';
import MatchModel from '../model/MatchModel';

const { app } = new App();

chai.use(chaiHttp)

const { expect } = chai;

describe('Testa a Rota GET /leaderboard', () => {
    afterEach(sinon.restore);
    let chaiHttpResponse: Response;

    it('Testa se retornar a leaderboard', async () => {
        // sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[])
        // sinon.stub(MatchModel, 'getAllMatches').resolves(allMatches as [])
        chaiHttpResponse = await chai.request(app).get('/leaderboard')

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardAll);
    })

    describe('Testa a Rota GET /leaderboard/home', () => {

        it('Testa se retornar a leaderboardHome', async () => {
            // sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[])
            // sinon.stub(MatchModel, 'getAllMatches').resolves(allMatches as [])
            chaiHttpResponse = await chai.request(app).get('/leaderboard/home')
    
            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardHome);
        })
    })

    describe('Testa a Rota GET /leaderboard/away', () => {

        it('Testa se retornar a leaderboardAway', async () => {
            // sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[])
            // sinon.stub(MatchModel, 'getAllMatches').resolves(allMatches as [])
            chaiHttpResponse = await chai.request(app).get('/leaderboard/away')
    
            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardAway);
        })
    }
)

})
