import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import './styles/head.css';

class AnswerList extends Component{

    state={
        token:this.props.token,
        answerList:[],
        isLoggedIn:this.props.isLoggedIn,
        answer_question_url:this.props.answer_question_url,
        answers_url:this.props.answers_url,
        upvote_url:this.props.upvote_url,
        description:null,
        question_title:null,
        question_description:null,
        question_time:"time",
        question_author_name:null,
        question_author_rating:null,
        question_author_id:null,
        question_id:null,
        current_user_id:this.props.current_user_id,
        current_user_answer_present:false,
        status:false,
        version:0,
        page_no:1,
        prev_page_url:null,
        nextpage_url:null,
    };
    
    cookies=new Cookies();

    saveDescription=(event)=>{
        const {target:{value}}=event;
        this.setState({
            description:value
        });
    }

    makeAnswerPresent=()=>
    {
        this.setState({current_user_answer_present:true});
    }



    nextPage(){
        if(this.state.page_no>=1 && this.state.nextpage_url!=null ) {
            this.setState(prev=>({page_no:prev.page_no+1}));

        }
    }

    prevPage(){
        if(this.state.page_no>1 && this.state.prev_page_url!=null) {
            this.setState(prev=>({page_no:prev.page_no-1}));
        }
    }   
    


    componentDidUpdate(prevProps,prevState){
        if(prevState.version!==this.state.version||prevState.page_no!==this.state.page_no){
        fetch(this.state.answers_url+ this.props.match.params.id + "/answers/?page="+this.state.page_no)
        .then(response => response.json())
        .then(responseJson => {
        this.setState({ answerList : responseJson.results});
        this.setState({
            question_title:responseJson.results[0].question.title,
            question_description:responseJson.results[0].question.description,
            question_time:responseJson.results[0].question.time,
            question_author_name:responseJson.results[0].question.author.user.username,
            question_author_rating:responseJson.results[0].question.author.rating,
            question_author_id:responseJson.results[0].question.author.id,
            question_id:responseJson.results[0].question.id,
            prev_page_url:responseJson.previous,
            nextpage_url:responseJson.next,
        });
        
        if(this.state.question_id===null)
        {
            this.setState({ status : false});
        }
        else
        {
            this.setState({ status : true});
        }
        console.log(this.state.answerList[0].question.title);
        })
        .catch(e => {console.log (e);
        });
    }
    }

    submit = (e) =>{
        // let data=new FormData();
        // data.append("description",this.state.description);
        var data=JSON.stringify({
            description:this.state.description,
        });
        console.log(this.state.description);
        console.log(data);
        console.log(this.state.answer_question_url);
        console.log(this.state.token);
        fetch(this.state.answer_question_url+this.props.match.params.id+'/',{
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
            this.setState({
                status:true,
                description:''

            });
            this.setState(prev=>({version:prev.version+1}));
            this.props.history.push('/answers/'+this.props.match.params.id+'/');        
        })
        .catch(e => {console.log (e);});
    }


    upvote = (answer_id) =>{
        fetch(this.state.upvote_url+answer_id+'/',{
            method:'POST',
            headers: new Headers({
             'Authorization': `JWT ${this.state.token}`,
             'Content-Type': 'application/json',
             'Accept': 'application/json',
                    }),
            body:{},
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
            this.setState(prev=>({version:prev.version+1}));
            this.props.history.push('/answers/'+this.props.match.params.id+'/');
        })
        .catch(e => {console.log (e);});
    }

    
    componentDidMount(){
        fetch(this.state.answers_url+ this.props.match.params.id + "/answers/?page="+this.state.page_no)
        .then(response => response.json())
        .then(responseJson => {
        this.setState({ answerList : responseJson.results});
        this.setState({
            question_title:responseJson.results[0].question.title,
            question_description:responseJson.results[0].question.description,
            question_time:responseJson.results[0].question.time,
            question_author_name:responseJson.results[0].question.author.user.username,
            question_author_rating:responseJson.results[0].question.author.rating,
            question_author_id:responseJson.results[0].question.author.id,
            question_id:responseJson.results[0].question.id,
            prev_page_url:responseJson.previous,
            nextpage_url:responseJson.next,
        });
        
        

        if(this.state.question_id===null)
        {
            this.setState({ status : false});
        }
        else
        {
            this.setState({ status : true});
        }
        console.log(this.state.answerList[0].question.title);
        })
        .catch(e => {console.log (e);
        });
    }


    printId=(id)=>{
        console.log(id);
    }

   
        
