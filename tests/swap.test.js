const env = process.env.NODE_ENV || 'development';

const mongoose = require("mongoose");
const SwapModel = require('../models/swap.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
const server = require('../index');


chai.use(chaiHttp);

describe('Swaps', () => {
    beforeEach(function() {
        console.log("Initialising... Test ");      
    });
  
  //tests the get swaps endpoint
  describe('/GET swaps', () => {
      it('it should GET all the swaps', async() => {
            const res = await chai.request(server)
            .get('/api/swaps')
            const data = res.body;
            expect(res.status).to.equal(200);
            expect(data).be.a('array');
      });
  });

  //tests the post swap endpoint where a swap is inserted to the database
  //more tests can be done here to check whether the battery is assigned to a rider whenever a swap is done
  describe('/POST swap', () => {
      it('it should POST a swap ', async() => {
        let swap = {
          currentEnergyReading: 400,
          currentMillage: 20,
          battery_id: "637b607d69202c956c837ef3",
          rider_id: "637b5e2a6b16702e3e7b9e8d"
          }
        const res = await chai.request(server)
        .post('/api/swaps/create')
        .send(swap);
        const data = res.body;
        expect(res.status).to.equal(201);
        expect(data).be.a('object');
      });
  });
});
