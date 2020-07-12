import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';   
import { AreaChart, BarChart, PieChart, LinearGauge } from "reaviz";
import  {promotionService} from '../services/promotionService'; 
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {Config} from '../services/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CastingCalls extends React.Component {
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            
        }  
       
        
    } 

    render() { 
        return (
            <div className="cacsting-call-page">
            	<ToastContainer />  
            	<div className="page">
					<div className="find-talents">
						<div className="container">
							<div className="find-talents-contain">
								<h2>Casting Calls</h2>
								<p>Search openings and</p>
								<p>Identify exciting openings and opportunities. Take it! </p>
								<form className="example find-talents-form" action="/action_page.php">
								  <i className="fas fa-search"></i>
								  <input type="text" placeholder="Search Casting Calls" name="search" />
								  <button type="submit">Search</button>
								</form>
								<p>Trending searches: commercials, runway modelling, acting, competitions</p>
							</div>
						</div>
					</div>
					<div className="casting-call">
						<div className="container">
							<div className="row">
								<div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
									<div className="casting-call-section">
										<div className="my-post">
											<ul>
												<li>
													<div className="my-post-btn">
														<div className="my-post-job-btn">
															<span>0</span>
															<button href="" className="post-btn">View All<i className="fas fa-chevron-right"></i></button>
														</div>
														<div className="my-post-detail">
															<h2>My Posted Jobs</h2>
															<p>You have 0 casting calls posted</p>
														</div>
													</div>
												</li>
												<li>
													<div className="my-post-btn">
														<div className="my-post-job-btn">
															<span>3</span>
															<button href="" className="post-btn">View All<i className="fas fa-chevron-right"></i></button>
														</div>
														<div className="my-post-detail">
															<h2>My Submissions</h2>
															<p>You've sent an application to 3 Casting Calls</p>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div className="call-casting-list">
											<div className="posted-call-casting">
												<div className="posted-call-casting-title">
													<div className="posted-call-title">
														<h2>CLOSEUP: MAGIC BREATH</h2>
													</div>
													<div className="role-casting-title">
														<p>ROLE(S): 2</p>
													</div>
												</div>
												<div className="posted-call-detail">
													<div className="talent-application-btn">
														<button href="" className="btn tallent-btn">Actor</button>
													</div>
													<div className="posted-call-dec">
														<p>Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brand's progressive and forward thinking values...</p	>
													</div>
													<div className="posted-call-footer">
														<div className="posted-call-country">
															<a href="">Worldwide</a>
														</div>
														<div className="posted-call-commercial">
															<a href="">Commercial</a>
														</div>
														<div className="posted-call-active">
															<a href="">ACTIVE</a>
														</div>
													</div>
												</div>	
											</div>
											<div className="posted-call-casting">
												<div className="posted-call-casting-title">
													<div className="posted-call-title">
														<h2>CLOSEUP: MAGIC BREATH</h2>
													</div>
													<div className="role-casting-title">
														<p>ROLE(S): 3</p>
													</div>
												</div>
												<div className="posted-call-detail">
													<div className="talent-application-btn">
														<button href="" className="btn tallent-btn">Actor</button>
													</div>
													<div className="posted-call-dec">
														<p>Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brand's progressive and forward thinking values...</p	>
													</div>
													<div className="posted-call-footer">
														<div className="posted-call-country">
															<a href="">Worldwide</a>
														</div>
														<div className="posted-call-commercial">
															<a href="">Commercial</a>
														</div>
														<div className="posted-call-active">
															<a href="">ACTIVE</a>
														</div>
													</div>
												</div>	
											</div>
											<div className="posted-call-casting">
												<div className="posted-call-casting-title">
													<div className="posted-call-title">
														<h2>CLOSEUP: MAGIC BREATH</h2>
													</div>
													<div className="role-casting-title">
														<p>ROLE(S): 1</p>
													</div>
												</div>
												<div className="posted-call-detail">
													<div className="talent-application-btn">
														<button href="" className="btn tallent-btn">Actor</button>
													</div>
													<div className="posted-call-dec">
														<p>Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brand's progressive and forward thinking values...</p	>
													</div>
													<div className="posted-call-footer">
														<div className="posted-call-country">
															<a href="">Worldwide</a>
														</div>
														<div className="posted-call-commercial">
															<a href="">Commercial</a>
														</div>
														<div className="posted-call-active">
															<a href="">ACTIVE</a>
														</div>
													</div>
												</div>	
											</div>							
										</div>
									</div>
								</div>
								<div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
									<div className="casting-call-sidebar">
										<div className="filter-call">
											<div className="filter-call-title">
												<h2>Filters</h2>
												<div className="location-drop">
													<select>
													  <option value="location">location:</option>
													  <option value="india">india</option>	
													</select>
													<span>India</span>
												</div>
												<div className="product-type-drop">
													<select>
													  <option value="product-type">Product type:</option>
													  <option value="india">abc</option>
													</select>
												</div>
												<div className="age">
													<img src="img/age.png" />
												</div>
												<div className="gender-side">
													<p>Gender</p>
													<label className="gender-label">All/Any
													  <input type="radio" checked="checked" name="radio" />
													  <span className="gender-checkmark"></span>
													</label>
													<label className="gender-label">Female
													  <input type="radio" name="radio" />
													  <span className="gender-checkmark"></span>
													</label>
													<label className="gender-label">Male
													  <input type="radio" name="radio" />
													  <span className="gender-checkmark"></span>
													</label>
													<label className="gender-label">Rather Not Say
													  <input type="radio" name="radio" />
													  <span className="gender-checkmark"></span>
													</label>
												</div>
												<div className="role-side">
													<select>
													  <option value="product-type">Role:</option>
													  <option value="india">abc</option>
													</select>
												</div>
												<div className="role-side">
													<select>
													  <option value="product-type">Role Tyoe:</option>
													  <option value="india">abc</option>
													</select>
												</div>
												<div className="apply-filter">
													<button href="" className="apply-btn">Apply Filter</button>
												</div>
											</div>
										</div>
										<div className="filter-call-calender">
											<img src="img/calender.png" />
										</div>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
            	
            </div>
        );
    }
} 
export default CastingCalls