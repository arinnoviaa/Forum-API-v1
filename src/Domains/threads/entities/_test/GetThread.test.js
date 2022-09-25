const GetThread = require('../GetThread');

describe('GetThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action & Assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.PAYLOAD_DID_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data types specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: true,
      body: 'sebuah body',
      date: '20-11-2021',
      username: 123,
    };

    // Action & Assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create GetThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: '20-11-2021',
      username: 'user-123',
    };

    // Action
    const {
      id, title, body, date, username,
    } = new GetThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });
});
