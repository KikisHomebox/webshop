import visa from '../../../public/PaymentCardBrand/visa-svgrepo-com.svg';
import mastercard from '../../../public/PaymentCardBrand/mastercard-svgrepo-com.svg';
import americanExpress from '../../../public/PaymentCardBrand/american-express-svgrepo-com.svg';

import applePay from '../../../public/PaymentDigitalWallet/apple-pay-svgrepo-com.svg';
import googlePay from '../../../public/PaymentDigitalWallet/google-pay-svgrepo-com.svg';

const PAYMENT_OPTIONS_MAPPING = {
  VISA: visa,
  MASTERCARD: mastercard,
  AMERICAN_EXPRESS: americanExpress,
  APPLE_PAY: applePay,
  GOOGLE_PAY: googlePay,
};

const FooterPaymentOptions = ({paymentOptions}) => {
  const {acceptedCardBrands, supportedDigitalWallets} = paymentOptions;
  const options = acceptedCardBrands?.concat(supportedDigitalWallets);

  return (
    <ul className="footer-payment-options">
      {options?.map((option) => (
        <li className="footer-payment-option" key={option}>
          <img src={PAYMENT_OPTIONS_MAPPING[option]} alt={option} />
        </li>
      ))}
    </ul>
  );
};

export default FooterPaymentOptions;