    render(){
        const divStyle={width:"70%"};
        const dateStyle={fontSize:10,color:"green"};
        
        return(
            <React.Fragment>
                    <div>
                        {this.state.status?
                    <center>
                        <legend  align = "center">Question</legend>

                        <div className="panel panel-danger" style={divStyle} >
                        <div className="panel-heading">
                        {this.state.question_title}
                        </div>
                        <div className="panel-body">{this.state.question_description}</div>
                        <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row" style={dateStyle}>
                                {
                                    this.state.question_time.slice(11,19)
                                }
                                </div>
                                <div className="row" style={dateStyle}>    
                                {
                                this.state.question_time.slice(0,10)
                                }
                                </div>
                            </div>
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4">
                                <div className="row">
                                <Link to={"/userdetails/"+this.state.question_author_id+'/'}>
                                {this.state.question_author_name}
                                </Link>
                                </div>
                                <div className="row">
                                <span className="label label-primary">rating</span>
                                <span className="label label-success">
                                {this.state.question_author_rating}
                                </span>
                                </div>
                            </div>
                        </div>
                        </div>
                      </div>  
                      <center>
                       <legend  align = "center">Answers</legend>
                     </center>                  
                      </center>                     
                      :
                      <div>
                          Be the first to answer the question
                          <br/><br/>
                        {
                            this.state.isLoggedIn?<div></div>
                            :
                            <div>
                            <br/>
                            <Link to='/login'>Login</Link>
                            </div>
                        }

                      </div>
                    }
                    
                    {this.state.status?
                    
                    <div align="center">
                        &nbsp;&nbsp;&nbsp;
                        <span><button className="btn btn-default btn-sm" onClick={this.prevPage.bind(this)}>prev</button></span>
                        &nbsp;&nbsp;&nbsp;
                        <span><button className="btn btn-default btn-sm" onClick={this.nextPage.bind(this)}>next</button></span>
                        <br/>
                        <br/>
                        </div>
                        :<div></div>
                        
                    }
                    



                    {this.state.answerList.map(item => (

                        <center>
                        <div className="panel panel-info"style={divStyle} >

                        <div className="panel-heading">
                        
                        
                        
                        <div><div><div>
                        {    
                        item.author.user.id===this.state.current_user_id?
                        <span> {this.makeAnswerPresent()}</span>
                        : 
                        <span></span>   
                        }
                        </div></div></div>
                       
                        </div>
                        <div className="panel-body">{item.description}<br/><br/></div>
                        <div className="panel-footer">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row" style={dateStyle}>
                                {
                                    item.time.slice(11,19)
                                }
                                </div>
                                <div className="row" style={dateStyle}>    
                                {
                                item.time.slice(0,10)
                                }
                                </div>
                            </div>
                            <div className="col-sm-4">
                            {this.props.isLoggedIn?
                        <span onClick={() =>{this.upvote(item.id)}} className="btn btn-success btn-sm">
                        <span className="glyphicon glyphicon-thumbs-up"></span> Upvote  
                        </span>:
                        //<i class="far fa-thumbs-up"></i>:
                        <span></span>
                        }
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                <Link to={"/userdetails/"+item.author.id+'/'}>
                                {item.author.user.username}
                                </Link>
                                </div>
                                <div className="row">
                                <span className="label label-primary">rating</span>
                                <span className="label label-success">
                                {item.author.rating}
                                </span>
                                </div>
                            </div>
                        </div>
                        </div>
                        


                      </div>                    
                      </center>
                      
                    ))}
                    </div>
                    <div>
                    {this.state.isLoggedIn && !this.state.current_user_answer_present?
                    <div>
                        <button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#answer" align="left">
                        Answer
                        </button>
                    </div>
                    :<div></div>
                    }
                    </div>

                    <div id="answer" className="collapse">
                    <center>
                <div className="panel panel-info" style={divStyle} >
                        <div className="panel-heading">
                        {this.state.question_title}
                        </div>
                        <div className="panel-body">
                        <textarea onChange = {this.saveDescription} className="form-control" type = "textarea" name = "description" id="desc" placeholder = "Description Of your Question"  rows={10} cols={80}/>
                        </div>
                        <br/>
                    <div align = "center">
                        <button type="button" className="btn btn-primary" onClick={this.submit}>submit</button>
                    </div>  
                </div>  
                </center>
                <br/>
                <br/>
                <br/>
                <br/>
                    </div>
            </React.Fragment>
        )
    }
}
export default  withRouter(AnswerList);
