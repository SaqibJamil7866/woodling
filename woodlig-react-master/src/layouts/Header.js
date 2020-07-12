import React  from 'react'
import {  BrowserRouter as Router, Route,Redirect,BrowserHistory } from 'react-router-dom';
import  {AuthServices} from '../services/AuthServices';



import { Link,withRouter } from 'react-router-dom';
 
class Header extends React.Component {
	constructor(props) {
		super(props) 
	}  
    componentDidMount() {   
      /*if(!AuthServices.getUserId()){
        this.props.history.push('/login');
      } */
    }  
	render() {  
        return ( 
          
        	 <header>
              {AuthServices.isLogedIn() &&
                <div>
                  <div className="top-header">
                     <img src={require('../assets/img/Woodlig_logo_white.png')} />
                  </div> 
                  <div className="left-menu">
                      <div className="main-user-profile">
                         
                              { AuthServices.getUserProfileImage() &&
                                 <Link to={'/'}>
                                <img src={ AuthServices.getUserProfileImage()} alt="Avatar" className="avatar" />
                                </Link>
                              }
                              { !AuthServices.getUserProfileImage() &&
                                <Link to={'/'}>
                               <img src={require('../assets/img/img_avatar.png')} alt="Avatar" className="avatar" />
                                </Link>
                              } 
                      </div>
                      <div className="main-manu"> 
                          <Link to={'/'} ><img src={require('../assets/img/home-alt.png')} alt="Avatar" className="" /></Link>
                          <Link to={'/settings'}><img src={require('../assets/img/fire.png')} alt="Avatar" className="" /></Link> 
                          <Link to={'/settings'}><img src={require('../assets/img/Casting Calls Icon.png')} alt="Avatar" className="" /></Link>
                          <Link to={'/settings'}><img src={require('../assets/img/user-search.png')} alt="Avatar" className="" /></Link>
                          <Link to={'/settings'}><img src={require('../assets/img/marketplace.png')} alt="Avatar" className="" /></Link> 
                      </div>
                      <div className="setting-menu">
                          <Link to={'/settings'}><img src={require('../assets/img/envelope1.png')} alt="Avatar" className="" /></Link>
                          <Link to={'/settings'}><img src={require('../assets/img/bell.png')} alt="Avatar" className="" /></Link>
                          <Link to={'/settings'}> <img src={require('../assets/img/cog.png')} alt="Avatar" className="" /> </Link>
                           <Link to={'/settings'}><img src={require('../assets/img/ellipsis-h-alt.png')} alt="Avatar" className="" /></Link>
                          <Link to={'/settings'}> <img src={require('../assets/img/Path_1309.png')} alt="Avatar" className="" /></Link>
                      </div>      
                 </div>
                </div> 
              }
        	 </header> 
        );
    }    
}
 
export default  withRouter(Header)
