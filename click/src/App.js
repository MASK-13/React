import React, { Component } from "react";

import { Line } from 'rc-progress';

import Wrapper from "./components/Wrapper";

import Card from './components/Card';

import Cars from './cars.json';

import './App.css';



let topScore = 0;

let guessesCorrect = 0;

let progress = 0;

let message = "";



class App extends Component {



	state = {

		Cars,

		topScore,

		guessesCorrect,

		message, 

		progress

	};



	setClicked = id => {

		const Cars = this.state.Cars;

		const cardClicked = Cars.filter(Car => Car.id === id);



		if (cardClicked[0].clicked) {



			guessesCorrect = 0;

			message = 'Whoops same card. Start over';



			// change to map or smth?

			for (let i = 0; i < Cars.length; i++) {

				Cars[i].clicked = false;

			}



			this.setState({message});

			this.setState({guessesCorrect});

			this.setState({Cars});



		} else {

			cardClicked[0].clicked = true;



			guessesCorrect = guessesCorrect + 4;

			message = "Good Job!"



			if (guessesCorrect > topScore) {

				topScore = guessesCorrect;

				progress++;

				this.setState({progress});

				this.setState({topScore});

				this.renderProgress();

			}



			Cars.sort((a, b) => {

				return 0.5 - Math.random();

			});



			this.setState({Cars});

			this.setState({guessesCorrect});

			this.setState({message});

		}

	};



	renderProgress() {

		

	};



    render() {



        return ( 

        	<Wrapper>

    			<div className="hero">

    				<div className="heroText">

    					<h1 className="banner">Click Game</h1>

        				<h3 className="rules">Choose your favorite Cars</h3>

        				<h3 className="message">{this.state.message}</h3>

    				</div>

    				

					<div className="progressWrapper">

    	 			{this.renderProgress()}

    				<Line 

						className="progress-bar"

	        			percent={this.state.guessesCorrect}

	        			trailWidth="8" 

	        			strokeWidth="8" 

	        			strokeColor="#87df6f"

						strokeLinecap="square" />

    				</div>

    			</div>

            	<div className="row">

            		{this.state.Cars.map(Car => (

            			<Card

            				setClicked={this.setClicked}

            				id={Car.id}

            				key={Car.id}

            				image={Car.image}

            				name={Car.name}

            				className="col-sm-1"

            			/>

            		))}

            	</div>

            </Wrapper>

        );

    }

};



export default App;