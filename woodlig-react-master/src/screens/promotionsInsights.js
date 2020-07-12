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

class promotionsInsights extends React.Component {
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            promotionsInsdata:[],
            pageLoading:false,
            reachChart:[],
            viewChart:[],
            genderChart:[],
        }  
       
        
    } 

    componentDidMount() {  
       this.getPromotionsInsights();
    } 

    getPromotionStatus( parma ) {  
       if( parma == 'push' ){
       		promotionService.updatePromotionStatus('promotion_id=35&user_id=1&pause_promotion=1').then(async (result) => {
	           toast.success( 'Promotion push successfully!' );
	        });
       }
       if( parma == 'terminate' ){
       		promotionService.updatePromotionStatus('promotion_id=35&user_id=1&terminate_promotion=1').then(async (result) => {
	           toast.success( 'Promotion terminate successfully!' );
	        });
       }
       if( parma == 'delete' ){
       		promotionService.updatePromotionStatus('promotion_id=77&user_id=1&delete_promotion=1').then(async (result) => {
	           toast.success( 'Promotion delete successfully!' );
	        });
       }
    } 

    getPromotionsInsights() {
    	try{  
    		promotionService.fetchPromotionInsights().then(async (result) => {
	            if(result.data){  
	            	// console.log("data",result.data.posts_data.id);
	               

	                var reachChartRec = [];
				    if( result.data.reach_data ){
				    	result.data.reach_data.map((val,key)=>{ 
			           		var temp_reach_data = {  key: val.date, data: val.count };
			           		reachChartRec.push(temp_reach_data);
			           	}); 
				    }

	                var viewChartRec = [];
				    if( result.data.views_data ){
				    	result.data.views_data.map((val,key)=>{ 
			           		var temp_view_data = {  key: new Date(val.date), data: val.count };
			           		viewChartRec.push(temp_view_data);
			           	}); 
				    }

	                var genderChartRec = [];
				    if( result.data.gender_analytics ){
				    	result.data.gender_analytics.map((val,key)=>{ 
			           		var temp_gender_data = {  key: val.gender, data: val.percentage };
			           		genderChartRec.push(temp_gender_data);
			           	}); 
				    }
	
				    this.setState(
	                  {promotionsInsdata: result.data,pageLoading:true, reachChart: reachChartRec, viewChart: viewChartRec, genderChart:genderChartRec }
	                ); 

                }else {
                    // console.log(result);       
                } 
	        });

    	} catch(e)	{
    		console.log('error', e);
              alert("jhere");
    	}
    }

    render() { 
    	const {promotionsInsdata} = this.state;
    	var post_data = promotionsInsdata.posts_data;

    	/*Categorys*/
    	var categoriesData = promotionsInsdata.category_analytics;
    	var catHtml = '';
    	if(categoriesData){ 
	    	var arraCnt = categoriesData.length;
	    	for (var i = 0; i < arraCnt; i++) {
	    		// console.log(categoriesData[i]);
		        catHtml += '<p>'+categoriesData[i].skill+'   - '+Math.round(categoriesData[i].percentage)+'%</p>';
		    }
	    }
		
		/* Age & Location */    	
		var agelocation = promotionsInsdata.location_analytics;
    	var agetLocHtml = '';
    	if(agelocation){ 
	    	var ageArraCnt = agelocation.length;
	    	for (var i = 0; i < ageArraCnt; i++) {
		        agetLocHtml += '<p>'+agelocation[i].location+'   - '+Math.round(agelocation[i].percentage)+'%</p>';
		     }
	    }

	    /*For Age & Location Chart*/
	    var age_groups = promotionsInsdata.age_group_analytics;
	    var ageGroups = Object.assign({}, age_groups);
	    if( age_groups ){ 
	       var a_gChart = '';
           a_gChart = promotionsInsdata.age_group_analytics.map((val,key)=>{ 
           		return <div className="sinlg-chart-bx">
							<strong>{val.age}</strong>
							<LinearGauge
							    height={10}
							    width={500}
							    data={{ key: 'Risk Score', data: val.age }}
							  />
						</div>;
           	}); 
       }
    	

        return (
            <div>
            	<ToastContainer />  
            	<div className="Insights-page">
					<div className="insights-title">
						<h2>Insights</h2>
						<img src={require('../assets/img/analytics.png')} />
					</div>
					{!this.state.pageLoading && 
		                <div className="d-flex justify-content-center align-items-center" style={{ height:"400px" }}><Loader
		                       type="Oval"
		                       color="#f76b4c"
		                       height={80}
		                       width={80} 
		                /></div>
	                }
	                {this.state.pageLoading && 	
					<div className="status-section">
						<div className="status-count">
							<div className="status-activity">
								<div className="status-title">
									<h2>Status</h2>
								</div>
								<div className="status-list">
									<div className="status-box">
										<p>Elapserd</p>
										<h2>{promotionsInsdata.elapsed_date} days</h2>
									</div>
									<div className="status-box">
										<p>Remaining time</p>
										<h2>{promotionsInsdata.remaining_days} days</h2>
									</div>
									<div className="status-box spent">
										<p>Spent</p>
										<h2>${promotionsInsdata.spent}</h2>
										<span>of your $12.05 USD budget</span>
									</div>
									<div className="status-box active-status">
										<p>Promotion Status</p>
										<h2>{promotionsInsdata.promotion_status}</h2>
									</div>
								</div>	
							</div>
							<div className="status-action">
								<div className="action-title">
									<h2>Action</h2>
								</div>
								<div className="action-list">
									<a href="javascript:void(0);" onClick={this.getPromotionStatus.bind(this, 'push')} className="pause-promotion">Pause Promotion</a>
									<a href="javascript:void(0);" onClick={this.getPromotionStatus.bind(this, 'terminate')} className="terminate-promotion">Terminate Promotion</a>
									<a href="javascript:void(0);"  onClick={this.getPromotionStatus.bind(this, 'delete')} className="delete-promotion">Delete Promotion</a>
								</div>	
							</div>
						</div>
						<div className="status-detail">
							<div className="status-full-detail">
								<div className="card status-card">
									<div className="avatar-user">
										<img src={require('../assets/img/img_avatar.png')} alt="Avatar" className="avatar" />
										<div className="article-title ml-2">
											@mayur_patel
										</div>
									</div>
									<div className="status-img">
										<img src={Config.SITE_URL+post_data.path} style={{"width" : "100%"}} />
									</div>
									<div className="view-original-post-btn">
										<button href="" className="view-original-post">View Original Post<i className="fas fa-arrow-right"></i></button>
									</div>
									<div className="impression">
										<div className="impression-title">
											<h2>impressions</h2>
											<span className="impression-count">{ promotionsInsdata.impressions.toLocaleString(undefined, {maximumFractionDigits:2}) }</span>
										</div>	
										<div className="impression-like-share">
											<a href="" className="impressions-like">
												<i className="far fa-heart"></i>
												<p>{promotionsInsdata.promotion_like}</p>
											</a>
											<a href="" className="impressions-share">
												<i className="fas fa-share-alt"></i>
												<p>{promotionsInsdata.shares_count}</p>
											</a>
											<a href="" className="impressions-link">
												<i className="fas fa-link"></i>
												<p>109</p>
											</a>
										</div>
										<div className="view-chart">
											<div className="impression-title">
												<h2>View</h2>
												<span className="impression-count">{promotionsInsdata.views_count.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
											</div>
											<div className="chart-view">
												<AreaChart
												    height={300}
												    width={500}
												    data={this.state.viewChart}
												  />
											</div>
										</div>
										<div className="Reach-chart">
											<div className="impression-title">
												<h2>Reach</h2>
												<span className="impression-count">{promotionsInsdata.reach_count.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
											</div>
											<div className="chart-Reach">
												<BarChart
												    height={300}
												    width={500}
												    data={this.state.reachChart}
												  />
											</div>
										</div>
										<div className="gender-chart">
											<div className="impression-title">
												<h2>Gender</h2>
											</div>
											<div className="chart-gender">
												<PieChart
												    height={300}
												    width={500}
												    data={this.state.genderChart}
												  />
											</div>
										</div>
										<div className="age-chart">
											<div className="impression-title">
												<h2>Age & Location</h2>
											</div>
											<div className="chart-age">
												{a_gChart}
											</div>
										</div>
										<div className="top-five">
											<div className="top-five-title">
												<p>Top 5</p>
											</div>
											<div className="top-five-detail">
												<div dangerouslySetInnerHTML={{__html: agetLocHtml}} />
											</div>
											<div className="category-detail">
												<h2>Categories</h2>
												<div dangerouslySetInnerHTML={{__html: catHtml}} />
											</div>
										</div>	
									</div>
								</div>
							</div>
						</div>
					</div>
					}

				</div>
            </div>
        );
    }
} 
export default promotionsInsights