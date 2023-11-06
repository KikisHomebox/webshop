import ProductCard from '../ProductCard/ProductCard';
import './Catalogue.css';
import Pagination from '../Pagination/Pagination';
import FilterAndSort from './FilterAndSort';
import {useMemo, useState} from 'react';

const PRODUCT_PER_PAGE = 16;
const MAX_PRICE = 549.99;

const Availability = [
  {label: 'all', value: 'All'},
  {label: 'available', value: 'In stock'},
  {label: 'outOfStock', value: 'Out of stock'},
];

const Sortable = [
  {label: 'featured', value: 'Featured'},
  {label: 'title-asc', value: 'Alphabetically, A - Z'},
  {label: 'title-desc', value: 'Alphabetically, Z - A'},
  {label: 'price-asc', value: 'Price, Low - High'},
  {label: 'price-desc', value: 'Price, High - Low'},
  {label: 'date-asc', value: 'Date, New - Old'},
  {label: 'date-desc', value: 'Date, Old - New'},
];

const Catalogue = ({products}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sort, setSort] = useState('featured');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const processedData = useMemo(() => {
    const filteredData = products.nodes
      .filter(
        (product) =>
          availabilityFilter === 'all' ||
          (availabilityFilter === 'available' && product.availableForSale) ||
          (availabilityFilter === 'outOfStock' && !product.availableForSale),
      )
      .filter((product) =>
        product.variants.nodes.some(
          (variant) =>
            variant.price.amount < maxPrice && variant.price.amount > minPrice,
        ),
      );

    if (sort === 'featured') {
      return filteredData;
    }

    switch (sort) {
      case 'title-asc':
        return [...filteredData].sort((a, b) => (a.title < b.title ? -1 : 1));
      case 'title-desc':
        return [...filteredData].sort((a, b) => (a.title > b.title ? -1 : 1));
      case 'price-asc':
        return [...filteredData].sort(
          (a, b) =>
            a.priceRange.minVariantPrice.amount -
            b.priceRange.minVariantPrice.amount,
        );
      case 'price-desc':
        return [...filteredData].sort(
          (a, b) =>
            b.priceRange.minVariantPrice.amount -
            a.priceRange.minVariantPrice.amount,
        );
      case 'date-asc':
        return [...filteredData].sort((a, b) =>
          a.createdAt < b.createdAt ? -1 : 1,
        );
      case 'date-desc':
        return [...filteredData].sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1,
        );
      default:
        return filteredData;
    }
  }, [availabilityFilter, minPrice, maxPrice, sort]);

  const currentData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * PRODUCT_PER_PAGE;
    const lastPageIdx = firstPageIdx + PRODUCT_PER_PAGE;
    return processedData.slice(firstPageIdx, lastPageIdx);
  }, [currentPage, processedData]);

  return (
    <div className="catalogue">
      <FilterAndSort
        availability={Availability}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        sortable={Sortable}
        setSort={setSort}
        totalCount={products.nodes.length}
        filteredCount={processedData.length}
      />
      <div className="catalogue-product-container">
        {currentData.map((product) => (
          <ProductCard key={`card-${product.id}`} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={processedData.length}
        pageSize={PRODUCT_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Catalogue;
