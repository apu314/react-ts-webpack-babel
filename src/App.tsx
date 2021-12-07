import React from 'react'
import Button from './components/Button';

const App: React.FC = () => {

  const handleClick = () => {
    console.log('clicked');
  }

  return (
    <div className="wrapper">
      <h1>Testing</h1>
      <Button
        type="button"
        onClick={ handleClick }
      >Submit</Button>
    </div>
  )
}

export default App;