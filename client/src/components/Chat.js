import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Users, 
  Hash, 
  Smile, 
  Paperclip, 
  Search,
  Settings,
  UserPlus,
  MessageSquare
} from 'lucide-react';
// import './Chat.css';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [onlineUsers] = useState([
    { username: user?.username || 'Guest', status: 'online' },
    { username: 'Alex_Dev', status: 'online' },
    { username: 'Sarah_Code', status: 'away' },
    { username: 'Mike_JS', status: 'online' },
    { username: 'Emma_React', status: 'busy' }
  ]);

  const messagesEndRef = useRef(null);

  const channels = [
    { id: 'general', name: 'General', members: 156 },
    { id: 'javascript', name: 'JavaScript', members: 89 },
    { id: 'react', name: 'React', members: 67 },
    { id: 'python', name: 'Python', members: 134 },
    { id: 'help', name: 'Help & Support', members: 203 },
    { id: 'random', name: 'Random', members: 78 }
  ];

  useEffect(() => {
    const initialMessages = [
      { id: '1', sender: 'Alex_Dev', message: 'Hey everyone! 🚀', timestamp: new Date(Date.now() - 300000), channel: 'general' },
      { id: '2', sender: 'Sarah_Code', message: 'Congrats Alex!', timestamp: new Date(Date.now() - 240000), channel: 'general' },
      { id: '3', sender: 'Mike_JS', message: 'Hooks were great!', timestamp: new Date(Date.now() - 180000), channel: 'general' },
      { id: '4', sender: 'Emma_React', message: 'Anyone working on the project?', timestamp: new Date(Date.now() - 120000), channel: 'general' }
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomUsers = ['Alex_Dev', 'Sarah_Code', 'Mike_JS', 'Emma_React'];
        const randomMessages = [
          'Great explanation today!',
          'Can someone help me with JS?',
          'Just earned my first badge! 🎉',
          'Quiz was fun!',
          'Loving this platform!',
          'Anyone up for a study session?'
        ];

        const newMsg = {
          id: Date.now().toString(),
          sender: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          channel: selectedChannel
        };

        setMessages(prev => [...prev, newMsg]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedChannel]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: user?.username || 'Guest',
        message: newMessage,
        timestamp: new Date(),
        channel: selectedChannel
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'green';
      case 'away': return 'goldenrod';
      case 'busy': return 'red';
      default: return 'gray';
    }
  };

  const filteredMessages = messages.filter(msg => msg.channel === selectedChannel);

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <MessageSquare className="icon" />
            <div>
              <h1>Chat Rooms</h1>
              <p>Connect with fellow learners</p>
            </div>
          </div>

          <div className="search-box">
            <Search className="search-icon" />
            <input type="text" placeholder="Search channels..." />
          </div>

          <div className="channels">
            <h3>Channels</h3>
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={selectedChannel === channel.id ? 'channel active' : 'channel'}
              >
                <Hash /> {channel.name}
                <span className="members">{channel.members}</span>
              </button>
            ))}
          </div>

          <div className="online-users">
            <h3><Users /> Online ({onlineUsers.length})</h3>
            {onlineUsers.map((u, i) => (
              <div key={i} className="user">
                <div className="avatar">{u.username.charAt(0)}</div>
                <div>
                  <p>{u.username}</p>
                  <span style={{ color: getStatusColor(u.status) }}>{u.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Main */}
        <div className="chat-main">
          <div className="chat-header">
            <Hash />
            <div>
              <h2>#{channels.find(c => c.id === selectedChannel)?.name}</h2>
              <p>{channels.find(c => c.id === selectedChannel)?.members} members</p>
            </div>
            <div className="header-actions">
              <UserPlus />
              <Settings />
            </div>
          </div>

          <div className="chat-messages">
            {filteredMessages.map(message => (
              <div key={message.id} className="message">
                <div className="message-avatar">{message.sender.charAt(0)}</div>
                <div>
                  <div className="message-info">
                    <strong>{message.sender}</strong>
                    {message.sender === (user?.username || 'Guest') && <span className="you-tag">You</span>}
                    <small>{formatTime(message.timestamp)}</small>
                  </div>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${channels.find(c => c.id === selectedChannel)?.name}`}
            />
            <div className="input-actions">
              <Paperclip />
              <Smile />
              <button type="submit" disabled={!newMessage.trim()}>
                <Send />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
