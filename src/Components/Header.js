import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { auth, user } = this.props;
    if (user) {
      var { username, email } = user;
    }

    return (
      <header>
        <nav className="flex items-center justify-between container">
          <NavLink to="/" className="green text-xl font-bold" exact>
            Conduit
          </NavLink>
          <ul className="flex justify-between items-center space-x-4">
            <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
              <NavLink activeClassName="text-[#7B7B7A]" to="/" exact>
                Home
              </NavLink>
            </li>
            {!user ? (
              <>
                <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
                  <NavLink activeClassName="text-[#7B7B7A]" to="/login">
                    Sign in
                  </NavLink>
                </li>
                <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
                  <NavLink
                    activeClassName="text-[#7B7B7A]"
                    to="/register"
                    exact
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
                  <NavLink activeClassName="text-[#7B7B7A]" to="/new_post">
                    <div className="flex  items-center">
                      <span className="mr-1">
                        <BsFillFileEarmarkPostFill />
                      </span>
                      New Post
                    </div>
                  </NavLink>
                </li>
                <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
                  <NavLink activeClassName="text-[#7B7B7A]" to="/settings">
                    <div className="flex items-center">
                      <span className="mr-1">
                        <AiOutlineSetting />
                      </span>
                      Settings
                    </div>
                  </NavLink>
                </li>
                <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
                  <NavLink
                    activeClassName="text-[#7B7B7A]"
                    to={`/profile/${username}`}
                  >
                    <div className="flex items-center">
                      <div className="w-7 h-7 mr-2">
                        <img
                          className="w-7 h-7 rounded block"
                          src={user.image || '/smiley.png'}
                          alt="profile_pic"
                          className="mr-1"
                        />
                      </div>

                      <p>{username}</p>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
