import { inputColor, labelStyle } from "../../Const"

const TextareaInput = ({ label, placeholder, value, onChange, disabled = false }) => {
  return (
    <div className="justify-center flex flex-col">
      <label className={labelStyle}>
        {label}
      </label>
      <textarea
        id={label}
        name={label}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`w-96 min-h-[100px] resize-y p-2 border rounded shadow-xl appearance-none hover:border-green-500 hover:bg-green-300 ${inputColor}`}
      />
    </div>
  )
}

export default TextareaInput