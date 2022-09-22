const AddComment = require('../AddComment');

describe('an addComment entities', () => {
  it('should to throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should to throw error when payload did not meet data type spesification', () => {
    const payload = {
      content: 'sebuah komentar',
      owner: true,
      thread: 123,
    };

    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addComment object correctly', () => {
    const payload = {
      content: 'sebuah komentar',
      owner: 'user-123',
      thread: 'thread-123',
    };

    const { content, owner, thread } = new AddComment(payload);

    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(thread).toEqual(payload.thread);
  });
});
