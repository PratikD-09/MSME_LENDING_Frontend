import * as React from "react"

const Badge = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"

  const variants = {
    default: "border-gray-200 bg-gray-100 text-gray-900",
    secondary: "border-gray-200 bg-gray-50 text-gray-700",
    destructive: "border-red-200 bg-red-100 text-red-900",
    outline: "border-gray-300 text-gray-700",
    success: "border-green-200 bg-green-100 text-green-900",
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  return (
    <div
      className={classes}
      ref={ref}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }