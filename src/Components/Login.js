import React from 'react';
import { NavLink } from 'react-router-dom';
import validate from '../utils/validate';

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

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    return this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { email, username, password } = this.state.errors;
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
        <form
          action="/api/users/login"
          method="post"
          onSubmit={this.handleSubmit}
        >
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
            <input
              type="submit"
              className="bg_green btn-login rounded text-white py-3 px-6 my-4"
              disabled={this.state.errors.email || this.state.errors.password}
              value="Sign In"
            />
          </div>
        </form>
      </section>
    );
  }
}
