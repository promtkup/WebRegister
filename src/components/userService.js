import { ref } from 'vue';

const users = ref([]);
const currentUser = ref(null);
const loadStoredUsers = () => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  users.value = storedUsers;
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  currentUser.value = storedUser;
};


loadStoredUsers();


const registerUser = (newUser) => {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = storedUsers.some((user) => user.email === newUser.email);
  if (userExists) {
    throw new Error('This email is already registered.');
  }
  storedUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(storedUsers));
  users.value = storedUsers;
  currentUser.value = newUser;
  localStorage.setItem('user', JSON.stringify(newUser));
};


const loginUser = (emailOrUsername, password) => {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(
    (user) =>
      (user.email === emailOrUsername || user.username === emailOrUsername) &&
      user.password === password
  );
  if (!user) {
    throw new Error('Incorrect email, username, or password.');
  }


  currentUser.value = user;
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};
const logoutUser = () => {
  currentUser.value = null;
  localStorage.removeItem('user');
};

export { users, currentUser, registerUser, loginUser, logoutUser, loadStoredUsers };
