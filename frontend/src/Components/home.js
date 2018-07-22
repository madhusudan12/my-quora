import React,{ Component } from 'react';
class Home extends Component{
    render(){
        return(
            <div>
                <center>
                    <legend align="center" ><h2>Quora</h2></legend>
                    <div className="h-100 row align-items-center">
                        <span className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3"></span>
                        <span className="col-md-6 col-lg-6 col-xl-6 mx-auto mt-6">
                        <p>
                        Quora is a Q & A Platform where people from different backgrounds 
                        ask the questions an answer the questions.
                        This is an app which is similar kind of Quora with basic features.
                        Quora connects people from different Communities and available for all of them.
                        This is developed using the following technologies.
                        <br/><br/>
                        <ul align="left">
                        <li>django</li>
                        <li>django-rest-framework</li> 
                        <li>React (front end) </li>
                        </ul>
                        The github Repo for this project can be found at &nbsp;
                        <a href="https://www.github.com/madhusudan12/my-quora">myquora</a>
                        <br/>
                        <br/>
                        By :&nbsp;
                        <strong>Madhusudan Chowdary</strong>
                        </p>
                        </span>
                        <span className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3"></span>
                    </div>    
                </center>    
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}
export default Home;