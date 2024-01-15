class UserEntity {
  constructor(dto, hashedpassword) {
    this.login = dto.login;
    this.password = dto.password;
    this.full_name = dto.fullName;
    this.birthdate = dto.birthdate;
    this.role = dto.role;
    this.file_id = dto.fileId
  }
}

module.exports = { UserEntity };
