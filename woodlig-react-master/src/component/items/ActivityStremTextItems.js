import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
 

class ActivityStremTextItems extends React.Component {
    constructor(props){  
        super(props);
        this.state = { 
            activity:[], 
        }  
        
    } 

    componentDidMount() {  
        this.setState({  activity:this.props.activity})
    } 
      
    render() { 
         const activity = this.state;
        return (
             <div>
                <h1>Hello </h1>
             </div>
        );
    }
} 
export default ActivityStremTextItems