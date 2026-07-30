import { forwardRef } from "react";

import cn from "@/utils/cn";

const Input = forwardRef(function Input({ suffix, errorMessage, className, ...inputProps }, ref) {
  return (
    <div>
      <div
        className={cn(
          "px-[20px] py-[15px] rounded-[12px] flex border",
          errorMessage ? "border-error" : "border-gray-200",
        )}
      >
        <input
          ref={ref}
          {...inputProps}
          className={cn("flex-1 outline-none text-gray-900 text-[16px]", className)}
        ></input>
        {suffix}
      </div>
      {errorMessage && <p className="text-error text-[12px] mt-[8px]">{errorMessage}</p>}
    </div>
  );
});

export default Input;