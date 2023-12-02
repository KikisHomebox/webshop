import FooterMenu from './FooterMenu';
import FooterBottom from './FooterBottom';

import './Footer.css';

const Footer = ({menu, shop}) => {
  return (
    <footer className="footer">
      <FooterMenu menu={menu} />
      <FooterBottom shop={shop} />
    </footer>
  );
};

export default Footer;
