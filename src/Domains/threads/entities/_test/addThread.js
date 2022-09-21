const AddThread = require('../AddThread');

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'abc',
      body: 'abc',
    };

    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      title: 123,
      body: true,
      owner: 'user-123',
    };

    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when title contains more than 250 character', () => {
    const payload = {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate lobortis ex, ut iaculis diam porttitor non. Praesent vestibulum leo elementum neque vulputate, et auctor mauris pellentesque. Integer vel sodales ex, nec ullamcorper mauris tortor.',
      body: 'Dicoding Indonesia',
      owner: 'user-123',
    };

    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.TITLE_LIMIT_CHAR');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      title: 'sebuah thread',
      body: 'Dicoding Indonesia',
      owner: 'user-123',
    };

    const { title, body, owner } = new AddThread(payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
