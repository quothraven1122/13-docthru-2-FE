const VARIANT_STYLES = {
  solid: "bg-gray-800 font-semibold text-white disabled:bg-gray-200 disabled:text-gray-500",
  outline: "border border-gray-800 bg-white font-semibold text-gray-800",
  tonal: "bg-[#ffe7e7] font-semibold text-[#f24744]",
  transparent: "bg-[#f6f8fa]/50 font-bold text-gray-700",
  filled: "border-2 border-gray-800 bg-brand-yellow font-bold text-gray-800",
  ghost: "bg-gray-50 font-bold text-gray-800",
};

const SIZE_STYLES = {
  lg: "h-[48px]",
  md: "h-[40px]",
  sm: "h-[32px]",
};

export default function Button({
  variant = "solid",
  size = "md",
  pill = false,
  iconOnly = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const rounded = pill ? "rounded-full" : size === "sm" ? "rounded-[10px]" : "rounded-[12px]";
  const textSize = variant === "filled" || size === "sm" ? "text-[14px]" : "text-[16px]";
  const width = iconOnly ? (size === "sm" ? "w-[36px]" : "w-[40px]") : size === "lg" ? "px-[20px]" : "px-[16px]";

  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-[4px] disabled:cursor-default ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${rounded} ${textSize} ${width} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
