import { forwardRef } from "react";

import Input from "@/components/Input";

const AuthField = forwardRef(function AuthField({ id, label, ...inputProps }, ref) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <Input id={id} ref={ref} {...inputProps} />
    </div>
  );
});

export default AuthField;