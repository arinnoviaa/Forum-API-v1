class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;

    await this._threadRepository.verifyAvailableThread(threadId);

    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsThread(threadId);

    const commentsThread = await Promise.all(comments.map(async (comment) => ({
      ...comment,
    })));

    return {
      ...thread,
      comments: commentsThread,
    };
  }
}

module.exports = GetThreadUseCase;
