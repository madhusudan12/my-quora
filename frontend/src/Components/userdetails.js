import React,{Component} from 'react';
class UserDetails extends Component{
    state={
        userdetail_url:this.props.userdetail_url,
        token:this.props.token,
        details:[],
    }

    componentDidMount(){
        fetch(this.state.userdetail_url,{
            method:'GET',
            headers: new Headers({
             'Authorization': `JWT ${this.state.token}`,
             'Content-Type': 'application/x-www-form-urlencoded',
           }),
            })
        .then(response => response.json())
        .then(responseJson => {
        this.setState({ details : responseJson});
        console.log(responseJson);
        })
        .catch(e => {console.log (e);
        });
    }
    render(){
        return(
            <React.Fragment>
                {this.state.details.map(item => (
                    <div>
                    <center>
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="well well-sm">
                <div class="row">
                    <div class="col-sm-6 col-md-4">
                        <img src="http://placehold.it/380x500" alt="" class="img-rounded img-responsive" />
                    </div>
                    <div class="col-sm-6 col-md-8">
                        <h4>
                            {item.user.first_name} {item.user.last_name}</h4>
                        <small><cite title="location"> {item.location}<i class="glyphicon glyphicon-map-marker">
                        </i></cite></small>
                        <p>{item.description}</p>
                        <p>
                            <i className="glyphicon glyphicon-envelope"></i> {item.user.email}
                            <br />
                            <i className="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">website</a>
                            <br />
                            <br/>

                            <p>username: {item.user.username}</p>
                            <span className="label label-primary">rating</span>
                                <span className="label label-success">
                                {item.rating}
                                </span>
                           </p>     
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </center>
    <br/>
    <br/>
    <br/>
    </div>
                ))}

            </React.Fragment>    
        )
    }
}
export default UserDetails;