import './FilterAndSort.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import {useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {Money} from '@shopify/hydrogen-react';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineClose} from 'react-icons/ai';

const FilterAndSort = ({
  availability,
  availabilityFilter,
  setAvailabilityFilter,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  sort,
  sortable,
  setSort,
  totalCount,
  filteredCount,
}) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const resetAllFilters = () => {
    setAvailabilityFilter('all');
    setMinPrice(0);
    setMaxPrice(549.99);
  };

  return (
    <div className="sort-filter-container">
      <div className="catalogue-sort-filter">
        <div className="catalogue-filter-container">
          <span>Filter: </span>
          <DropdownMenu
            displayText={`Availability`}
            options={availability}
            onOptionChosen={setAvailabilityFilter}
          />
          <div className="price-container">
            <div
              className="price-title"
              onClick={() => setIsPriceOpen((prev) => !prev)}
            >
              <span className="menu-display-title">Price</span>
              {isPriceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            <div className={`price-content${isPriceOpen ? ' show' : ''}`}>
              <div className="price-header">
                <span>
                  The highest price is{' '}
                  <Money
                    data={{amount: '549.99', currencyCode: 'EUR'}}
                    as="span"
                  />
                </span>
                <span
                  className="price-reset"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(549.99);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="price-separator"></div>
              <div className="price-input-container">
                <div className="price-input">
                  <span>From EUR</span>
                  <div className="price-input-buttons">
                    <button
                      onClick={() => {
                        setMinPrice((prev) => prev - 1);
                      }}
                      disabled={minPrice === 0}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(
                          Math.min(Math.max(e.target.value, 0), maxPrice - 1),
                        );
                      }}
                    />
                    <button
                      onClick={() => {
                        setMinPrice((prev) => prev + 1);
                      }}
                      disabled={minPrice === maxPrice - 1}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="price-input">
                  <span>To EUR</span>
                  <div className="price-input-buttons">
                    <button
                      onClick={() => {
                        setMaxPrice((prev) => prev - 1);
                      }}
                      disabled={maxPrice === minPrice + 1}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          Math.max(
                            Math.min(e.target.value, 549.99),
                            minPrice + 1,
                          ),
                        )
                      }
                    />
                    <button
                      onClick={() => {
                        setMaxPrice((prev) => prev + 1);
                      }}
                      disabled={maxPrice === 549.99}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="catalogue-sort-container">
          <span>Sort by: </span>
          <DropdownMenu
            displayText={sortable.find((item) => item.label === sort).value}
            options={sortable}
            onOptionChosen={setSort}
          />
          <span className="product-count">
            {totalCount === filteredCount
              ? `${totalCount} products`
              : `${filteredCount} of ${totalCount} products`}
          </span>
        </div>
      </div>
      {(availabilityFilter !== 'all' ||
        minPrice !== 0 ||
        maxPrice !== 549.99) && (
        <div className="filter-items">
          {availabilityFilter !== 'all' && (
            <span
              className="filter-item"
              onClick={() => setAvailabilityFilter('all')}
            >
              {
                availability.find((item) => item.label === availabilityFilter)
                  .value
              }
              <AiOutlineClose />
            </span>
          )}
          {(minPrice !== 0 || maxPrice !== 549.99) && (
            <span
              className="filter-item"
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(549.99);
              }}
            >
              <Money
                data={{amount: `${minPrice}`, currencyCode: 'EUR'}}
                as="span"
              />{' '}
              -{' '}
              <Money
                data={{amount: `${maxPrice}`, currencyCode: 'EUR'}}
                as="span"
              />
              <AiOutlineClose />
            </span>
          )}
          <span className="filter-reset" onClick={resetAllFilters}>
            Remove all
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterAndSort;
