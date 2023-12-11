import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import HeaderTop from '~/components/Header/HeaderTop';

describe('HeaderTop', () => {
  it('should load the header top texts', () => {
    render(<HeaderTop />);
    expect(
      screen.getByText('Free deliveries in the Pirkaanma region!'),
    ).toBeInTheDocument();
  });
});
