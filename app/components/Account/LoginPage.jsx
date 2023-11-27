import {Form, Link} from '@remix-run/react';
import './LoginPage.css';
import ActionButton from '../ActionButton/ActionButton';
import LabelFloatingInput from '../Input/LabelFloatingInput';

const LoginPage = ({error}) => {
  return (
    <div className="login">
      <h1 className="login-title">Login</h1>
      <Form className="login-form" method="POST">
        <div className="login-fieldset">
          <LabelFloatingInput
            labelText="Email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-label="Email address"
          />
          <LabelFloatingInput
            labelPlaceholder="password"
            labelText="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-label="Password"
            minLength={8}
            required
          />
        </div>
        <p className="login-link">
          <Link to="/account/recover">Forgot your password?</Link>
        </p>
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : null}
        <ActionButton text="Sign in" filled customClassName={['login-btn']} />
        <p className="login-link login-register">
          <Link to="/account/register">Create account</Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
