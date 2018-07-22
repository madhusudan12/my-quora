import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';
class Login extends Component{
    state = {
        name : '',
        pass : '',
        login : this.props.login,
        username:this.props.username
    };
    saveName=(event)=>{
        const {target :{value}} = event;
        this.setState({
            name:value
        });

    }

    savePass = (event)=>{
        const {target :{value}} = event;
        this.setState({
            pass:value
        });
    }
    submit = (e) =>{
        const{name,pass} = this.state;
        var form = new FormData();
        form.append('username', name);
        form.append('password', pass);
        fetch(this.props.login_url,{
            method:'POST',
            body: form
            })
            .then(response => response.json())
        .then(responseJson => {
            if('token' in responseJson){
                this.state.login(responseJson.token,name);
                this.props.history.push('/questions/');
            }
            else{
                alert('incorrect username or  password');
            }
        })
        .catch(e => {console.log (e);});
        }
        render(){
            return(
                <div style={{width:300,margin:'auto'}}>
                    <br/><br/>
                    <legend  align = "center">Login</legend>
                <br/>
                <input className="form-control" type="text" onChange = {this.saveName} name = "name" style={{width:260,margin:'auto'}} placeholder="username"/>
                <br/> 
                <input  className="form-control" type="password" onChange = {this.savePass} name = "pass" style={{width:260,margin:'auto'}} placeholder="password"/>
                <br/><br/>
                <button className="btn btn-primary" onClick={this.submit}>submit</button>
                </div>
            )
        }
}
export default withRouter(Login);