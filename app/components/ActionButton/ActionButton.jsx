import './ActionButton.css';

const ActionButton = ({
  analytics,
  text,
  disabled,
  onClick,
  fetcher,
  filled,
  ...rest
}) => {
  return (
    <div className={`action-button ${filled ? 'action-button--filled' : ''}`}>
      <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
      <button
        type="submit"
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
