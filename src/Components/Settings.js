import React from 'react';
import { rootURL } from '../utils/constants';
import { handlePasswordError } from '../utils/validate';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      image: '',
      password: null,
      bio: '',
      isUpdating: false,
      email: this.props.user.email,
      errors: {
        username: '',
        email: '',
        password: '',
      },
    };
  }
  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };
    switch (name) {
      case 'password':
        if (value.length < 6) {
          errors.password = 'password must be more than 6 characters';
        } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
          errors.password = 'password must contain one letter and one number';
        } else {
          errors.password = '';
        }
        break;
      case 'email':
        if (!value.includes('@')) {
          errors.email = 'email does not contain @';
        } else {
          errors.email = '';
        }
      default:
        break;
    }

    return this.setState({
      [name]: value,
      errors,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };
    let token = localStorage.token;
    let { password, bio, username, email, image } = this.state;
    this.setState({
      isUpdating: true,
    });
    return fetch(rootURL + 'users', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        username: this.state.username,
        image: this.state.image,
        bio: this.state.bio,
        password: this.state.password,
        email: this.state.email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
      })
      .then((data) => {
        this.setState({
          isUpdating: false,
        });
        console.log(data, 'updateduser');
        // this.props.makeAuthToTrue(data.user);
      })
      .catch((err) => {
        console.log(err, 'err while updating');
        // this.setState({
        //   errors: {
        //     username: err.errors.username
        //       ? 'username ' + err.errors.username
        //       : '',
        //     email: err.errors.email ? 'email ' + err.errors.email : '',
        //   },
        // });
      });
  };

  handleLogout = () => {
    let { makeAuthToFalse } = this.props;
    makeAuthToFalse();
    localStorage.clear();
    this.props.history.push('/');
  };

  render() {
    let { user } = this.props;
    let { errors } = this.state;
    return (
      <div className="w-[450px] mx-auto my-0">
        <h1 className="text-center text-2xl text-[#363A3D] mb-2">
          Your Settings
        </h1>
        <form
          className="w-full"
          method="PUT"
          action={rootURL + 'users'}
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="URL of profile picture"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
            className="border-[1px] w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            className="border-[1px] my-3 w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          {errors.username ? (
            <div className="flex items-center">
              <div className="dot"></div>
              <span className="text-[#b95d5c] text-xs font-semibold">
                {errors.username}
              </span>
            </div>
          ) : (
            ''
          )}
          <textarea
            name="bio"
            placeholder="Short bio on yourself"
            cols="83"
            rows="10"
            value={this.state.bio}
            onChange={this.handleChange}
            className="border-[1px] bg-transparent rounded p-3 w-full border-[#D9D8D8] border-solid"
          ></textarea>
          <input
            type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
            name="email"
            className="border-[1px] w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 mt-1 placeholder:font-normal placeholder:text-[#999898]"
          />
          {errors.email ? (
            <div className="flex items-center">
              <div className="dot"></div>
              <span className="text-[#b95d5c] text-xs font-semibold">
                {errors.email}
              </span>
            </div>
          ) : (
            ''
          )}
          <input
            type="password"
            placeholder="New Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="border-[1px] mt-3  w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3  placeholder:font-normal placeholder:text-[#999898]"
          />
          {errors.password ? (
            <div className="flex items-center">
              <div className="dot"></div>
              <span className="text-[#b95d5c] text-xs font-semibold">
                {errors.password}
              </span>
            </div>
          ) : (
            ''
          )}
          <div className="text-right">
            <input
              type="submit"
              className="bg_green btn-login rounded text-white py-3 px-6 my-4"
              disabled={this.state.isUpdating}
              value={this.state.isUpdating ? 'Updating....' : 'Update Settings'}
            />
          </div>
          <hr />
        </form>
        <input
          type="button"
          value="or click here to logout"
          onClick={this.handleLogout}
          className="bg-transparent hover:bg-[#B85D5D] hover:text-white border-[1px] border-solid rounded text-[#B85D5D] border-[#B85D5D] py-1 px-6 my-4"
        />
      </div>
    );
  }
}

export default withRouter(Settings);
