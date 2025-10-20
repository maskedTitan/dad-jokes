import React, { useMemo } from 'react';
import './Joke.css';

interface JokeProps {
  votes: number;
  text: string;
  upvote: () => void;
  downvote: () => void;
}

const Joke: React.FC<JokeProps> = ({ votes, text, upvote, downvote }) => {
  const getColor = useMemo(() => {
    if (votes >= 15) return '#4caf50';
    if (votes >= 12) return '#8bc34a';
    if (votes >= 9) return '#cddc39';
    if (votes >= 6) return '#ffeb3b';
    if (votes >= 3) return '#FFC107';
    if (votes >= 0) return '#ff9800';
    return '#f44336';
  }, [votes]);

  const getEmoji = useMemo(() => {
    if (votes >= 15) return { className: 'em em-rolling_on_the_floor_laughing', label: 'Rolling on the floor laughing' };
    if (votes >= 12) return { className: 'em em-laughing', label: 'Laughing' };
    if (votes >= 9) return { className: 'em em-smiley', label: 'Smiley' };
    if (votes >= 6) return { className: 'em em-slightly_smiling_face', label: 'Slightly smiling' };
    if (votes >= 3) return { className: 'em em-neutral_face', label: 'Neutral' };
    if (votes >= 0) return { className: 'em em-confused', label: 'Confused' };
    return { className: 'em em-angry', label: 'Angry' };
  }, [votes]);

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <button
          className="Joke-vote-button"
          onClick={upvote}
          aria-label="Upvote joke"
        >
          <i className="fas fa-arrow-up" />
        </button>
        <span
          className="Joke-votes"
          style={{ borderColor: getColor }}
        >
          {votes}
        </span>
        <button
          className="Joke-vote-button"
          onClick={downvote}
          aria-label="Downvote joke"
        >
          <i className="fas fa-arrow-down" />
        </button>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i
          className={getEmoji.className}
          role="img"
          aria-label={getEmoji.label}
        />
      </div>
    </div>
  );
};

export default Joke;
