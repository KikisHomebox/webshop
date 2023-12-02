import {BsFacebook, BsInstagram, BsTiktok} from 'react-icons/bs';

const SOCIAL_MEDIA_MAPPING = {
  FACEBOOK: {
    url: 'https://www.facebook.com/profile.php?id=100092302575694',
    icon: <BsFacebook />,
  },
  INSTAGRAM: {
    url: 'https://www.instagram.com/kikishomebox/',
    icon: <BsInstagram />,
  },
  TIKTOK: {
    url: 'https://www.tiktok.com/@kikishomebox?_t=8cmOD6ynw67&_r=1',
    icon: <BsTiktok />,
  },
};

const FooterSocial = () => {
  return (
    <div className="footer-social">
      {Object.keys(SOCIAL_MEDIA_MAPPING).map((key) => (
        <a
          key={SOCIAL_MEDIA_MAPPING[key]}
          href={SOCIAL_MEDIA_MAPPING[key].url}
          target="_blank"
          rel="noreferrer"
        >
          {SOCIAL_MEDIA_MAPPING[key].icon}
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;
