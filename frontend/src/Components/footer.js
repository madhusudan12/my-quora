import React,{ Component } from 'react';
import './styles/foot.css';
class Footer extends Component{

    render(){
        return(
            <div>
                <div >
                <hr/>
                <footer className="foot-style">
                    <br/>
                    <div className="container text-center text-md-left">
                        <div className="row text-center text-md-left mt-3 pb-3">
                             <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Quora</h6>
                                <p>Platform where you can question and answer about the known and unkown things for different
                                    communities.</p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Features</h6>
                                <p>
                                    <a href="#!" className="link-style">Ask Questions</a>
                                </p>
                                 <p>
                                    <a href="#!" className="link-style">Answer Questions</a>
                                </p>
                                <p>
                                    <a href="#!" className="link-style">UpVote Answers</a>
                                </p>
                                <p>
                                    <a href="#!" className="link-style">Rating</a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                                <p>
                                    <a href="https://www.stackoverflow.com/" className="link-style" >StackOverFlow</a>
                                </p>
                                <p>
                                    <a href="https://www.quora.com/" className="link-style">Quora</a>
                                </p>
                                <p>
                                    <a href="https://www.stackexchange.com/" className="link-style">StackExchange</a>
                                </p>
                                <p>
                                    <a href="https://www.stackoverflow.com/" className="link-style">Help</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                <p>
                                    <i className="fa fa-home mr-3"></i> Hyderabad, HYD 500001, IN
                                </p>
                                <p>
                                    <i className="fa fa-envelope mr-3"></i> k.madhusudan12@gmail.com
                                </p>
                                <p>
                                    <i className="fa fa-phone mr-3"></i> + 91 951 563 6399
                                </p>
                                <p>
                                    <i className="fa fa-print mr-3"></i> + 01 234 567 89
                                </p>
                            </div>
                        </div>
                        <hr/>
                        <div className="row d-flex align-items-center">
                            <div className="col-md-7 col-lg-8">
                                <p className="text-center text-md-left">© 2018 Copyright:
                                    <a href="/" className="link-style">
                                        <strong>Exchange</strong>
                                    </a>
                                </p>
                            </div>
                            <div className="col-md-5 col-lg-4 ml-lg-0">
                                <div className="text-center text-md-right">
                                    <ul className="list-unstyled list-inline">
                                        <li className="list-inline-item">
                                            <a className="link-style" href="https://www.facebook.com/madhusudanchowdary.12">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="link-style" href="https://www.twitter.com/KMadhusudan12">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="link-style" href="https://www.github.com/madhusudan12">
                                                <i className="fa fa-github"></i>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="link-style" href="https://www.linkedin.com/in/madhusudan-chowdary-a07584110">
                                                <i className="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                </div>
                </div>

        )
    }

}

export default Footer;