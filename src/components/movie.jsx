import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

export default class Movies extends Component {
	state = {
		movies: getMovies()
	}

	handleDelete = movie => {
		this.setState(prevState => ({
			movies: prevState.movies.filter(_movie => _movie._id !== movie._id)
		}));
	}

	handleLike = movie => {
		this.setState(prevState => ({
			movies: prevState.movies.map(_movie => {
				if (_movie._id === movie._id) {
					if (_movie.likeStatus) {
						_movie.likeStatus = false;
					} else {
						_movie.likeStatus = true;
					}
				}
				return _movie;
			})
		}));
	}

	getLikeStatusClasses = movie => {
		if (movie.likeStatus) {
			return "fa fa-heart";
		} else {
			return "fa fa-heart-o";
		}
	}

	renderMovies() {
		// console.log(this.state.movies);
		let i = 1;
		return (
			<tbody>
				{this.state.movies.map(movie => (
					<tr key={movie._id}>
						<th scope="row">{i++}</th>
						<td>{movie.title}</td>
						<td>{movie.genre.name}</td>
						<td>{movie.numberInStock}</td>
						<td>{movie.dailyRentalRate}</td>
						<td><i onClick={() => this.handleLike(movie)} className={this.getLikeStatusClasses(movie)} aria-hidden="true"></i></td>
						<td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
					</tr>))}
			</tbody>);
	}

	render() {
		let { length: count } = this.state.movies;

		if (count === 0) {
			return <p>There are no movies in the database.</p>
		}

		return (
			<React.Fragment>
				<p>Showing {count} movies in the database.</p>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rating</th>
							<th scope="col"></th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					{this.renderMovies()}
				</table >
			</React.Fragment>
		);
	}
}
