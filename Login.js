import React from 'react';
import firebase from '../../firebase.js';
import { Link } from 'react-router-dom';
import './Login.css';

//we create the components that the user needs to login
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			error: null
		};
	}

	//it renders for every new user
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	//allows the user to login
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				this.props.history.push('/');
			})
			.catch((error) => {
				this.setState({ error });
			});
	};

	//the option to leave the chat
	handleLogout = () => {
		firebase.auth().signOut().then((window.location = '/'));
	};

	render() {
		const { email, password, error } = this.state;
		return (
			<div className="auth-container">
				<h1 className="logo">jalpTech</h1>

				<h1>Login to your account</h1>
				<p className="p">
					Welcome back!! Stay tuned with the latest ideas and conversations between your friends!
				</p>

				{error && <p className="error-message">{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<div className="inputs">
						<label htmlFor="email">Email Address</label>
						<input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
						<label htmlFor="password">Input Password</label>
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
						Do not have an account?{' '}
						<button className="reg-btn">
							<Link to="/register" id="btn-font">
								Register here
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
export default Login;
