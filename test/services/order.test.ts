import app from '../../src/app';

describe('\'order\' service', () => {
  it('registered the service', () => {
    const service = app.service('order');
    expect(service).toBeTruthy();
  });
});
