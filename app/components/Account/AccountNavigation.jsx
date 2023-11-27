import {NavLink, Form} from '@remix-run/react';
import {FaRegUser} from 'react-icons/fa';

const Logout = () => {
  return (
    <div className="logout">
      <FaRegUser className="logout-icon" />
      <Form className="account-logout" method="POST" action="/account/logout">
        <button className="logout-btn" type="submit">
          Log out
        </button>
      </Form>
    </div>
  );
};

const AccountNavigation = () => {
  const isActiveStyle = ({isActive, isPending}) => {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    };
  };

  return (
    <nav className="account-navigation" role="navigation">
      <NavLink to="/account/orders" style={isActiveStyle}>
        Orders
      </NavLink>
      <NavLink to="/account/profile" style={isActiveStyle}>
        Profile
      </NavLink>
      <NavLink to="/account/addresses" style={isActiveStyle}>
        Addresses
      </NavLink>
      <Logout />
    </nav>
  );
};

export default AccountNavigation;
