const { DataSource } = require("../../library/dataSource");
const path = require("path");
const { userPassedTest } = require("./entity/user_passed_test.entity");
const {
  userNotFound,
  testNotFound,
} = require("./exception/user_passed_test.exception");
const { generationId } = require("../../library/generationId");
const { ResData } = require("../../library/resData");
const { log } = require("util");

class UserPassedTestService {
  async create(dto) {
    const user = this.#_userFindById(dto.userId);
    const test = this.#_testFindById(dto.testId);

   

    if (!user) {
      throw new userNotFound();
    }

    if (!test) {
      throw new testNotFound();
    }
    const userPath = path.join(
      __dirname,
      "../../../database",
      "user_passed_tests.json"
    );
    const userdataSource = new DataSource(userPath);
    const users = userdataSource.read();

    const id = generationId(users);

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ("0" + currentDate.getDate()).slice(-2);
    const hours = ("0" + currentDate.getHours()).slice(-2);
    const minutes = ("0" + currentDate.getMinutes()).slice(-2);
    const seconds = ("0" + currentDate.getSeconds()).slice(-2);

    
    const date =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
      

    const newUser = new userPassedTest(
      id,
      dto.userId,
      dto.testId,
      dto.totalQuestion,
      dto.passedQuestion,
      date
    );

    users.push(newUser);
    userdataSource.write(users);
   
    const resData = new ResData(
      "User_passed_test created successfully",
      201,
      newUser,
      null
    );
   
    return resData;

  }

  #_userFindById(userId) {
    const userPath = path.join(
      __dirname,
      "../../../database",
      "user_passed_tests.json"
    );
    const userdataSource = new DataSource(userPath);
    const users = userdataSource.read();

    const user = users.find((user) => user.user_id === userId);
    return user;
  }

  #_testFindById(testId) {

    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);
    const tests = testDataSource.read();

    const test = tests.find((test) => test.id === testId);

    return test;
  }

  
}

module.exports = { UserPassedTestService };
