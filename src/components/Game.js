import React, { useState } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

const FIELDS = [
  'The',
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  'the',
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  '.',
];


const Game = () => {
  const exampleFormat = FIELDS.map((field) => {
    if (field.key) {
      return field.placeholder;
    } else {
      return field;
    }
  }).join(' ');

  const [playerNum, setPlayerNum] = useState(1);
  const [poemLines, setPoemLines] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const addLine = (line) => {
    const newPoemLines = [...poemLines];
    
    const structuredLine = FIELDS.map((field) => {
      if (field.key) {
        return line[field.key]
      } else {
        return field
      }
    }).join(' ')

    newPoemLines.push(structuredLine);
    setPoemLines(newPoemLines);
    setPlayerNum(playerNum + 1);
  };

  const submitPoem = () => {
    setSubmitted(true);
  };

  return (
    <div className="Game">
      <h2>Game</h2>
      <p>
        Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.
      </p>
      <p>Please follow the following format for your poetry submission:</p>
      <p className="Game__format-example">
        { exampleFormat }
      </p>
      { submitted 
        ? null
        : poemLines.length > 0
        ? [<RecentSubmission key={ poemLines.length } submission={ poemLines[poemLines.length - 1] } />,
          <PlayerSubmissionForm key={ playerNum } index={ playerNum } sendSubmission={ addLine } fields={ FIELDS } />]
        : <PlayerSubmissionForm index={ playerNum } sendSubmission={ addLine } fields={ FIELDS } />
      }
      <FinalPoem isSubmitted={ submitted } submissions={ poemLines } revealPoem={ submitPoem } />
    </div>
  );
}


export default Game;
