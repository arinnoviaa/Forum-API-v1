const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const thread = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: '20220909',
      username: 'dicoding',
    };

    const comments = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '20220909',
        content: 'sebuah komentar',
        is_deleted: false,
      },
    ];

    const expectedThread = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: '20220909',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: '20220909',
          content: 'sebuah komentar',
          is_deleted: false,
        },
      ],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(thread));
    mockCommentRepository.getCommentsThread = jest.fn()
      .mockImplementation(() => Promise.resolve(comments));

    /** creating use case instance */
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const actualGetThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(actualGetThread).toEqual(expectedThread);
    expect(mockThreadRepository.verifyAvailableThread)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.getThreadById)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsThread)
      .toHaveBeenCalledWith(useCasePayload.threadId);
  });
});
