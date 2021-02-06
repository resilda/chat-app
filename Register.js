import React from 'react';
import firebase from '../../firebase.js';
import { Link } from 'react-router-dom';
import './Register.css';

//we create the components that the user needs to register
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			error: null
		};
	}

	//it renders everytime a new user wants to register
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	//the user is registered in the database
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, username, password } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				const user = firebase.auth().currentUser;
				user
					.updateProfile({ displayName: username })
					.then(() => {
						this.props.history.push('/');
					})
					.catch((error) => {
						this.setState({ error });
					});
			})
			.catch((error) => {
				this.setState({ error });
			});
	};

	//after being register you can automatically go to the chat
	//here is the option to leave the chat
	handleLogout = () => {
		firebase.auth().signOut().then((window.location = '/'));
	};
	render() {
		const { email, username, password, error } = this.state;
		return (
			<div className="auth-container">
				<h1 className="logo">jalpTech</h1>

				<h1>Register your account</h1>
				<p className="p">
					Welcome to <i>jalpTech</i>! Enjoy our new online plafrom of chat-room!
				</p>

				{error && <p className="error-message">{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<div className="inputs">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={this.handleChange}
						/>
						<label htmlFor="email">Email address</label>
						<input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
						<label htmlFor="password">Choose a password</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={this.handleChange}
						/>
					</div>

					<div className="nav-chat-bottom">
						<button children="Get Started" id="btn-font" />
						<button onClick={this.handleLogout} id="btn-font">
							Go back
						</button>
					</div>

					<p className="acc">
						Already have an account?
						<button className="login-btn">
							<Link to="/login" id="btn-font">
								Login here
							</Link>
						</button>
					</p>
				</form>

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
export default Register;
