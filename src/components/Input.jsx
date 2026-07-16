import cn from "@/utils/cn";

export default function Input({ suffix, errorMessage, className, ...inputProps }) {
  return (
    <div>
      <div
        className={cn(
          "px-[20px] py-[15px] rounded-[12px] flex border",
          errorMessage ? "border-error" : "border-gray-200",
        )}
      >
        <input {...inputProps} className={cn("flex-1 outline-none text-gray-900 text-[16px]", className)}></input>
        {suffix}
      </div>
      {errorMessage && <p className="text-error text-[12px] mt-[8px]">{errorMessage}</p>}
    </div>
  );
}
