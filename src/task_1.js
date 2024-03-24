// 1. Використовуючи методи Object.keys() та Object.values(), виведіть в консоль 
// наступну інформацію для кожного користувача:
// ID, ім'я, електронну адресу та місто.

class UserHandler {
  constructor() {
    this.users = [];
  }

  async fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }


  printUserInfo() {
    const timeStart = performance.now();
    const ALLOWED_KEYS = ['id', 'name', 'email', 'address'];

    this.users.forEach(user => {
      const userKeys = Object.keys(user);
      const userInfo = Object.values(user);
      const newUser = {};

      for (let i = 0; i < userKeys.length; i++) {
        if (ALLOWED_KEYS.includes(userKeys[i])) {
          if (userKeys[i] == 'address') {
            newUser['city'] = userInfo[i].city;
            break;
          }
          newUser[userKeys[i]] = userInfo[i];
        }
      }
      console.log(newUser);
    });
    const timeEnd = performance.now();
    console.log('printUserInfo ', timeEnd - timeStart)
  }


  printUserInfo2() {
    const timeStart = performance.now();
    this.users.forEach(user => {
      const userKeys = Object.keys(user);
      const userInfo = Object.values(user);
      const newUser = {};

      const idIndex = userKeys.findIndex((value) => value === 'id');
      const nameIndex = userKeys.findIndex((value) => value === 'name');
      const emailIndex = userKeys.findIndex((value) => value === 'email');
      const addressIndex = userKeys.findIndex((value) => value === 'address');

      newUser[userKeys[idIndex]] = userInfo[idIndex];
      newUser[userKeys[nameIndex]] = userInfo[nameIndex];
      newUser[userKeys[emailIndex]] = userInfo[emailIndex];
      newUser[userKeys[addressIndex]] = userInfo[addressIndex].city;

      console.log(newUser);
    });
    const timeEnd = performance.now();
    console.log('printUserInfo2 ', timeEnd - timeStart)
  }
}

(async () => {
  const userHandler = new UserHandler();
  await userHandler.fetchUsers();
  userHandler.printUserInfo();
  userHandler.printUserInfo2();
})();