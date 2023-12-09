import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import PoliciesMainPage from '~/components/Policies/PoliciesMainPage';

const MOCKED_POLICIES = [
  {
    id: 'mocked-policy-1',
    title: 'Policy 1',
    handle: 'policy-1',
  },
];

jest.mock('@remix-run/react', () => {
  const Link = jest.fn(({children}) => <a href="/test">{children}</a>);
  return {
    Link,
  };
});

describe('Policies Main Page', () => {
  it('renders Policies Main Page with all components', () => {
    render(<PoliciesMainPage policies={MOCKED_POLICIES} />);

    expect(screen.getByText('Policies')).toBeInTheDocument();
  });
});
