import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Policies from '~/components/Policies/Policies';

const MOCKED_POLICY = {
  id: 'mocked-policy-1',
  title: 'Policy 1',
  handle: 'policy-1',
};

jest.mock('@remix-run/react', () => {
  const Link = jest.fn(({children}) => <a href="/test">{children}</a>);
  return {
    Link,
  };
});

describe('Policies Page', () => {
  it('renders Policies with all components', () => {
    render(<Policies policy={MOCKED_POLICY} />);

    expect(screen.getByText('Policy 1')).toBeInTheDocument();
  });
});
