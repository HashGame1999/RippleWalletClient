import { inputColor, labelStyle } from "../../Const"

const XTextInput = ({ currency, label, placeholder, value, onChange, disabled = false, onClick }) => {
  return (
    <div className="justify-center flex flex-col">
      <label className={labelStyle}>
        {label}
      </label>
      <div className="justify-center flex flex-row items-center">
        <input type="number"
          id={label}
          name={label}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-80 p-2 border rounded shadow-xl appearance-none ${disabled ? 'hover:bg-gray-300' : 'border-green-500 hover:border-green-500 hover:bg-green-300'} ${inputColor}`}
        />
        <div className="px-4 py-2 border rounded bg-gray-500" onClick={onClick}>
          {currency}
        </div>
      </div>
    </div>
  )
}

export default XTextInput