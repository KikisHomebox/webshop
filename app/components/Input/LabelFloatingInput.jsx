import './LabelFloatingInput.css';

const LabelFloatingInput = ({
  labelText,
  id,
  name,
  type,
  required,
  autoComplete,
  ...rest
}) => {
  return (
    <div className="input-floating">
      <input
        className="input-field"
        id={id}
        name={name}
        type={type}
        placeholder=""
        required={required}
        autoComplete={autoComplete}
        {...rest}
      />
      <label className="input-label" htmlFor={name}>
        {labelText}
      </label>
    </div>
  );
};

export default LabelFloatingInput;
