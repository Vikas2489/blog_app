import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';

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
      <header className="sm_container">
        <nav className="flex container items-center justify-between">
          <NavLink to="/" className="green text-xl font-bold" exact>
            Conduit
          </NavLink>
          <div>
            <label htmlFor="menu" className="hidden sm_block toggle_menu">
              <FaBars />
            </label>
            <input type="checkbox" id="menu" className="hidden" />
            <ul className="flex sm_display_none sm_navlinks justify-between items-center  ">
              <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A] ">
                <NavLink activeClassName="text-[#7B7B7A]" to="/" exact>
                  Home
                </NavLink>
              </li>
              {!user ? (
                <>
                  <li className="text-sm text-[#B3B2B3] ml-4 hover:text-[#7B7B7A]">
                    <NavLink activeClassName="text-[#7B7B7A]" to="/login">
                      Sign in
                    </NavLink>
                  </li>
                  <li className="text-sm text-[#B3B2B3] ml-4 hover:text-[#7B7B7A]">
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
                  <li className="text-sm text-[#B3B2B3] ml-4 hover:text-[#7B7B7A]">
                    <NavLink activeClassName="text-[#7B7B7A]" to="/new_post">
                      <div className="flex  items-center">
                        <span className="mr-1">
                          <BsFillFileEarmarkPostFill />
                        </span>
                        New Post
                      </div>
                    </NavLink>
                  </li>
                  <li className="text-sm ml-4 text-[#B3B2B3] hover:text-[#7B7B7A]">
                    <NavLink activeClassName="text-[#7B7B7A]" to="/settings">
                      <div className="flex items-center">
                        <span className="mr-1">
                          <AiOutlineSetting />
                        </span>
                        Settings
                      </div>
                    </NavLink>
                  </li>
                  <li className="text-sm ml-4 text-[#B3B2B3] hover:text-[#7B7B7A]">
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
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
