import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
class SignUp extends Component{
    state = {
        username : '',
        password : '',
        firstname : '',
        lastname : '',
        email : '',
        location:'',
        description:'',
        login : this.props.login,
        signup_url : this.props.signup_url,
        login_url:this.props.login_url,
        token : this.props.token,
        status:false,
    };
    saveName=(event)=>{

        const {target :{value}} = event;
        this.setState({
            username:value
        });

    }

    savePass = (event)=>{

        const {target :{value}} = event;
        this.setState({
            password:value
        });
    }

    saveFirstname=(event)=>{

        const {target :{value}} = event;
        this.setState({
            firstname:value
        });

    }
    
    saveLastname=(event)=>{

        const {target :{value}} = event;
        this.setState({
            lastname:value
        });
    }
    
    saveEmail=(event)=>{

        const {target :{value}} = event;
        this.setState({
            email:value
        });
    }

    saveLocation=(event)=>{
        const {target:{value}}=event;
        this.setState({
            location:value
        });
    }

    saveDescription=(event)=>{
        const {target:{value}}=event;
        this.setState({
            description:value
        });
    }

    loginuser=()=>{
        var un=this.state.username;
        var pw=this.state.password;
        var form=JSON.stringify({
            username:un,
            password:pw
        });
        fetch(this.props.login_url,{
            method:'POST',
            body: form
            })
            .then(response => response.json())
        .then(responseJson => {
            if('token' in responseJson){
                this.state.login(responseJson.token);
            }
            else{
                alert('incorrect username or  password');
            }
        })
        .catch(e => {console.log (e);});

    }

    submit = (e) =>{
        var data=JSON.stringify({
            location:this.state.location,
            description:this.state.description,
            user: {
                username: this.state.username,
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            },
          
        });
        fetch(this.state.signup_url,{
            method:'POST',
            headers: new Headers({
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
               }),
            body: data,
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
            this.setState({
                status:true
            });
            this.props.history.push('/login/');
        })
        .catch(e => {console.log (e);});
        }


        render(){
           
            return(
                <React.Fragment>
                <div Style="width:300px;margin:auto;">
                    <br/><br/>
                    <legend  align = "center">SignUp</legend>
                    <br/>
                    <input onChange = {this.saveName} className="form-control" type = "text" name = "username" id="un" placeholder = "username"  Style="width:300px"/>
                    <br/>
                    <input onChange = {this.savePass} className="form-control" type = "password" name = "password" id="pw" placeholder = "********"/>
                    <br/>
                    <input onChange = {this.saveFirstname} class="form-control" type = "text" name = "firstname" placeholder = "firstname"  Style="width:300px"/>
                    <br/>
                    <input onChange = {this.saveLastname} className="form-control" type = "text" name = "lastname" placeholder = "lastname"  Style="width:300px"/>
                    <br/>
                    <input onChange = {this.saveEmail} className="form-control" type = "email" name = "email" placeholder = "email"/>
                    <br/>
                    <input onChange={this.saveLocation} className="form-control" type="text" name="location" placeholder="location"  Style="width:300px"/>
                    <br/>
                    <input onChange = {this.saveDescription} className="form-control" type = "text" name = "description" placeholder = "description"  Style="width:300px"/>
                    <br/>
                    <div align = "center">
                        <button type="button" className="btn btn-primary" onClick={this.submit}>SignUp</button>
                    </div>
                    <br/><br/><br/><br/>
                </div>
                </React.Fragment>
                )

        }
}
export default withRouter(SignUp);