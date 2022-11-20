import React from 'react';
import { NavLink, Route } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <nav className="flex  justify-between container">
          <NavLink to="/" className="green text-xl font-bold" exact>
            Conduit
          </NavLink>

          <ul className="flex justify-between items-center space-x-4">
            <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
              <NavLink activeClassName="text-[#7B7B7A]" to="/" exact>
                Home
              </NavLink>
            </li>
            <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
              <NavLink activeClassName="text-[#7B7B7A]" to="/login">
                Sign in
              </NavLink>
            </li>
            <li className="text-sm text-[#B3B2B3] hover:text-[#7B7B7A]">
              <NavLink activeClassName="text-[#7B7B7A]" to="/register" exact>
                Sign up
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
