function InputField({
  placeholder,
  value,
  onChange,
  refInput,
  type = "text"
}) {
  return (
    <input
      type={type}
      ref={refInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        input
        text-sm
        text-gray-800
        placeholder:text-gray-400
      "
    />
  )
}

export default InputField