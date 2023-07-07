import { useState, useCallback, useEffect } from 'react';
import { dataWords } from './data/data';
import StartScreen from './pages/StartScreen';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import './App.css';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

const guessesQtd = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(dataWords);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  const picWordsAndCategory = useCallback(()=>{
    //pega as categorias
    const categories = Object.keys(words); //chaves/atributo do obj
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // pega o numero arredondado para baixo de acordo com o tamanho da categoria

    //pega as palavras
    const word = words[category][Math.floor(Math.random() * words[category].length)] //acessa no objeto numa determinada posição e nesse array a posição aleatoria de acordo com o tamanho do array
    return { category, word };
  }, [words])

  const startGame = useCallback(()=>{ 

    clearLetterStates(); // limpa as letras qndo a palavra é acertada

    const { word, category } = picWordsAndCategory();

    const wordLetters = word.split(''); // tranforma as palavras em letras

    const lettersOfWord = wordLetters.map((letter)=> letter.toLowerCase()); // tranforma em letras minúsculas

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(lettersOfWord);

    setGameStage(stages[1].name);
    console.log(lettersOfWord)
  }, [picWordsAndCategory]);
  
  const verifyLetter = (letter)=> {
    const normalizedLetter = letter.toLowerCase();

    // verifica se as letras advinhadas já foram utilizadas
    if(guessedLetters.includes(normalizedLetter)
      || wrongLetters.includes(normalizedLetter)){
        return;
      }
    // verifica se as letras estão certas ou erradas
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters, letter
      ]); // pega as letras atuais e a letra nova //normalizedLetter
    }
    else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters, normalizedLetter
      ]);

      setGuesses((actualGuesses)=> actualGuesses -1); // diminui as chances
    }
  };

  // encerrar o jogo e volta para o inicio
  const logout = () =>{
    setGameStage(stages[0].name);
  }

  //  reinicia o jogo
  const retry = ()=> {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[1].name);
  };

  const clearLetterStates = ()=>{
    // retorna aos estagios iniciais de 1º jogo
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // quando as tentativas terminam
  useEffect(()=>{
    if(guesses === 0){
      // reseta os estados utilizados, o número de tentativas volta ao inicio
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  },[guesses]);

  // quando a pessoa acerta a palavra
  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]; // new Set retornar um array sem elementos repetidos

    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name
      // ou && guessedLetters.length > 1
    ){
      // adc pontuação
      setScore((actualScore)=> actualScore += 100);
      
      // reinicia o jogo
      setTimeout(()=> { 
        startGame();
      }, 1500) 
    
    }
  },[guessedLetters, letters, startGame, gameStage]);// passa no array o que precisa ser monitorado, tudo que é chamado dentro do escopo da função

  return (
  <>
    <Header />
    <main>
      {gameStage === 'start' && 
        <StartScreen startGame={startGame} />}

      {gameStage === 'game' && (<Game 
        verifyLetter={verifyLetter} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        logout={logout}
      />
      )}

      {gameStage === 'end' && <GameOver 
        retry={retry}
        score={score}  
      />}
    </main>
    <Footer />
  </>
)
};

export default App;
