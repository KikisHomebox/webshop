import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import StaticPage from '~/components/StaticPage/StaticPage';

describe('Static Page component', () => {
  it('renders Static Page with all components', () => {
    const page = {title: 'Static Page Title', body: null};
    render(<StaticPage page={page} />);

    expect(screen.getByText('Static Page Title')).toBeInTheDocument();
  });

  it('renders contact us page when handle is contact', () => {
    const page = {title: 'Contact us title', body: null, handle: 'contact'};
    render(<StaticPage page={page} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
  });

  it('does not render contact us when handle is not contact', () => {
    const page = {
      title: 'Not Contact Us',
      body: 'Hello World',
      handle: 'not-contact',
    };
    render(<StaticPage page={page} />);

    expect(screen.getByText('Not Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
