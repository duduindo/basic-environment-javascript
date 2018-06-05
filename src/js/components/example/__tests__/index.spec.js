import { sum } from '../';


describe('Sum example', () => {
  const bodyhtml = require('../__mocks__/body.html');

  beforeAll(() => {
    document.body.innerHTML = bodyhtml;
  });

  afterAll(() => {
    document.body.innerHTML = null;
  });

  test('Test Sum', () => {
    expect(sum(1, 2)).toBe(3);
  });

});
