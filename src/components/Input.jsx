export default function Input({ suffix, errorMessage, className, ...inputProps }) {
  return (
    <div>
      <div
        className={`px-[20px] py-[15px] rounded-[12px] flex border-1 border-gray-200 ${errorMessage && "border border-error"}`}
      >
        <input {...inputProps} className={`${className} flex-1 outline-none text-gray-900 text-[16px] bg`}></input>
        {suffix}
      </div>
      {errorMessage && <p className="text-error text-[12px] mt-[8px]">{errorMessage}</p>}
    </div>
  );
}
