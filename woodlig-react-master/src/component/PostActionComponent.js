import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';

import  {ValidationHelper} from '../helper/ValidationHelper';
import  {SkillServices} from '../services/SkillServices';  

class PostActionComponent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            
        }; 
        
    }

    componentDidMount() {  
        
    }  
    handleClick(action){ 
    	this.props.callBackOpenModel(action);   
    } 
    render() { 
        return (  
 				<div className="home-top-option">
                    <div className="content">
                        <p>What are you up to?</p>
                    </div>
                    <div className="cart-option">
                        <i className="far fa-image"  data-toggle="modal" data-target="#postImageModal"  onClick={this.handleClick.bind(this,"image_post")}></i>
                        <i className="fa fa-video"  data-toggle="modal" data-target="#postVideoModal" onClick={this.handleClick.bind(this,"video_post")}></i>
                        <i className="fas fa-shopping-cart" data-toggle="modal" data-target="#postScriptModal"></i> 
                        <i className="far fa-calendar-alt"  data-toggle="modal" data-target="#postEventModal"></i>
                        <i className="fas fa-shopping-cart"  data-toggle="modal" data-target="#postSellModal"></i>
                    </div>
                </div> 
        );
    }
}
 
export default PostActionComponent