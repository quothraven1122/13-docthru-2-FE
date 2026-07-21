import Input from "@/components/Input";

export default function AuthField({ id, label, ...inputProps }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
