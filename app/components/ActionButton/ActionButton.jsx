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
      className={`action-button${
        filled ? ' action-button--filled' : ''
      } ${customClassName.join(' ')}`}
    >
      <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
      <button
        type={type}
        onClick={onClick}
        disabled={disabled ?? fetcher.state !== 'idle'}
        {...rest}
      >
        {text}
      </button>
    </div>
  );
};

export default ActionButton;
