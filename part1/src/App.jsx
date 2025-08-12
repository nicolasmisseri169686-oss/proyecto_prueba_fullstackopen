import { useState } from "react"

const Button = (onSmash, text) => {
    <button onClick={onSmash}>
      {text}
    </button>
}


const Display = ({ counter }) => <div>{counter}</div>


const App = () => {
  const [counter,setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter-1)
  const setToZero = () => setCounter(0)

  const handleClick = () => {
    console.log('clicked')
  }


  return <div>
    <Display counter={counter}/>
    
    <button onClick={increaseByOne}>
      plus
    </button>
    <button onClick={setToZero}>
      zero
    </button>
    
  </div>

}

export default App