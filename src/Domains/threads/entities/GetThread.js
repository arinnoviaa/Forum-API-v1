class GetThread {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      id, title, body, date, username,
    } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date.toString();
    this.username = username;
  }

  _verifyPayload(payload) {
    const {
      id, title, body, date, username,
    } = payload;

    [id, title, body, date, username].forEach((item) => {
      if (!item) {
        throw new Error('GET_THREAD.PAYLOAD_DID_NOT_CONTAIN_NEEDED_PROPERTY');
      }
      if (typeof item !== 'string') {
        throw new Error('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    });
  }
}

module.exports = GetThread;
