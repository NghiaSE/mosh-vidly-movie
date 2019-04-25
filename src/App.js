import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Movie from "./components/movie";

export default class App extends Component {
  render() {
    return (
      <main role="main" className="container">
        <Movie />
      </main>
    );
  }
}

