import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import './styles/head.css';


class BarComponent extends Component{
  state={
    isLoggedIn:this.props.isLoggedIn,
    logout:this.props.logout,
    search_value:'',
    question_list_url:this.props.question_list_url,
  }

  cookies=new Cookies();
  // search=()=>{
  //   if(document.getElementById('search').value!==""){
  //     console.log(document.getElementById('search').value);
  //     var url="/questions/?search="+document.getElementById('search').value;
  //     //var url="/questions/";
  //     console.log(url);
  //     this.props.history.push(url);
  //     console.log("directed");
  //   }
  // }

  saveSearchValue = (event)=>{

    const {target :{value}} = event;
    this.setState({
        search_value:value
    });
}


    render(){
        return(
  <React.Fragment> 
  <nav className="navbar navbar-inverse mycol">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link className="navbar-brand" to="/">Q & A Platform</Link>
    </div>
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/questions">Feed</Link></li>
      <li><Link to="/askquestion">Ask Question</Link></li>
    </ul>
    <form className="navbar-form navbar-left" action="/search">
  <div className="input-group">
    <input type="text"  onChange = {this.saveSearchValue}className="form-control"  placeholder="Search"/>
    <Link className="btn btn-secondary my-2 my-sm-0" to={
                           "/questions/?search="+this.state.search_value
                            }>
                            Search
                        </Link>
  </div>
</form>
    <ul className="nav navbar-nav navbar-right">
      <li>
      {this.props.isLoggedIn?
                <Link to="/userdetails"><span className="glyphicon glyphicon-user"></span>
                <span>{this.props.username}</span></Link>:
                <Link to="/signup/"><span className="glyphicon glyphicon-user"></span>
                <span>SignUp</span></Link>
      }
       </li>
      <li>
      {this.props.isLoggedIn?
                <Link onClick={this.state.logout} className="nav-Link"  to="/login"><span className="glyphicon glyphicon-log-in"></span>
                <span>Logout</span></Link>:
                <Link className="nav-Link" to="/login"><span className="glyphicon glyphicon-log-in"></span>
                <span>Login</span></Link>
      }
       </li>
    </ul>
  </div>
</nav>
</React.Fragment>
        );
    }
}
export default BarComponent;