import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Layout} from '../../../components/Layout/Layout';

jest.mock('../../../components/Cart/Cart', () => {
  return {
    __esModule: true,
    CartMain: jest.fn(() => <p>Mocked MainCart</p>),
  };
});

jest.mock('../../../components/Footer/Footer', () => {
  return {
    __esModule: true,
    Footer: jest.fn(() => <p>Mocked Main Cart</p>),
  };
});

jest.mock('../../../components/Header/Header', () => {
  return {
    __esModule: true,
    Header: jest.fn(() => <p>Mocked Main Cart</p>),
  };
});

jest.mock('../../../components/Header/HeaderMenu', () => {
  return {
    __esModule: true,
    HeaderMenu: jest.fn(() => <p>Mocked HeaderMenu</p>),
  };
});

jest.mock('../../../components/Search/Search', () => {
  return {
    __esModule: true,
    PredictiveSearchForm: jest.fn(() => <p>Mocked PredictiveSearchForm</p>),
    PredictiveSearchResults: jest.fn(() => (
      <p>Mocked PredictiveSearchResults</p>
    )),
  };
});

describe('Layout component', () => {
  it('renders Layout with all components', () => {
    const header = {header: 'header'};
    const footer = {menu: 'footer'};
    render(<Layout header={header} footer={footer} />);

    const mains = screen.getAllByText('Mocked Main Cart');
    // Assert that the components are rendered
    expect(mains).toHaveLength(2);
    expect(screen.getByText('SEARCH')).toBeInTheDocument();
  });
});
