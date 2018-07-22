import React, { Component } from 'react';
//import { Link  } from "react-router-dom";
import './styles/head.css';
import Cookies from 'universal-cookie';

class HeaderComponent extends Component{
        
    state = {
        isLoggedIn : this.props.isLoggedIn,
        title : this.props.title,            
    }

    cookies=new Cookies();
    // constructor(props){
    //     super(props);
    //     let token = this.cookies.get('discussion_jwt_token');
    //     console.log(token);
    //     if (!(typeof token === 'undefined'))
    //     {
    //         this.props.updateLoggedIn(true);
    //     }
    // }


    render(){
        return (
            <React.Fragment>
            <div className="header">
            <span className="title">{this.props.title}</span>            
            </div>
            </React.Fragment>
        )
    }
}
export default HeaderComponent;