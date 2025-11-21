import React from 'react'
import './buttons.css'

const Button = ({ text, onClick, type = "button", variant = "primary", icon = null }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      type={type}
      aria-label={text}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{text}</span>
    </button>
  )
}

export default Button