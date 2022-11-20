import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    };
  }

  checkLetterOrNumber = (str) => {
    let splittedArray = str.split('');
    let mapped = splittedArray.map((s) => {
      if (s == '0' || Boolean(Number(s)) == true) {
        return 'number';
      } else {
        return 'string';
      }
    });
    return mapped;
  };

  handlePasswordError = (value) => {
    if (!value) {
      return 'password cannot be blank';
    } else if (value.length < 6) {
      return 'password must be more than 6 characters';
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
      return 'password must contain one letter and one number';
    } else {
      return '';
    }
  };

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'email':
        errors[name] = !value ? 'email cannot be blank' : '';
        break;
      case 'password':
        errors[name] = this.handlePasswordError(value);
        break;
      default:
        break;
    }
    return this.setState({
      [name]: value,
    });
  };
  render() {
    let { email, password } = this.state.errors;
    return (
      <section className="w-[560px] mx-auto my-0">
        <div>
          <h2 className="text-center text-[#373B3D] text-3xl">Sign In</h2>
          <NavLink
            to="/register"
            className="text-center block text-sm my-2 text-[#5DB85C] hover:underline"
          >
            Need an account?
          </NavLink>
        </div>
        <div className="flex items-center">
          {password || email ? <div className="dot"></div> : ''}
          <span className="text-[#b95d5c] text-xs font-semibold">
            {password || email}
          </span>
        </div>
        <form action="#">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            className="border-[1px] my-4 w-full rounded block bg-transparent  border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            className="border-[1px] w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          <div className="text-right">
            <button
              type="submit"
              className="bg_green rounded text-white py-3 px-6 my-4"
            >
              Sign in
            </button>
          </div>
        </form>
      </section>
    );
  }
}
