import { inputColor, labelStyle } from "../../Const"

const TextInput = ({ label, type = "text", placeholder, autoComplete = "on", value, onChange, onBlur, disabled = false }) => {
  return (
    <div className="justify-center flex flex-col">
      <label className={labelStyle}>
        {label}
      </label>
      <input type={type}
        id={`${label + Math.random()}`}
        name={label}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-96 p-2 border rounded shadow-xl appearance-none ${disabled ? 'hover:bg-gray-300' : 'border-green-500 hover:border-green-500 hover:bg-green-300'} ${inputColor}`}
      />
    </div>
  )
}

export default TextInput