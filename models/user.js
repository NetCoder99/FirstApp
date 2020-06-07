module.exports = User;
var userCount = 0;

function User(n) {
    this.id = userCount;
    this.name = n;
    userCount++;
}