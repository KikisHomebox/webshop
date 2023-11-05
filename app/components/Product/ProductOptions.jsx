import {Link} from '@remix-run/react';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {useState} from 'react';

const ProductOptions = ({option}) => {
  const {value, isAvailable} = option?.values[0] || {
    value: '',
    isAvailable: true,
  };
  const [selected, setSelected] = useState(
    `${value}${!isAvailable ? ' - Unvailable' : ''}`,
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-dropdown">
        <div className="product-options-main" onClick={() => setOpen(!open)}>
          <span className={`product-options-main--title`}>{selected}</span>
          {open ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        <div
          className={`product-options-items ${
            open ? 'product-options-items--open' : ''
          }`}
        >
          {option.values.map(({value, isAvailable, isActive, to}) => {
            const displayValue = `${value}${
              !isAvailable ? ' - Unvailable' : ''
            }`;
            return (
              <Link
                className={`
                  product-options-item ${
                    selected === displayValue
                      ? 'product-options-item--selected'
                      : ''
                  }`}
                key={option.name + value}
                prefetch="intent"
                preventScrollReset
                replace
                to={to}
                onClick={() =>
                  setSelected(`${value}${!isAvailable ? ' - Unvailable' : ''}`)
                }
              >
                {displayValue}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
