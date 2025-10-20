export interface Joke {
  id: string;
  text: string;
  votes: number;
}

export interface JokeApiResponse {
  id: string;
  joke: string;
  status: number;
}
