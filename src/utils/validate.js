import { rootURL } from './constants';
export function validate(errors, name, value) {
  switch (name) {
    case 'email':
      errors.email = handleEmailError(value);
      break;
    case 'password':
      errors.password = handlePasswordError(value);
      break;
    case 'username':
      errors.username = handleUsernameError(value);
      break;
    default:
      break;
  }
}

function handleUsernameError(value) {
  if (value.length < 6) {
    return 'username cannot be less than 6 characters';
  } else if (!value) {
    return 'username cannot be blank';
  }
  return;
}

function handleEmailError(value) {
  if (!value) {
    return 'email cannot be blank';
  } else if (!value.includes('@')) {
    return 'email does not contain @';
  }
  return;
}

function handlePasswordError(value) {
  if (!value) {
    return 'password cannot be blank';
  } else if (value.length < 6) {
    return 'password must be more than 6 characters';
  } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
    return 'password must contain one letter and one number';
  } else {
    return '';
  }
}

export function registerOrLogin(validateFor, email, username, password) {
  let url =
    validateFor == 'register' ? rootURL + 'users' : rootURL + 'users/login';

  if (validateFor == 'register') {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  } else {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
}
