class User {
  _id;
  steamId;
  nickname;
  avatarUrl;
  firstName;
  lastName;
  constructor(id, nickName, avatarUrl) {
    this.steamId = id;
    this.nickname = nickName;
    this.avatarUrl = avatarUrl;
  }
}

module.exports = User;
