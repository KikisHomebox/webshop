import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import StaticPage from '~/components/StaticPage/StaticPage';

describe('Static Page component', () => {
  it('renders Static Page with all components', () => {
    const page = {title: 'Static Page Title', body: null};
    render(<StaticPage page={page} />);

    expect(screen.getByText('Static Page Title')).toBeInTheDocument();
  });
});
