import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterAndSort from '~/components/Catalogue/FilterAndSort';
import React from 'react';

const MOCK_AVAILABILITY = [
  {label: 'all', value: 'All'},
  {label: 'available', value: 'In stock'},
  {label: 'outOfStock', value: 'Out of stock'},
];

const MOCK_SORTABLE = [
  {label: 'featured', value: 'Featured'},
  {label: 'title-asc', value: 'Alphabetically, A - Z'},
  {label: 'title-desc', value: 'Alphabetically, Z - A'},
  {label: 'price-asc', value: 'Price, Low - High'},
  {label: 'price-desc', value: 'Price, High - Low'},
  {label: 'date-asc', value: 'Date, New - Old'},
  {label: 'date-desc', value: 'Date, Old - New'},
];

const MOCK_COLLECTIONS = [
  {label: 'collection1', value: 'Collection 1'},
  {label: 'collection2', value: 'Collection 2'},
  {label: 'collection3', value: 'Collection 3'},
  {label: 'collection4', value: 'Collection 4'},
];

const mockSetAvailabilityFilter = jest.fn();
const mockSetMinPrice = jest.fn();
const mockSetMaxPrice = jest.fn();
const mockSetSort = jest.fn();
const mockSetCollectionFilter = jest.fn();

jest.mock('@shopify/hydrogen', () => {
  const Money = jest.fn();
  return {Money};
});

describe('FilterAndSort component', () => {
  it('FilterAndSort should render fields', () => {
    render(
      <FilterAndSort
        availability={MOCK_AVAILABILITY}
        availabilityFilter="all"
        setAvailabilityFilter={mockSetAvailabilityFilter}
        minPrice={0}
        maxPrice={549.99}
        setMinPrice={mockSetMinPrice}
        setMaxPrice={mockSetMaxPrice}
        sort="featured"
        sortable={MOCK_SORTABLE}
        setSort={mockSetSort}
        totalCount={50}
        filteredCount={25}
        collections={MOCK_COLLECTIONS}
        collectionFilter=""
        setCollectionFilter={mockSetCollectionFilter}
      />,
    );
    expect(screen.getByText('Filter:')).toBeInTheDocument();
    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Collections')).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(screen.getByText('25 of 50 products')).toBeInTheDocument();
  });

  it('FilterAndSort should render options', () => {
    render(
      <FilterAndSort
        availability={MOCK_AVAILABILITY}
        availabilityFilter="all"
        setAvailabilityFilter={mockSetAvailabilityFilter}
        minPrice={0}
        maxPrice={549.99}
        setMinPrice={mockSetMinPrice}
        setMaxPrice={mockSetMaxPrice}
        sort="featured"
        sortable={MOCK_SORTABLE}
        setSort={mockSetSort}
        totalCount={50}
        filteredCount={25}
        collections={MOCK_COLLECTIONS}
        collectionFilter=""
        setCollectionFilter={mockSetCollectionFilter}
      />,
    );
    MOCK_AVAILABILITY.forEach((item) => {
      expect(screen.getByTestId(`menu-option-${item.label}`)).toHaveTextContent(
        item.value,
      );
    });
    MOCK_COLLECTIONS.forEach((item) => {
      expect(screen.getByTestId(`menu-option-${item.label}`)).toHaveTextContent(
        item.value,
      );
    });
    MOCK_SORTABLE.forEach((item) => {
      expect(screen.getByTestId(`menu-option-${item.label}`)).toHaveTextContent(
        item.value,
      );
    });
  });

  it('FilterAndSort should render availability filter item', () => {
    render(
      <FilterAndSort
        availability={MOCK_AVAILABILITY}
        availabilityFilter="available"
        setAvailabilityFilter={mockSetAvailabilityFilter}
        minPrice={0}
        maxPrice={549.99}
        setMinPrice={mockSetMinPrice}
        setMaxPrice={mockSetMaxPrice}
        sort="featured"
        sortable={MOCK_SORTABLE}
        setSort={mockSetSort}
        totalCount={50}
        filteredCount={25}
        collections={MOCK_COLLECTIONS}
        collectionFilter=""
        setCollectionFilter={mockSetCollectionFilter}
      />,
    );
    const availabilityFilterItem = screen.getByTestId(
      'filter-item-availability',
    );
    expect(availabilityFilterItem).toHaveTextContent('In stock');
    fireEvent.click(availabilityFilterItem);
    expect(mockSetAvailabilityFilter).toHaveBeenCalledWith('all');

    const removeAllButton = screen.getByText('Remove all');
    fireEvent.click(removeAllButton);
    expect(mockSetAvailabilityFilter).toHaveBeenCalledWith('all');
  });

  it('FilterAndSort should render price filter items', () => {
    render(
      <FilterAndSort
        availability={MOCK_AVAILABILITY}
        availabilityFilter="all"
        setAvailabilityFilter={mockSetAvailabilityFilter}
        minPrice={1}
        maxPrice={539.99}
        setMinPrice={mockSetMinPrice}
        setMaxPrice={mockSetMaxPrice}
        sort="featured"
        sortable={MOCK_SORTABLE}
        setSort={mockSetSort}
        totalCount={50}
        filteredCount={25}
        collections={MOCK_COLLECTIONS}
        collectionFilter=""
        setCollectionFilter={mockSetCollectionFilter}
      />,
    );
    const priceFilterItem = screen.getByTestId('filter-item-price');
    expect(priceFilterItem).toHaveTextContent(' - ');
    fireEvent.click(priceFilterItem);
    expect(mockSetMinPrice).toHaveBeenCalledWith(0);
    expect(mockSetMaxPrice).toHaveBeenCalledWith(549.99);

    const removeAllButton = screen.getByText('Remove all');
    fireEvent.click(removeAllButton);
    expect(mockSetMinPrice).toHaveBeenCalledWith(0);
    expect(mockSetMaxPrice).toHaveBeenCalledWith(549.99);
  });

  it('FilterAndSort should render collection filter item', () => {
    render(
      <FilterAndSort
        availability={MOCK_AVAILABILITY}
        availabilityFilter="all"
        setAvailabilityFilter={mockSetAvailabilityFilter}
        minPrice={0}
        maxPrice={549.99}
        setMinPrice={mockSetMinPrice}
        setMaxPrice={mockSetMaxPrice}
        sort="featured"
        sortable={MOCK_SORTABLE}
        setSort={mockSetSort}
        totalCount={50}
        filteredCount={25}
        collections={MOCK_COLLECTIONS}
        collectionFilter="collection1"
        setCollectionFilter={mockSetCollectionFilter}
      />,
    );
    const collectionFilterItem = screen.getByTestId('filter-item-collection');
    expect(collectionFilterItem).toHaveTextContent('Collection 1');
    fireEvent.click(collectionFilterItem);
    expect(mockSetCollectionFilter).toHaveBeenCalledWith('');

    const removeAllButton = screen.getByText('Remove all');
    fireEvent.click(removeAllButton);
    expect(mockSetCollectionFilter).toHaveBeenCalledWith('');
  });
});
