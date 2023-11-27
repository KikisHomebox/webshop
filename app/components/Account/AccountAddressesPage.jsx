import {Form, useActionData, useNavigation} from '@remix-run/react';
import ActionButton from '../ActionButton/ActionButton';
import Modal from '../Modal/Modal';
import {useState} from 'react';
import LabelFloatingInput from '../Input/LabelFloatingInput';

const AccountAddressesPage = ({customer}) => {
  const {defaultAddress, addresses} = customer;
  const [newAddressFormOpen, setNewAddressFormOpen] = useState(false);

  return (
    <div className="account-addresses">
      <h1 className="account-heading">Addresses</h1>
      {!addresses.nodes.length ? (
        <p>You have no addresses saved.</p>
      ) : (
        <div>
          <div className="account-addresses-add-new">
            <ActionButton
              text="Add a new address"
              onClick={() => setNewAddressFormOpen(true)}
              type={null}
              filled
            />
            <Modal
              open={newAddressFormOpen}
              onClose={() => setNewAddressFormOpen(false)}
            >
              <div className="account-modal-form">
                <NewAddressForm
                  onCloseHandle={() => setNewAddressFormOpen(false)}
                />
              </div>
            </Modal>
          </div>
          <div>
            <ExistingAddresses
              addresses={addresses}
              defaultAddress={defaultAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const NewAddressForm = ({onCloseHandle}) => {
  const newAddress = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    id: 'new',
    lastName: '',
    phone: '',
    province: '',
    zip: '',
  };

  return (
    <AddressForm address={newAddress} defaultAddress={null}>
      {({stateForMethod}) => (
        <div className="account-form-action-btns">
          <ActionButton
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            text={stateForMethod('POST') !== 'idle' ? 'Creating' : 'Create'}
            filled
          />
          <ActionButton text="Cancel" onClick={onCloseHandle} />
        </div>
      )}
    </AddressForm>
  );
};

const ExistingAddresses = ({addresses, defaultAddress}) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div>
      {addresses.nodes.map((address, index) => (
        <div className="account-existing-address" key={address.id}>
          <div className="account-existing-address-info">
            {address.id === defaultAddress.id ? <h3>Default</h3> : null}
            <p>
              {address.firstName} {address.lastName}
            </p>
            {address.formatted.map((info) => (
              <p key={address.id}>{info}</p>
            ))}
            <ActionButton
              text="Edit"
              onClick={() => setOpenIndex(index)}
              type={null}
            />
          </div>
          <Modal open={openIndex === index} onClose={() => setOpenIndex(null)}>
            <div className="account-modal-form">
              <AddressForm
                key={address.id}
                address={address}
                defaultAddress={defaultAddress}
              >
                {({stateForMethod}) => (
                  <div className="account-form-action-btns">
                    <ActionButton
                      disabled={stateForMethod('PUT') !== 'idle'}
                      formMethod="PUT"
                      text={
                        stateForMethod('PUT') !== 'idle'
                          ? 'Updating'
                          : 'Update address'
                      }
                      filled
                    />
                    <ActionButton
                      disabled={stateForMethod('DELETE') !== 'idle'}
                      formMethod="DELETE"
                      text={
                        stateForMethod('DELETE') !== 'idle'
                          ? 'Deleting'
                          : 'Delete'
                      }
                    />
                  </div>
                )}
              </AddressForm>
            </div>
          </Modal>
        </div>
      ))}
    </div>
  );
};

const AddressForm = ({address, defaultAddress, children}) => {
  const {state, formMethod} = useNavigation();
  const action = useActionData();
  const error = action?.error?.[address.id];
  const isDefaultAddress = defaultAddress?.id === address.id;
  return (
    <Form id={address.id}>
      <fieldset>
        <input type="hidden" name="addressId" defaultValue={address.id} />
        <LabelFloatingInput
          aria-label="First name"
          autoComplete="given-name"
          defaultValue={address?.firstName ?? ''}
          id="firstName"
          name="firstName"
          required
          type="text"
          labelText="First name"
        />
        <LabelFloatingInput
          aria-label="Last name"
          autoComplete="family-name"
          defaultValue={address?.lastName ?? ''}
          id="lastName"
          name="lastName"
          required
          type="text"
          labelText="Last name"
        />
        <LabelFloatingInput
          aria-label="Company"
          autoComplete="organization"
          defaultValue={address?.company ?? ''}
          id="company"
          name="company"
          labelText="Company"
          minLength={2}
          type="text"
        />
        <LabelFloatingInput
          aria-label="Address line 1"
          autoComplete="address-line1"
          defaultValue={address?.address1 ?? ''}
          id="address1"
          name="address1"
          labelText="Address line 1"
          required
          type="text"
        />
        <LabelFloatingInput
          aria-label="Address line 2"
          autoComplete="address-line2"
          defaultValue={address?.address2 ?? ''}
          id="address2"
          name="address2"
          labelText="Address line 2"
          type="text"
        />
        <LabelFloatingInput
          aria-label="City"
          autoComplete="address-level2"
          defaultValue={address?.city ?? ''}
          id="city"
          name="city"
          labelText="City"
          required
          type="text"
        />
        <LabelFloatingInput
          aria-label="State"
          autoComplete="address-level1"
          defaultValue={address?.province ?? ''}
          id="province"
          name="province"
          labelText="State / Province"
          required
          type="text"
        />
        <LabelFloatingInput
          aria-label="Zip"
          autoComplete="postal-code"
          defaultValue={address?.zip ?? ''}
          id="zip"
          name="zip"
          labelText="Zip / Postal Code"
          required
          type="text"
        />
        <LabelFloatingInput
          aria-label="Country"
          autoComplete="country-name"
          defaultValue={address?.country ?? ''}
          id="country"
          name="country"
          labelText="Country"
          required
          type="text"
        />
        <LabelFloatingInput
          aria-label="Phone"
          autoComplete="tel"
          defaultValue={address?.phone ?? ''}
          id="phone"
          name="phone"
          labelText="Phone"
          pattern="^\+?[1-9]\d{3,14}$"
          type="tel"
        />
        <div>
          <input
            defaultChecked={isDefaultAddress}
            id="defaultAddress"
            name="defaultAddress"
            type="checkbox"
          />
          <label htmlFor="defaultAddress">Set as default address</label>
        </div>
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : null}
        {children({
          stateForMethod: (method) => (formMethod === method ? state : 'idle'),
        })}
      </fieldset>
    </Form>
  );
};

export default AccountAddressesPage;
