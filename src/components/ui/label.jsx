import * as React from "react"

const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  const baseClasses = "text-sm font-medium leading-none"

  return (
    <label
      className={`${baseClasses} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Label.displayName = "Label"

export { Label }