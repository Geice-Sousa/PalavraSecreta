import React from 'react';
import { useState, useRef } from 'react';
import '../styles/Game.css';
import Button from '../componentes/Button';

const Game = ({
  verifyLetter, 
  pickedCategory, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses, 
  score, 
  logout
}) => {
  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  const handleSubmit = (e)=>{
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus();
  };

  return (
  <>
    <section className='game'>
      <p className='dica'><span className='dica-game'>Dica:
        </span> é uma palavra que tem relação com: "{pickedCategory.toUpperCase()}"</p>

      <p className='tentativas'>Número de tentativas: <span>{guesses}</span></p>

      <div className='wordContainer'>
        {letters.map((letter, i)=>(
          guessedLetters.includes(letter) ?
          (<span className='letter' key={i}> {letter} </span>)
          :(<span className='blankSquare' key={i}></span>)
        ))}
      </div>

      <div className='letterContainer'>
        <p>Digite seu palpite: </p>

        <form >
          <input 
            type="text" 
            name="letter" 
            id='letter' 
            maxLength='1' 
            required 
            onChange={(e)=> setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <Button onClick={handleSubmit} >Verificar</Button>
        </form>
      </div>
    
      <div className="wrongLetterContainer">
        <p>Letras erradas: {wrongLetters.map((letter, i)=> <span key={i}>{letter}, </span>
        )}</p>
      </div>
      <p className='pontos'>Pontuação: {score}</p>
    </section>
    
    <div className='button'>
      <Button onClick={logout}>Encerrar jogo</Button>
    </div>
  </>
  )
}

export default Game;