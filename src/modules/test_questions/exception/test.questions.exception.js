class databaseCheckTestAndQuest extends Error {
  constructor() {
    super("Already exist data");

    this.statusCode = 403;
  }
}

class testAndQuestBadRequest extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 403;
  }
}

module.exports = { databaseCheckTestAndQuest, testAndQuestBadRequest };
