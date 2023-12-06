import {useNavigate} from '@remix-run/react';
import ActionButton from '../ActionButton/ActionButton';

const MainPageHero = ({image}) => {
  const navigate = useNavigate();
  return (
    <div className="mainpage-hero">
      <img src={image} className="mainPage-image" alt="Header" />
      <div className="mainpage-hero-content">
        <h1>Home essentials</h1>
        <h2>Everything you need in one box</h2>
        <ActionButton
          text="Our Kit"
          onClick={() => navigate(`/products`)}
          customClassName={['mainpage-hero-button']}
          type={null}
          filled
        />
      </div>
    </div>
  );
};

export default MainPageHero;
