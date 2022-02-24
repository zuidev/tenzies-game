import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid"
import Confetti from "react-confetti";
import Footer from "./components/Footer";

function App() {
  const [dices, setDices] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const isWin = dices.every((currentValue) => currentValue.isHeld && currentValue.value === dices[0].value)
    if (isWin) {
      setTenzies(true)
      console.log("you win")
    }
  }, [dices])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 9),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let diceArr = []
    for (let i = 0; i < 10; i++) {
      let newDice = generateNewDice()
      diceArr.push(newDice)
    }
    return diceArr
  }

  function rollDice() {
    if (!tenzies) {
      setDices(preDices => preDices.map(dice => {
        return dice.isHeld === true
          ? dice
          : generateNewDice()
      }))
    } else {
      // new game
      setTenzies(false)
      setDices(allNewDice())
    }
   
  }

  function holdDice(id) {
    setDices(preDices => preDices.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }

  const diceElements = dices.map(dice => (
    <Die 
      key={dice.id} 
      value={dice.value} 
      isHeld={dice.isHeld} 
      holdDice={() => holdDice(dice.id)}
    />
  ))

  return (
    <main className="wrap-content">
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="container">
        <h1 className="title">Tenzies game</h1>
        <p className="instructions">Chọn để giữ số lại, Roll và chọn cho tới khi 10 số giống nhau thì bạn sẽ chiến thắng!</p>
        <div className="die-container">
          {diceElements}
        </div>
        <button 
          className="roll-btn"
          onClick={rollDice}
        >
          {tenzies ? "New game" : "Roll"}
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default App;
