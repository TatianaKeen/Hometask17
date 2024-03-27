// 1. Використовуючи метод reduce(), створіть новий об'єкт, де ключами будуть міста (address.city), 
// а значеннями будуть масиви об'єктів користувачів, які проживають у цих містах. 
// Об'єкт користувача повинен містити його ID, ім'я (name), емейл (email), телефон (phone), 
// назву компанії (company.name).

// 2. Відсортуйте масив користувачів за алфавітом за їхнім ім'ям.

// 3. Використовуючи оператор розширення (spread operator) та оператор залишку (rest operator), 
// створіть новий масив користувачів, де кожен об'єкт користувача містить тільки його ID, ім'я та телефон.

// Для організації коду, опишіть довільний прототип функції із методом (-ами) для отримання списка users
// (комбінуйте із fetch, async/await, Promise), метод для виконання reduce, метод для виводу інформації 
// після застосування spread/rest.


class UserHandlerTask2 {
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

  reduceByCity() {
    return this.users.reduce((accumulator, user) => {
      const city = user.address.city;
      if (!accumulator[city]) {
        accumulator[city] = [];
      }
      accumulator[city].push({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company.name
      });
      return accumulator;
    }, {});
  }

  sortByName() {
    return this.users.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  }

  spreadAndRest() {
    return this.users.map(user => {
      const { address, company, email, website, username, ...rest } = user;
      return { ...rest };
    });
  }

}

(async () => {
  const userHandler = new UserHandlerTask2();
  await userHandler.fetchUsers();

  const usersByCity = userHandler.reduceByCity();
  console.log("Users by city:", usersByCity);

  const sortedUsersByName = userHandler.sortByName();
  console.log("Users sorted by name:", sortedUsersByName);

  const spreadAndRestUsers = userHandler.spreadAndRest();
  console.log("Spread and rest users:", spreadAndRestUsers);
})();