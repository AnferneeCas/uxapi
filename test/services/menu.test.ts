import app from '../../src/app';

describe('\'menu\' service', () => {
  it('registered the service', () => {
    const service = app.service('menu');
    expect(service).toBeTruthy();
  });
});
