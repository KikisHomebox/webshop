import {IoIosClose} from 'react-icons/io';
import './Modal.css';

const Modal = ({open, onClose, children}) => {
  return (
    <div className={`modal ${open ? 'modal--open' : ''}`}>
      <div className="modal-background" onClick={onClose} />
      <div className="modal-content">
        <IoIosClose className="modal-close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
