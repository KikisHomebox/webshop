import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu';

// Mock for the onOptionChosen function
const mockOnOptionChosen = jest.fn();

const options = [
  {label: 'Option 1', value: 'Value 1'},
  {label: 'Option 2', value: 'Value 2'},
];

describe('DropdownMenu', () => {
  it('renders with closed menu', () => {
    const {getByText, queryByText} = render(
      <DropdownMenu
        displayText="Select an option"
        options={options}
        onOptionChosen={mockOnOptionChosen}
      />,
    );

    expect(queryByText('Value 1')).toBeInTheDocument();
    expect(queryByText('Value 2')).toBeInTheDocument();
    expect(getByText('Select an option')).toBeInTheDocument();
  });

  it('opens the menu on click', () => {
    const {getByText} = render(
      <DropdownMenu
        displayText="Select an option"
        options={options}
        onOptionChosen={mockOnOptionChosen}
      />,
    );

    const menuContainer = getByText('Select an option');
    fireEvent.click(menuContainer);

    expect(getByText('Value 1')).toBeInTheDocument();
    expect(getByText('Value 2')).toBeInTheDocument();
  });

  it('closes the menu on blur', () => {
    const {getByText, container} = render(
      <DropdownMenu
        displayText="Select an option"
        options={options}
        onOptionChosen={mockOnOptionChosen}
      />,
    );

    const menuContainer = getByText('Select an option');
    fireEvent.click(menuContainer);

    const menuOptions = container.querySelector('.menu-options');

    // Menu is open
    expect(menuOptions).toHaveClass('show');

    // Blur the menu
    fireEvent.blur(menuContainer);

    // Menu is closed
    expect(menuOptions).not.toHaveClass('show');
  });

  it('calls onOptionChosen when an option is clicked', () => {
    const {getByText} = render(
      <DropdownMenu
        displayText="Select an option"
        options={options}
        onOptionChosen={mockOnOptionChosen}
      />,
    );

    const menuContainer = getByText('Select an option');
    fireEvent.click(menuContainer);

    const option1 = getByText('Value 1');
    fireEvent.click(option1);

    expect(mockOnOptionChosen).toHaveBeenCalledWith('Option 1');
  });
});
