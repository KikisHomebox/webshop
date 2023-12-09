import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '~/components/Footer/Footer';

jest.mock('../../../components/Footer/FooterMenu', () =>
  jest.fn(() => <p>Mocked Footer Menu</p>),
);

jest.mock('../../../components/Footer/FooterBottom', () =>
  jest.fn(() => <p>Mocked Footer Bottom</p>),
);

describe('Footer component', () => {
  it('renders Layout with all components', () => {
    const footer = {menu: 'menu', shop: 'shop'};
    render(<Footer menu={footer.menu} shop={footer.shop} />);

    expect(screen.getByText('Mocked Footer Menu')).toBeInTheDocument();
  });
});
