import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterBottom from '~/components/Footer/FooterBottom';

jest.mock('@remix-run/react', () => {
  const Link = jest.fn(({children}) => <a href="/test">{children}</a>);
  return {
    Link,
  };
});

describe('Footer Bottom component', () => {
  it('renders Footer Bottom with all components', () => {
    const shop = {name: 'name', paymentSettings: []};
    render(<FooterBottom shop={shop} />);

    expect(screen.getByText('Power By shopify')).toBeInTheDocument();
  });
});
