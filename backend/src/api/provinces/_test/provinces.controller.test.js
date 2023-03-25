const supertest = require('supertest');

const app = require('../../../app');
const ProvinceTableTestHelper = require('../../../../tests/ProvinceTableTestHelper');

afterEach(async () => {
  await ProvinceTableTestHelper.cleanTable();
});

describe('[POST] /api/v1/provinces', () => {
  it('should throw 400 status code when payload not contain needed property or invalid data type', async () => {
    const payload = {};
    const response = await supertest(app)
      .post('/api/v1/provinces')
      .send(payload);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toEqual('fail');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(
      'Tidak dapat membuat data Provinsi. Data tidak ada/tidak valid!'
    );
  });

  it('should response with created object province correctly', async () => {
    const payload = {
      province_id: 2,
      province_name: 'some name',
    };
    const response = await supertest(app)
      .post('/api/v1/provinces')
      .send(payload);

    expect(response.status).toEqual(201);
    expect(response.body.status).toEqual('success');
    expect(response.body.message).toEqual('Data Provinsi berhasil dibuat');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('createdProvince');
  });
});

describe('[GET] /api/v1/provinces', () => {
  it('should respond with an empty array if no provinces exists', async () => {
    const response = await supertest(app).get('/api/v1/provinces');

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
    expect(response.body.message).toEqual('Berhasil mengambil data Provinsi');
    expect(response.body.data).toHaveProperty('provinces');
    expect(response.body.data.provinces).toEqual([]);
  });

  it('should respond with array of object when provinces exists', async () => {
    const payload = {
      province_id: 1,
      province_name: 'Test',
    };
    await supertest(app).post('/api/v1/provinces').send(payload);

    const response = await supertest(app).get('/api/v1/provinces');

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('success');
    expect(response.body.message).toEqual('Berhasil mengambil data Provinsi');
    expect(response.body.data).toHaveProperty('provinces');
    expect(response.body.data.provinces).toHaveLength(1);
  });

  describe('[PUT] /api/v1/provinces/:id', () => {
    it('should respond with updated province correctly', async () => {
      await supertest(app).post('/api/v1/provinces').send({
        province_id: 5,
        province_name: 'Someprovince',
      });

      const reqPayload = {
        province_name: 'Update province',
      };
      const response = await supertest(app)
        .put('/api/v1/provinces/5')
        .send(reqPayload);

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.message).toEqual(
        'Data Provinsi berhasil diperbarui'
      );
      expect(response.body.data).toHaveProperty('updatedProvince');
      expect(response.body.data.updatedProvince).toHaveProperty('provinceId');
      expect(response.body.data.updatedProvince.provinceId).toEqual(5);
      expect(response.body.data.updatedProvince.provinceName).toEqual(
        'Update province'
      );
    });
  });
});
