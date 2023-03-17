const supertest = require('supertest');

const app = require('../../app');

describe('[GET] /api/v1/provinces', () => {
  it('should respond with an array of province', async () => {
    const response = await supertest(app).get('/api/v1/provinces').expect(200);

    expect(response.body).toEqual([]);
  });
});
