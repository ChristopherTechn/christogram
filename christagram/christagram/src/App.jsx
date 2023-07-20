import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import RegistrationForm  from './components/signup';
import './App.css'
import Headerss from './components/header';
import Footers from './components/Footer';
import LoginForm from './components/login';
import PostList from './components/posts';
import Post from './components/posting';
import Postprofile from './components/profile';
import Logout from './components/Logout'
import PasswordReset from './components/Forgotpassword';
import MessageForm from './components/comments'
import UserProfile from './components/viewprofile'
import Notifications from './components/viewnotifications';
import Userprofile from './components/userprofile'
import AddComment from './components/comments';
import ReplyForm from './components/replies';
import FollowersList from './components/following';
import UserSearch from './components/search';





function App() {
  return (
    <div className='container'>
      <div className='title'><h1>@CHRISTAGRAM</h1>
      
      <nav className="middle">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
         
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
          <Link to="/LoginForm">signin</Link>

          </li>
          <li>
          <Link to="/posts">posts</Link>

          </li>
          <li>
          <Link to="/post">post</Link>

          </li>
          <li>
          <Link to="/profile">profile</Link>

          </li>
          
          <li>
          <Link to="/logout">logout</Link>

          </li>
          <li>
          <Link to="/viewprofile">profile</Link>

          </li>
          <li>
          <Link to="/followers">followerslist</Link>

          </li>
        
        </ul>
      </nav>
      </div>
      {<Headerss/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/post" element={<Post/>} />
        <Route path="/profile" element={<Postprofile/>} />

        <Route path="/logout" element={<Logout/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/PasswordReset" element={<PasswordReset/>} />
        <Route path="/MessageForm" element={<MessageForm/>} />
        <Route path="/viewprofile" element={<UserProfile/>} />
        <Route path="/Notifications" element={<Notifications/>} />
        <Route path="/Userprofile" element={<Userprofile/>} />
        <Route path="/addcomment" element={<AddComment/>} />
        <Route path="/Replies" element={<ReplyForm/>} />
        <Route path="/followers" element={<FollowersList/>} />
        <Route path="/search" element={<UserSearch/>} />

      </Routes>
     
     
     
     
      <div className='frame'>
        <div className='frame-profile'></div>
        <div className='main-profile'></div>
        <div className='followers-profile'></div>
      </div>

      {<Footers/>}
    </div>
  );
}

export default App;
