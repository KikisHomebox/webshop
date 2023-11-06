import './ActionButton.css';

const ActionButton = ({
  analytics,
  text,
  onClick,
  fetcher,
  filled,
  type = 'submit',
  disabled = false,
  customClassName = [],
  ...rest
}) => {
  return (
    <div
      className={`action-button ${customClassName.join(' ')}${
        filled ? ' action-button--filled' : ''
      }`}
      {...rest}
    >
      <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
      <button
        type={type}
        onClick={onClick}
        disabled={disabled ?? fetcher.state !== 'idle'}
      >
        {text}
      </button>
    </div>
  );
};

export default ActionButton;
