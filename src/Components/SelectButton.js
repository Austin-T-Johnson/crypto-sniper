import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {
    return (
        <span
            className="select-btn"
            onClick={onClick}
            style={{
                backgroundColor: selected ? "gold" : "",
                color: selected ? "black" : "",
            }}
        >{children}</span>
    )
}

export default SelectButton