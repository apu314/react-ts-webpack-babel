import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  onClick: () => void,
}

const Button = (props: ButtonProps) => {
  const { children, type, onClick } = props;

  return (
    <button
      type={ type }
      onClick={ onClick }
    >
      { children }
    </button>
  )
}

export default Button
