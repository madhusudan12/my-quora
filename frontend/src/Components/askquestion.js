import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';
class AskQuestion extends Component{

    state={
        isLoggedin:this.props.isLoggedin,
        askquestion_url:this.props.askquestion_url,
        token:this.props.token,
        title:null,
        description:null,
    }

    
    saveTitle=(event)=>{
        const {target:{value}}=event;
        this.setState({
            title:value
        });
    }

    saveDescription=(event)=>{
        const {target:{value}}=event;
        this.setState({
            description:value
        });
    }

    submit = (e) =>{
        // let data=new FormData();
        // data.append("title",this.state.title);
        // data.append("description",this.state.description);
        var title=this.state.title;
        var description=this.state.description;
        var data=JSON.stringify({
            title:title,
            description:description,
        })
        console.log(data.title);
        console.log(data.description);
        console.log(data);
        console.log(this.state.askquestion_url);
        console.log(this.state.token);
        fetch(this.state.askquestion_url,{
            method:'POST',
            headers: new Headers({
             'Authorization': `JWT ${this.state.token}`,
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             
                    }),
            body:data,
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
            this.props.history.push("/questions");
        })
        .catch(e => {console.log (e);});
    }

    render(){
        const divStyle={width:"70%"};
        const textStyle={width:"70%"};
        //const dateStyle={font:8,color:"black"};
        //const bodStyle={cols:80};
        return(
            <React.Fragment>
                <div>
                <legend  align = "center">Ask Question</legend>
                <center>
                <div className="panel panel-info" style={divStyle} >
                        <div className="panel-heading">
                        <input onChange = {this.saveTitle} className="form-control" type = "text" name = "title" id="title" placeholder = "title of the question"  style={textStyle}/>
                        </div>

                        <div className="panel-body">
                        <textarea onChange = {this.saveDescription} className="form-control" type = "textarea" name = "description" id="desc" placeholder = "Description Of your Question"  rows={10} cols={80}/>
                        </div>
                        <br/>
                    <div align = "center">
                        <button type="button" class="btn btn-primary" onClick={this.submit}>submit</button>
                    </div>

                </div>  


                {/* <br/><br/>
                <legend  align = "center">Preview</legend>
                <div className="panel panel-info" style={divStyle} >
                        <div className="panel-heading">
                        {this.state.title}
                        </div>
                        <div className="panel-body">
                        <div style={bodStyle}>
                        {this.state.description}
                        </div>
                        </div>
                        
                </div>
                                             */}
                </center>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(AskQuestion);