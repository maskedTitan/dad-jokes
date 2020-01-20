import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.css';
import Joke from './Joke';

export default class Jokes extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};
	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
			loading: false
		};
		this.seenJokes = new Set(this.state.jokes.map((joke) => joke.text));
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}
	}
	async getJokes() {
		try {
			let jokes = [];
			while (jokes.length < this.props.numJokesToGet) {
				let res = await axios.get('https://icanhazdadjoke.com/', {
					headers: {
						Accept: 'application/json'
					}
				});
				let newJoke = res.data.joke;
				if (!this.seenJokes.has(newJoke)) {
					jokes.push({ id: uuid(), text: newJoke, votes: 0 });
				} else {
					console.log('duplicate');
					console.log(newJoke);
				}
			}
			console.log(jokes);
			this.setState(
				(st) => ({
					jokes: [ ...st.jokes, ...jokes ],
					loading: false
				}),
				() => {
					window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
				}
			);
		} catch (e) {
			alert(e);
			this.setState({
				loading: false
			});
		}
	}
	handleVote(id, delta) {
		this.setState(
			(st) => ({
				jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
			}),
			() => {
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
			}
		);
	}
	handleClick() {
		this.setState(
			{
				loading: true
			},
			this.getJokes
		);
	}
	render() {
		if (this.state.loading) {
			return (
				<div className="Jokelist-spinner">
					<i className="far fa-8x fa-laugh fa-spin" />
					<h1 className="Jokelist-title">Loading...</h1>
				</div>
			);
		}
		let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
		return (
			<div className="Jokelist">
				<div className="Jokelist-sidebar">
					<h1 className="Jokelist-title">
						<span>Dad</span> Jokes
					</h1>
					<img src="https://img.icons8.com/dusk/64/000000/lol.png" />
					<button className="Jokelist-getmore" onClick={this.handleClick}>
						Fetch Jokes
					</button>
				</div>
				<div className="Jokelist-jokes">
					{jokes.map((joke) => (
						<Joke
							key={joke.id}
							votes={joke.votes}
							text={joke.text}
							upvote={() => this.handleVote(joke.id, 1)}
							downvote={() => this.handleVote(joke.id, -1)}
						/>
					))}
				</div>
			</div>
		);
	}
}
