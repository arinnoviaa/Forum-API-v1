const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadsTableTestHelper.addThread({});
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('verifyAvailableComment function', () => {
    it('should throw NotFoundError when comment not available', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyAvailableComment('comment-123')).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when comment available', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyAvailableComment('comment-123')).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('addComment Function', () => {
    it('should persist add comment', async () => {
      // Arrange
      const comment = new AddComment({
        content: 'sebuah komentar',
        owner: 'user-123',
        thread: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(comment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comments).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const comment = new AddComment({
        content: 'sebuah komentar',
        owner: 'user-123',
        thread: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(comment);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: comment.content,
        owner: comment.owner,
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should delete comment correctly', async () => {
      // Arrange
      const id = 'comment-123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await CommentsTableTestHelper.addComment({});

      // Action
      await commentRepositoryPostgres.deleteComment(id);
      const comment = await CommentsTableTestHelper.findCommentById(id);

      // Assert
      expect(comment).toHaveLength(0);
    });
  });

  describe('verifyCommentOwner function', () => {
    it('should throw AuthorizationEerror when owner does not match', async () => {
      // Arrange
      const owner = 'user-909';
      await CommentsTableTestHelper.addComment({});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', owner))
        .rejects.toThrowError(AuthorizationError);
    });

    it('should not throw authorization error when owner match', async () => {
      // Arrange
      const owner = 'user-123';
      await CommentsTableTestHelper.addComment({});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', owner))
        .resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe('getCommentsThread function', () => {
    it('should return all comments correctly', async () => {
      // Assert
      const threadId = 'thread-123';
      const expectedResult = {
        id: 'comment-123',
        username: 'dicoding',
        content: 'sebuah komentar',
      };
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await CommentsTableTestHelper.addComment({});

      // Action
      const result = await commentRepositoryPostgres.getCommentsThread(threadId);

      // Assert
      expect(result[0].id).toEqual(expectedResult.id);
      expect(result[0].username).toEqual(expectedResult.username);
      expect(result[0].content).toEqual(expectedResult.content);
      expect(result[0]).toHaveProperty('date');
    });
  });
});
