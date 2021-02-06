import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebase.js';
import Home from './components/Home/Home.js';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import reportWebVitals from './reportWebVitals';
import './index.css';

class AppRouter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: null };
	}

	//saves the user
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			}
		});
	}

	//the router components to navigate through the pages
	render() {
		return (
			<Router>
				<div className="app">
					<Switch>
						<Route path="/" exact render={() => <Home user={this.state.user} />} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
