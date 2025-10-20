import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import './JokeList.css';
import Joke from './Joke';
import { Joke as JokeType, JokeApiResponse } from './types';

interface JokeListProps {
  numJokesToGet?: number;
}

const JokeList: React.FC<JokeListProps> = ({ numJokesToGet = 10 }) => {
  const [jokes, setJokes] = useState<JokeType[]>(() => {
    const savedJokes = window.localStorage.getItem('jokes');
    return savedJokes ? JSON.parse(savedJokes) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seenJokesRef = useRef<Set<string>>(new Set(jokes.map(j => j.text)));

  // Save jokes to localStorage whenever they change
  useEffect(() => {
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes]);

  // Fetch jokes on initial load if none exist
  useEffect(() => {
    if (jokes.length === 0) {
      getJokes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJokes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newJokes: JokeType[] = [];

      while (newJokes.length < numJokesToGet) {
        const res = await axios.get<JokeApiResponse>('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json'
          }
        });

        const newJokeText = res.data.joke;

        if (!seenJokesRef.current.has(newJokeText)) {
          const newJoke: JokeType = {
            id: uuid(),
            text: newJokeText,
            votes: 0
          };
          newJokes.push(newJoke);
          seenJokesRef.current.add(newJokeText);
        }
      }

      setJokes(prevJokes => [...prevJokes, ...newJokes]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jokes';
      setError(errorMessage);
      console.error('Error fetching jokes:', err);
    } finally {
      setLoading(false);
    }
  }, [numJokesToGet]);

  const handleVote = useCallback((id: string, delta: number) => {
    setJokes(prevJokes =>
      prevJokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    );
  }, []);

  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (loading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="JokeList-error">
        <h1 className="JokeList-title">Oops!</h1>
        <p className="JokeList-error-message">{error}</p>
        <button className="JokeList-getmore" onClick={getJokes}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>
        <img
          src="https://img.icons8.com/dusk/64/000000/lol.png"
          alt="Laughing emoji icon"
        />
        <button className="JokeList-getmore" onClick={getJokes}>
          Fetch Jokes
        </button>
      </div>
      <div className="JokeList-jokes">
        {sortedJokes.map((joke) => (
          <Joke
            key={joke.id}
            votes={joke.votes}
            text={joke.text}
            upvote={() => handleVote(joke.id, 1)}
            downvote={() => handleVote(joke.id, -1)}
          />
        ))}
      </div>
    </div>
  );
};

export default JokeList;
