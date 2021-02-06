import React from 'react';
import firebase from '../../firebase';
import './Chatbox.css';

class Chatbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: []
		};
	}

	//after every message that is pushed into database
	//we can see which user sent it, the date and also the message
	componentDidMount() {
		const chatRef = firebase.database().ref('test');
		chatRef.on('value', (snapshot) => {
			const getChats = snapshot.val();
			let ascChats = [];
			for (let chat in getChats) {
				ascChats.push({
					id: chat,
					message: getChats[chat].message,
					user: getChats[chat].user,
					date: getChats[chat].timestamp
				});
			}

			//the last message is shown normally in the end
			const chats = ascChats;
			this.setState({ chats });

			this.scrollToBottom();
		});
	}

	//it automatically scrolls to the bottom of the chat
	//the user can the last message that has been sent
	scrollToBottom = () => {
		if (this?.messagesEnd && this?.messagesEnd?.scrollIntoView) {
			this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
		} else {
            console.log('error');
        }
	};

	handleLogout = () => {
		firebase.auth().signOut().then((window.location = '/'));
	};

	render() {
		return (
			<div id="chat-window">
				<p className="p-chat">Keep up with the latest messages that you missed by just scrolling.</p>
				<button id="log-out" onClick={this.handleLogout}>
					{' '}
					Leave Chat
				</button>
				<div className="chatbox">
					<ul className="chat-list" style={{ overflow: 'scroll', height: '400px' }}>
						{this.state.chats.map((chat) => {
							const postDate = new Date(chat.date);
							return (
								<div className="el-list">
									<div key={chat.id}>
										<em id="em">{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</em>
										<strong>{chat.user}:</strong>
										{chat.message}
									</div>
								</div>
							);
						})}

						<div
							style={{ float: 'left', clear: 'both' }}
							ref={(el) => {
								this.messagesEnd = el;
							}}
						/>
					</ul>
				</div>
			</div>
		);
	}
}
export default Chatbox;
