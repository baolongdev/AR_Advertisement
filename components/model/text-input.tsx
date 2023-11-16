import React from 'react'

export default function TextInput({title, value, onValueChange }) {
    return (
        <div className="">
            <h4 className="input__left-addon">
                {title}
            </h4>
            <input
                type="text"
                className="input w-input"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
        </div>
    )
}
