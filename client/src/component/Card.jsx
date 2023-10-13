import React from 'react'

function Card({title,description}) {
  return (
    <div>
      <span>{title}</span>
      <span>{description}</span>
    </div>
  )
}

export default Card