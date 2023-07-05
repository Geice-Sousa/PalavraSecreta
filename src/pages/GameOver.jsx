import React from 'react';
import '../styles/GameOver.css';
import Button from '../componentes/Button';

const GameOver = ({retry, score}) => {
  return (
  <div className='game-over'>
    <h3 className='fim-title'>Fim de Jogo!</h3>

    <p className='scoreP'>Você fez {score} pontos.</p>

    <Button onClick={retry}>Jogar novamente</Button>
  </div>

  )
};

export default GameOver;
