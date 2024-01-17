const { Postgress } = require("../../library/pg.js");

class UserRepository extends Postgress {
  async findOneByLogin(login) {
    return await this.fetch(
      `SELECT u.id, u.login, u.password, u.full_name, u.birthdate, row_to_json(f) as file 
    FROM test.users u 
    INNER JOIN test.files f ON u.file_id = f.id 
    WHERE login = $1`,
      login
    );
  }

  async findOneById(userId) {
    return await this.fetch(
      `SELECT u.id, u.login, u.password, u.full_name, u.birthdate, row_to_json(f) as file 
       FROM test.users u 
       INNER JOIN test.files f ON u.file_id = f.id 
       WHERE u.id = $1`,
      userId
    );
  }

  async getAllUsers() {
    return await this.fetchAll(
      "SELECT u.id, u.login, u.password, u.full_name, u.birthdate, row_to_json(f) AS file  FROM test.users u  INNER JOIN test.files f ON u.file_id = f.id;"
    );
  }

  async insertUser(UserEntity) {
    return await this.fetch(
      "INSERT INTO test.users(login, password, full_name, birthdate, role, file_id) VALUES($1, $2, $3, $4, $5, $6) returning *",
      UserEntity.login,
      UserEntity.password,
      UserEntity.full_name,
      UserEntity.birthdate,
      UserEntity.role,
      UserEntity.file_id
    );
  }

  async update(updatedUser, userId) {
    return await this.fetch(
      `UPDATE test.users SET login = $1, password = $2, full_name = $3, birthdate = $4 WHERE id = $5 RETURNING *`,
      updatedUser.login,
      updatedUser.password,
      updatedUser.full_name,
      updatedUser.birthdate,
      userId
    );
  }
}

module.exports = { UserRepository };
