const AddedThread = require('../AddedThread');

describe('AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'test title',
      body: 'test body body',
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.PAYLOAD_DID_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data types specification', () => {
    const payload = {
      id: 123,
      title: true,
      owner: 'not me',
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.DATA_TYPES_OF_PAYLOAD_IS_NOT_VALID');
  });

  it('should create addedThread object correctly', () => {
    const payload = {
      id: 'thread-oreo98',
      title: 'test title',
      owner: 'user-123',
    };

    const { id, title, owner } = new AddedThread(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
