import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    placeholder = '',
    className = '',
    ...props
}, ref) {

    const id = useId()

    return (
        <div className='flex flex-col'>
            {label && <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">{label}</label>}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                ref={ref}
                className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                {...props}
            />
        </div>
    )

})

export default Input