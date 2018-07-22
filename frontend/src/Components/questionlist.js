import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles/head.css';

class QuestionList extends Component{
    state={
        QuestionList:[],
        questions_url:this.props.questions_url,
        page_no:1,
        prev_page_url:null,
        nextpage_url:null,
    };


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
    

    componentDidUpdate(prevProps,PrevState){
        if(prevProps.location.search!==this.props.location.search||PrevState.page_no!==this.state.page_no){
            //console.log(this.state.questions_url+this.props.location.search+"&page="+this.state.page_no);
            if(this.props.location.search!=null)
            {
            var search=this.props.location.search.slice(1,);
            }
            fetch(this.state.questions_url+"?page="+this.state.page_no+"&"+search)
            .then(response => response.json())
            .then(responseJson => {
            this.setState({ QuestionList : responseJson.results});
            this.setState({nextpage_url:responseJson.next});
            this.setState({prev_page_url:responseJson.previous});
            console.log(this.state.nextpage_url);
            console.log(this.state.prev_page_url);
            console.log(this.state.QuestionList);
            })
            .catch(e => {console.log (e);
            });
    }

    }
    
    
    componentDidMount(){
        //console.log(this.state.questions_url+this.props.location.search+"&page="+this.state.page_no);
        if(this.props.location.search!=null)
        {
            var search=this.props.location.search.slice(1,);
        }
        fetch(this.state.questions_url+"?page="+this.state.page_no+"&"+search)
        .then(response => response.json())
        .then(responseJson => {
        this.setState({ QuestionList : responseJson.results});
        this.setState({nextpage_url:responseJson.next});
        this.setState({prev_page_url:responseJson.previous});
        console.log(this.state.nextpage_url);
        console.log(this.state.prev_page_url);
        console.log(this.state.QuestionList);
        })
        .catch(e => {console.log (e);
        });
    }

    render(){
        const divStyle={width:"70%"};
        const dateStyle={fontSize:10,color:"green"};
                return(
            <React.Fragment>
                    <div>
                    <legend  align = "center">Questions</legend>
                    <div align="center">
                        &nbsp;&nbsp;&nbsp;
                        <span><button className="btn btn-default btn-sm" onClick={this.prevPage.bind(this)}>prev</button></span>
                        &nbsp;&nbsp;&nbsp;
                        <span><button className="btn btn-default btn-sm" onClick={this.nextPage.bind(this)}>next</button></span>
                    </div>
                    <br/>
                    {this.state.QuestionList.map(item => (
                        <center>
                        <div className="panel panel-info" style={divStyle} >
                        <div className="panel-heading">
                        <Link to={'/answers/'+item.id+'/'}>{item.title}</Link>
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
                            <div className="col-sm-4"></div>
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
            </React.Fragment>
        )
    }
}
export default QuestionList;
