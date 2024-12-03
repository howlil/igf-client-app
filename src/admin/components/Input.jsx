export default function Input({label, id, name, type, placeholder, onChange}) {
  return (
    <div>
      <label htmlFor="price" className="block text-sm/6 font-semibold text-black">
        {label}
      </label>
      <div className="mt-2 rounded-md">
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-red">
          <input
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  )
}
