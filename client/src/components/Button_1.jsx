/* eslint-disable react/prop-types */
import React from 'react'

const Button_1 = ({name}) => {
  return (
    <button className="text-white w-full lg:w-3/3 px-8 py-3 overflow-hidden font-medium rounded-xl border  text-xl  shadow-2xl animate-pulse bg-black my-8 hover:bg-white hover:text-black ease-in">
    <span>{name}</span>
    </button>
  )
}

export default Button_1