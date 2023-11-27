import {Form, useActionData, useNavigation} from '@remix-run/react';
import ActionButton from '../ActionButton/ActionButton';
import {useState} from 'react';
import Modal from '../Modal/Modal';
import LabelFloatingInput from '../Input/LabelFloatingInput';

const AccountProfilePage = ({account}) => {
  const [open, setOpen] = useState(false);

  const {state} = useNavigation();
  const action = useActionData();
  const customer = action?.customer ?? account?.customer;

  return (
    <div className="account-profile">
      <h1 className="account-heading">My profile</h1>
      <div className="account-profile-details">
        <p>
          {customer.firstName} {customer.lastName}
        </p>
        {customer.phone ? <p>{customer.phone}</p> : null}
        {customer.email ? <p>{customer.email}</p> : null}
      </div>
      <ActionButton
        text="Edit profile"
        type={null}
        onClick={() => setOpen(true)}
        filled
        customClassName={['account-profile-edit-btn']}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="account-modal-form">
          <Form method="PUT">
            <legend>Personal information</legend>
            <fieldset>
              <LabelFloatingInput
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                labelText="First name"
                aria-label="First name"
                defaultValue={customer.firstName ?? ''}
                minLength={2}
              />
              <LabelFloatingInput
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                labelText="Last name"
                aria-label="Last name"
                defaultValue={customer.lastName ?? ''}
                minLength={2}
              />
              <LabelFloatingInput
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                labelText="Mobile"
                aria-label="Mobile"
                defaultValue={customer.phone ?? ''}
              />
              <LabelFloatingInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                labelText="Email address"
                aria-label="Email address"
                defaultValue={customer.email ?? ''}
              />
              <div className="account-profile-marketing">
                <input
                  id="acceptsMarketing"
                  name="acceptsMarketing"
                  type="checkbox"
                  placeholder="Accept marketing"
                  aria-label="Accept marketing"
                  defaultChecked={customer.acceptsMarketing}
                />
                <label htmlFor="acceptsMarketing">
                  &nbsp; Subscribed to marketing communications
                </label>
              </div>
            </fieldset>
            <legend>Change password (optional)</legend>
            <fieldset>
              <LabelFloatingInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                labelText="Current password"
                aria-label="Current password"
                minLength={8}
              />
              <LabelFloatingInput
                id="newPassword"
                name="newPassword"
                type="password"
                labelText="New password"
                aria-label="New password"
                minLength={8}
              />
              <LabelFloatingInput
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                type="password"
                labelText="New password (confirm)"
                aria-label="New password confirm"
                minLength={8}
              />
              <small>Passwords must be at least 8 characters.</small>
            </fieldset>
            {action?.error ? (
              <p>
                <mark>
                  <small>{action.error?.message}</small>
                </mark>
              </p>
            ) : null}
            <div className="account-form-action-btns">
              <ActionButton
                disabled={state !== 'idle'}
                text={state !== 'idle' ? 'Updating' : 'Update'}
                filled
              />
              <ActionButton
                text="Cancel"
                onClick={() => setOpen(false)}
                type={null}
              />
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AccountProfilePage;
