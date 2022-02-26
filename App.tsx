import { useState } from 'react';
import Game from './components/Game'
import Score from './components/Score'

export default function App() {
  // state
  const [counter, setCounter] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(30);

  if (playing) {
    return (
      <Game setPlaying={setPlaying} counter={counter} setCounter={setCounter} delay={delay}/>
    );
  } else {
    return (
      <Score delay={delay} counter={counter} setCounter={setCounter}
       setPlaying={setPlaying} setDelay={setDelay}/>
    );
  }
}