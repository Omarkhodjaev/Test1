class User{
    constructor(id, login, password, full_name, birthdate, role){
        this.id = id;
        this.login = login;
        this.password = password;
        this.full_name = full_name;
        this.birthdate = birthdate;
        this.role = role;
    }
}

module.exports = User;

