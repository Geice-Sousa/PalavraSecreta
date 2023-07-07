import React from 'react';
import Button from '../componentes/Button';
import '../styles/StartScreen.css';
import developer from '../assets/developer1.jpeg';
import dev from '../assets/developer.png';

const StartScreen = ({startGame}) => {
  return (
    <div className='start-container'>
      <p>Clique no botão para iniciar o jogo</p>

      <Button onClick={startGame}>Jogar</Button>
      
      <section className='start-screen'>
        <h3 className='dev'>Sobre a Dev</h3>
        <div className='sobre'>
          <img src={developer} alt="foto de uma mulher negra com cabo blackpower e óculos de grau preto e redondo
        " />
          <p>Front-End Developer, mãe de Akin, criou este jogo para consolidar seus conhecimentos em React.</p>
        </div>
      </section>

    </div>
  )
};

export default StartScreen;
