import ActionButton from '../ActionButton/ActionButton';
import AccountNavigation from './AccountNavigation';
import {useNavigate} from '@remix-run/react';
import './AccountPage.css';
const AccountPage = ({customer, isAccountHome, children}) => {
  const navigate = useNavigate();
  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <div className="account">
      <AccountNavigation />
      {isAccountHome ? (
        <>
          <h1 className="account-heading account-main-heading">{heading}</h1>
          <ActionButton
            text="Start shopping"
            onClick={() => navigate(`/products`)}
            filled
            type={null}
          />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default AccountPage;
