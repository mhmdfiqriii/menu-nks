function InputField({ placeholder, value, onChange, refInput }) {
  return (
    <input
      ref={refInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 focus:border-black outline-none p-3 rounded-xl text-sm"
    />
  )
}

export default InputField