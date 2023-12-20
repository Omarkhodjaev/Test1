const { DataSource } = require("../../library/dataSource.js");
const path = require("path");
const { ResData } = require("../../library/resData.js");

const {
  TestNotFoundException,
} = require("./exception/test.exception.js");

const { generationId } = require("../../library/generationId.js");
const { Test } = require("../../library/testClass.js");
const { jwtSign } = require("../../library/jwt.js");

class TestService {
  getAllTest() {
    const testPath = path.join(__dirname, "../../../database", "tests.json");

    const testDataSource = new DataSource(testPath);

    const tests = testDataSource.read();

    const token = jwtSign({ userId: 12, role: "admin" });

    const resData = new ResData("all tests are taken", 200, { tests, token });

    return resData;
  }

  createTest(dto) {
    const testPath = path.join(__dirname, "../../../database", "tests.json");
    const testDataSource = new DataSource(testPath);
    const tests = testDataSource.read();

    const generatedId = generationId(tests);

    const newTest = new Test(generatedId, dto.title);

    tests.push(newTest);

    testDataSource.write(tests);

    const resData = new ResData("Test created", 201, newTest);

    return resData;
  }

  updateTest(dto, testId) {

    const { data: foundTestById } = this.getOneTestById(testId);

    foundTestById.title = dto.title;

    const testPath = path.join(__dirname, "../../../database", "tests.json");
    const testDataSource = new DataSource(testPath);
    const tests = testDataSource.read();

    const filterTest = tests.filter((test) => test.id !== foundTestById.id);
    filterTest.push(foundTestById);

    testDataSource.write(filterTest);

    const resData = new ResData("updated test", 200, foundTestById);

    return resData;
  }

  getOneTestById(testId) {
    const testPath = path.join(__dirname, "../../../database", "tests.json");
    const testDataSource = new DataSource(testPath);
    const tests = testDataSource.read();

    const foundTest = tests.find((test) => test.id === testId);

    if (!foundTest) {
      throw new TestNotFoundException();
    }

    const resData = new ResData("found test by id", 200, foundTest);

    return resData;
  }

  deleteTest(testId) {
    const { data: foundTestById } = this.getOneTestById(testId);

    const testPath = path.join(__dirname, "../../../database", "tests.json");
    const testDataSource = new DataSource(testPath);
    const tests = testDataSource.read();

    const filterTest = tests.filter((test) => test.id !== foundTestById.id);

    testDataSource.write(filterTest);

    const resData = new ResData("deleted test by id", 200, foundTestById);

    return resData;
  }
}

module.exports = { TestService };
