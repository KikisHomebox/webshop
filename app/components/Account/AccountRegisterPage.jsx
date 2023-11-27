import {Form, Link} from '@remix-run/react';
import LabelFloatingInput from '../Input/LabelFloatingInput';
import ActionButton from '../ActionButton/ActionButton';

const AccountRegisterPage = ({data}) => {
  const error = data?.error || null;
  return (
    <div className="account-register">
      <h1 className="account-heading">Register</h1>
      <Form method="POST">
        <fieldset>
          <LabelFloatingInput
            id="firstName"
            name="firstName"
            type="text"
            required
            labelText="First name"
            aria-label="first-name"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <LabelFloatingInput
            id="lastName"
            name="lastName"
            type="text"
            required
            labelText="Last name"
            aria-label="last-name"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <LabelFloatingInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            labelText="Email address"
            aria-label="Email address"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <LabelFloatingInput
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            labelText="Password"
            aria-label="Password"
            minLength={8}
            required
          />
          <LabelFloatingInput
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autoComplete="current-password"
            labelText="Re-enter password"
            aria-label="Re-enter password"
            minLength={8}
            required
          />
        </fieldset>
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : null}
        <ActionButton
          text="Register"
          filled
          customClassName={['account-register-btn']}
        />
      </Form>
      <p className="account-register-support-text">
        <span>Already have an account?</span>
        <Link to="/account/login">Login</Link>
      </p>
    </div>
  );
};

export default AccountRegisterPage;
