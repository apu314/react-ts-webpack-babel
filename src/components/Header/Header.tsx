import React from 'react'

interface Props {
  
}

const Header = (props: Props) => {

  return (
    <div onClick={ () => { window.alert('You clicked the header') }}>
      This is a header - click me :)
    </div>
  )
}

export default Header
