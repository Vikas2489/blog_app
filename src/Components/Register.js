import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      errors: {
        username: '',
        password: '',
        email: '',
      },
    };
  }
  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'username':
        errors[name] =
          value.length < 6 ? 'username cannot be less than 6 characters' : '';
        break;
      case 'username':
        errors[name] = !value ? 'username cannot be blank' : '';
        break;
      case 'password':
        errors[name] =
          value.length < 6 ? 'password cannot be less than 6 characters' : '';
        break;
      case 'password':
        errors[name] = !value ? 'password cannot be blank' : '';
        break;
      case 'email':
        errors[name] = !value ? 'email cannot be blank' : '';
      default:
        break;
    }

    this.setState({
      [name]: value,
    });
  };

  render() {
    let { username, email, password } = this.state.errors;
    return (
      <section className="w-[560px] mx-auto my-0">
        <div>
          <h2 className="text-center text-[#373B3D] text-3xl">Sign Up</h2>
          <NavLink
            to="/login"
            className="text-center block text-sm my-2 text-[#5DB85C] hover:underline"
          >
            Have an account?
          </NavLink>
        </div>
        <form action="#">
          <div className="flex items-center">
            {username || password || email ? <div className="dot"></div> : ''}
            <span className="text-[#b95d5c] text-xs font-semibold">
              {username || password || email}
            </span>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            className="border-[1px] my-4 w-full rounded block bg-transparent  border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
            className="border-[1px] my-4 w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
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
              Sign up
            </button>
          </div>
        </form>
      </section>
    );
  }
}
