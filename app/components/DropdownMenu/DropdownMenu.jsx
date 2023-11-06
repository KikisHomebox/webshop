import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {useState} from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({
  displayText,
  options,
  onOptionChosen,
  customClassName = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option) => {
    onOptionChosen(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`menu-container ${customClassName.join(' ')}`}
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className="menu-display-title">{displayText}</span>
      {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      <div className={`menu-options${isOpen ? ' show' : ''}`}>
        {options.map((item) => (
          <div
            className="menu-option"
            key={`menu-item-${item.label}`}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(item.label);
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
