import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import Chatbox from './Chatbox';
import './Home.css';

//creating a class and getting all the  global components such as: user
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}

	//it should render a new message after the submit button is clicked (or enter from the keyboard)
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	//every message is stored into firebase database
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.message !== '') {
			const chatRef = firebase.database().ref('test');
			const chat = {
				message: this.state.message,
				user: this.props.user.displayName,
				timestamp: new Date().getTime()
			};

			chatRef.push(chat);
			this.setState({ message: '' });
		}
	};

	//it goes back to the home window
	handleLogout = () => {
		firebase.auth().signOut().then((window.location = '/'));
	};

	render() {
		return (
			<div className="home-container">
				<h1 className="logo">jalpTech</h1>
				<h1 className="welcome">
					Welcome to <i>"jalpTech"</i>!
				</h1>
				<p className="about-us">Let's start exachanging ideas from our homes!!</p>
				<div className="chat">
					{this.props.user && (
						<div className="allow-chat">
							<Chatbox />
							<form className="send-chat" onSubmit={this.handleSubmit}>
								<input
									type="text"
									name="message"
									id="message"
									value={this.state.message}
									onChange={this.handleChange}
									placeholder="say something nice..."
								/>
								<button className="submit-msg">Submit</button>
							</form>
						</div>
					)}
				</div>
				{!this.props.user && (
					<div className="disallow-chat">
						<div className="btn-reg-login">
							<button className="btn">
								<Link to="/login" id="btn-font">
									Login
								</Link>
							</button>{' '}
							<button className="btn">
								<Link to="/register" id="btn-font">
									Register
								</Link>
							</button>
						</div>
					</div>
				)}
				<footer id="footer">
					<p id="contact">Contact</p>
					<button id="footer-btn">
						<a href="https://github.com/resilda" id="btn-font">
							github
						</a>
					</button>
				</footer>
			</div>
		);
	}
}
export default Home;
