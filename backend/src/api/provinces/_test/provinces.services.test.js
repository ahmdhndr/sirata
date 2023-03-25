const provinceService = require('../provinces.services');
const ProvinceTableTestHelper = require('../../../../tests/ProvinceTableTestHelper');
const InvariantError = require('../../../exceptions/InvariantError');
const NotFoundError = require('../../../exceptions/NotFoundError');

afterEach(async () => {
  await ProvinceTableTestHelper.cleanTable();
});

describe('addProvince func', () => {
  it('should return 400 when payload not contain needed property or invalid data type', async () => {
    await expect(() => provinceService.addProvince({})).rejects.toThrow(
      InvariantError
    );
  });

  it('should respond with created object province correctly', async () => {
    const payload = {
      province_id: 1,
      province_name: 'Some name',
    };

    const response = await provinceService.addProvince(payload);

    expect(response).toHaveProperty('provinceName');
    expect(response.provinceName).toEqual('Some name');
  });
});

describe('getProvinces func', () => {
  it('should respond with empty array if no provinces found', async () => {
    const response = await provinceService.getProvinces();

    expect(response).toEqual([]);
  });

  it('should respond with array of object when provinces found', async () => {
    await provinceService.addProvince({
      province_id: 1,
      province_name: 'test province',
    });
    await provinceService.addProvince({
      province_id: 2,
      province_name: 'test province 2',
    });

    const response = await provinceService.getProvinces();
    expect(response).toHaveLength(2);
  });
});

describe('getProvinceById func', () => {
  it('should respond with 404 if no province found', async () => {
    await expect(() => provinceService.getProvinceById(2)).rejects.toThrow(
      NotFoundError
    );
  });

  it('should return correctly province object', async () => {
    await provinceService.addProvince({
      province_id: 1,
      province_name: 'test province',
    });

    const result = await provinceService.getProvinceById(1);
    expect(result).toHaveProperty('provinceName');
  });
});

describe('updateProvince func', () => {
  it('should respond with the 400 status code if payload not contain needed property', async () => {
    await provinceService.addProvince({
      province_id: 1,
      province_name: 'test province',
    });
    const reqPayload = {};
    await expect(() =>
      provinceService.editProvinceById(1, reqPayload)
    ).rejects.toThrow(InvariantError);
  });

  it('should respond with the 400 status code if payload not meet data type specification', async () => {
    await provinceService.addProvince({
      province_id: 1,
      province_name: 'test province',
    });
    const reqPayload = {
      province_name: 23,
    };
    await expect(() =>
      provinceService.editProvinceById(1, reqPayload)
    ).rejects.toThrow(InvariantError);
  });

  it('should respond with 404 if no province found', async () => {
    const reqPayload = {
      province_name: 'updated province',
    };
    await expect(() =>
      provinceService.editProvinceById(2, reqPayload)
    ).rejects.toThrow(NotFoundError);
  });

  it('should respond with updated object correctly', async () => {
    await provinceService.addProvince({
      province_id: 4,
      province_name: 'test province',
    });
    const reqPayload = {
      province_name: 'updated province',
    };
    const result = await provinceService.editProvinceById(4, reqPayload);

    expect(result).toHaveProperty('provinceId');
    expect(result.provinceId).toEqual(4);
    expect(result).toHaveProperty('provinceName');
    expect(result.provinceName).toEqual('updated province');
  });
});
