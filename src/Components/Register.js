import { data } from 'autoprefixer';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { rootURL } from '../utils/constants';
import { registerOrLogin, validate } from '../utils/validate';

class Register extends React.Component {
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
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { makeAuthToTrue } = this.props;
    let { email, username, password } = this.state;
    let errors = { ...this.state.errors };

    registerOrLogin('register', email, username, password).then((data) => {
      console.log(data, 'errors, data');
      if (data.errors) {
        this.setState({
          errors: {
            username: data.errors.username
              ? 'username ' + data.errors.username
              : '',
            email: data.errors.email ? 'email ' + data.errors.email : '',
            password: !this.state.password ? 'password cannot be blank' : '',
          },
        });
      } else {
        // localStorage.setItem('user', JSON.stringify(data.user));
        makeAuthToTrue(data.user);
        this.props.history.push('/');
      }
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
        <form action="/api/users" method="post" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            className="border-[1px] my-2 w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          <div className="flex items-center">
            {username ? <div className="dot"></div> : ''}
            <span className="text-[#b95d5c] text-xs font-semibold">
              {username}
            </span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => this.handleChange(e)}
            value={this.state.email}
            className="border-[1px] my-2 w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          <div className="flex items-center">
            {email ? <div className="dot"></div> : ''}
            <span className="text-[#b95d5c] text-xs font-semibold">
              {email}
            </span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            className="border-[1px] w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898] my-1"
          />
          <div className="flex items-center">
            {password ? <div className="dot"></div> : ''}
            <span className="text-[#b95d5c] text-xs font-semibold">
              {password}
            </span>
          </div>
          <div className="text-right">
            <input
              type="submit"
              onSubmit={this.handleSubmit}
              value="Sign up"
              disabled={username || email || password}
              className="bg_green btn-register rounded text-white py-3 px-6 my-3"
            />
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(Register);
