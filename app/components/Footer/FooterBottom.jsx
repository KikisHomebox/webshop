import {Link} from '@remix-run/react';

import FooterPaymentOptions from './FooterPaymentOptions';

const FooterBottom = ({shop}) => {
  const {name, paymentSettings} = shop;
  const {privacyPolicy, shippingPolicy, termsOfService, refundPolicy} = shop;
  const policies = [
    privacyPolicy,
    shippingPolicy,
    termsOfService,
    refundPolicy,
  ];
  return (
    <div className="footer-bottom">
      <FooterPaymentOptions paymentOptions={paymentSettings} />
      <div className="footer-bottom-content">
        <Link key="page-name" prefetch="intent" preventScrollReset to="/">
          {name}
        </Link>
        <a
          href="https://www.shopify.com/?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore"
          target="_blank"
          rel="noreferrer"
        >
          Power By shopify
        </a>
        {policies.map((policy, index) => (
          <Link
            className="footer-bottom-content-policy"
            to={`/policies/${policy?.handle}`}
            key={`footer-${policy?.handle || ''}-${index}`}
          >
            {policy?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterBottom;
