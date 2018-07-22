import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route,  } from "react-router-dom";
import {Redirect} from 'react-router-dom';
//import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
//import {Navigation} from 'react-router';
import Home from './Components/home.js';
import HeaderComponent from './Components/header.js';
import BarComponent from './Components/bar';
import Footer from './Components/footer.js';
import QuestionList from './Components/questionlist.js';
import AnswerList from './Components/answerlist.js';
import Login from './Components/login.js';
import SignUp from './Components/signup.js';
import UserDetails from './Components/userdetails.js';
import User from './Components/otheruser.js';
import AskQuestion from './Components/askquestion.js';


class App extends Component {
  state = {
    isLoggedIn : false,
    token : null,
    tokenValidity : 1000*24*60*60*60*60,
    username : null,
    id : null,
    type : null,
    // login_url : "http://127.0.0.1:8000/api-token-auth/",
    // signup_url:"http://127.0.0.1:8000/discussion/user/create/",
    // userDetails_url : "http://127.0.0.1:8000/discussion/user/",
    // questions_url:'http://127.0.0.1:8000/discussion/question/',
    // ask_question_url:"http://127.0.0.1:8000/discussion/question/create/",
    // answer_question_url:"http://127.0.0.1:8000/discussion/answer/create/",
    // answers_url:"http://127.0.0.1:8000/discussion/question/",
    // upvote_url:"http://127.0.0.1:8000/discussion/upvote/answer/",
    login_url : "http://18.218.189.22:8000/api-token-auth/",
    signup_url:"http://18.218.189.22:8000/discussion/user/create/",
    userDetails_url : "http://18.218.189.22:8000/discussion/user/",
    questions_url:'http://18.218.189.22:8000/discussion/question/',
    ask_question_url:"http://18.218.189.22:8000/discussion/question/create/",
    answer_question_url:"http://18.218.189.22:8000/discussion/answer/create/",
    answers_url:"http://18.218.189.22:8000/discussion/question/",
    upvote_url:"http://18.218.189.22:8000/discussion/upvote/answer/",
  }
  cookies = new Cookies();

  

  toggleLoggedIn = () =>{
    this.setState(prev => ({isLoggedIn : !prev.isLoggedIn}));   
  }

  updateLoggedIn=(isLoggedIn)=>{
    this.setState({isLoggedIn});
  }

  updateToken = (token) =>{
    this.setState({token});
  } 

  updateUsername = (username) =>{
    this.setState({username});
  }
  updateUserId = (id) =>{
    this.setState({id});
  }

  componentWillMount(){
    let token = this.cookies.get('discussion_jwt_token');
    console.log(token);
    if (!(typeof token === 'undefined'))
    {
        let username=this.cookies.get('discussion_username');
        let id=this.cookies.get('discussion_user_id');
        this.updateUsername(username);
        this.updateUserId(id);
        this.updateToken(token);
        this.updateLoggedIn(true);
    }
 }
  

  logout = () =>{
    new Cookies().remove('discussion_jwt_token',{ path: '/' });
    new Cookies().remove('discussion_username',{ path: '/' });
    new Cookies().remove('discussion_user_id',{ path: '/' });
    //this.toggleLoggedIn();
    console.log(this.cookies.getAll())
    this.updateLoggedIn(false);
    this.updateUserId(null);
    this.updateUsername(null);
    this.updateToken(null);
    // this.setState(prev => ({token : null}))
    // this.setState(prev => ({username : null}))
}

  login = (token,username) =>{
    this.toggleLoggedIn();
    this.updateToken(token);
    fetch(this.state.userDetails_url,{
        method:'GET',
        headers: new Headers({
         'Authorization': `JWT ${token}`,
         'Content-Type': 'application/x-www-form-urlencoded',
       }),
        })
        .then(response => {
          if (response.ok) {
              return response.json();
            } else {
              
              var error = new Error(response.statusText);
              error.response = response;
                console.log(response.statusText);
              alert(error,response.statusText);
              throw error
            }
  })
    .then(responseJson => {
      this.updateUsername(responseJson[0].user.username); 
      this.updateUserId(responseJson[0].user.id);
      this.cookies.set('discussion_jwt_token', token, { path: '/',expires: new Date(Date.now()+ this.state.tokenValidity)} );
      this.cookies.set('discussion_username',responseJson[0].user.username,{path:'/',expires:new Date(Date.now()+this.state.tokenValidity)});
      this.cookies.set('discussion_user_id',responseJson[0].user.id,{path:'/',expires:new Date(Date.now()+this.state.tokenValidity)});
      console.log(responseJson[0].user.username);
      console.log(username);  
    })
    .catch(e => {console.log (e);});
}


  render() {
    return (
      <div className="App">
      <HeaderComponent title="Quora" isLoggedIn = {this.isLoggedIn} updateLoggedIn={this.updateLoggedIn}/>
      <React.Fragment>
                <Router>  
                  <div>
                  <Route render ={props =>
                                <BarComponent 
                                    isLoggedIn = {this.state.isLoggedIn} 
                                    logout={this.logout}
                                    username={this.state.username}
                                    question_list_url={this.state.questions_url}
                                    updateLoggedIn={this.props.updateLoggedIn}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path="/login" render={props => !this.isLoggedIn
                         ?
                         <Login login = {this.login} 
                                login_url = {this.state.login_url}
                                username={this.state.username}
                                {...props}
                                
                                />
                         :
                         <Redirect to="/"/>}
                         />
                        <Route exact path="/signup/" render={props => !this.isLoggedIn
                         ?
                         <SignUp login = {this.login} 
                                signup_url = {this.state.signup_url} 
                                login_url = {this.state.login_url}
                                username={this.state.username}
                                {...props}
                          />
                         :
                         <Redirect to="/"/>}
                         />

                    <Route exact path='/questions' render={props=>
                    <QuestionList 
                          isLoggedIn={this.state.isLoggedIn}
                          questions_url={this.state.questions_url}
                          {...props}
                    />
                    }/>

                    <Route exact path='/' render={props=>
                    <Home 
                          {...props}
                    />
                    }/>

                    <Route exact path='/answers/:id/' render={props=> 
                    <AnswerList
                        token={this.state.token}
                        isLoggedIn={this.state.isLoggedIn}
                        answer_question_url={this.state.answer_question_url}
                        answers_url={this.state.answers_url}
                        upvote_url={this.state.upvote_url}
                        current_user_id={this.state.id}
                        {...props}
                    />
                    }/>

                    <Route exact path='/userdetails' render={props=>
                    <UserDetails
                    userdetail_url={this.state.userDetails_url}
                    token={this.state.token}
                    {...props}
                    />
                    }/>

                    <Route exact path='/userdetails/:id/' render={props=>
                    <User
                    userdetail_url={this.state.userDetails_url}
                    token={this.state.token}
                    {...props}
                    />
                    }/>

                    <Route exact path="/askquestion" 
                            render={props => this.state.isLoggedIn
                                ?
                                <AskQuestion 
                                    token={this.state.token} 
                                    askquestion_url = {this.state.ask_question_url} 
                                    isLoggedIn={this.state.isLoggedIn}
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />

                     <Route render ={props =>
                                <Footer 
                                    isLoggedIn = {this.state.isLoggedIn} 
                                    logout={this.logout}
                                    username={this.state.username}
                                    question_list_url={this.state.questions_url}
                                    updateLoggedIn={this.props.updateLoggedIn}
                                    {...props}
                                />
                            }
                        />    

          
                    </div>
                </Router>
            </React.Fragment>
      </div>
    );
  }
}
export default App;
