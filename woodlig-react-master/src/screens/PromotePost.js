import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';   
import { Slider, Switch,Checkbox } from 'antd';
import PostActionComponent from '../component/PostActionComponent';  
import LocationSearchComponent from '../component/LocationSearchComponent';  
import SkillComponent from '../component/SkillComponent';  
import DurationBudgetComponent from '../component/DurationBudgetComponent';  
 
const plainOptions = ['Female', 'Male', 'Other'];
const defaultCheckedList = ['Female'];
class PromotePost extends React.Component {
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')), 
            selectedPlace:[],
            selectedCategory:[],
            optionType: "",
            ageStart:"18", 
            ageEnd:"50", 
            gender: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            stepValidation:false,

        }  
        this.callBackOpenModel = this.callBackOpenModel.bind(this);
        this.callBackPlaceSelected = this.callBackPlaceSelected.bind(this);
        this.callBackCategorySelected = this.callBackCategorySelected.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onAgeAfterChange = this.onAgeAfterChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        
    } 

    componentDidMount() {  
       
    } 
    callBackOpenModel(modelType){
        this.setState({ modelType:modelType }); 
    }
    callBackPlaceSelected = ( data ) => {
        alert(JSON.stringify(data));

        var selectedPlace = this.state.selectedPlace;

        if(selectedPlace.length == 0){
            var place = [ 
                 data
            ]; 
            this.setState({
              selectedPlace:place, 
            });
        }
          
    };
    toggleOption(optionType){ 
        this.setState({optionType:optionType});
    }
    callBackCategorySelected(category){ 
        
        this.setState({selectedCategory:category});
    } 
    onAgeChange(value) {
      this.setState({ageStart:value[0]});  
      this.setState({ageEnd:value[1]}); 
    }

    onAgeAfterChange(value) {
      console.log('onAfterChange: ', value);
    }  
   
    onGenderChange = gender => {
    this.setState({
      gender,
      indeterminate: !!gender.length && gender.length < plainOptions.length,
      checkAll: gender.length === plainOptions.length,
    });
  };
     onCheckAllChange = e => {
    this.setState({
      gender: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  checkValidation(){
    const {selectedPlace,selectedCategory,ageStart,ageEnd,gender} = this.state;

    if(selectedPlace && selectedCategory && ageStart >= ageEnd,gender ){
        this.setState({stepValidation:true});
    }
     
    this.setState({stepValidation:true});
  }
    render() { 
        var  selectedPlace = this.state.selectedPlace;
        var selectedPlaceList = "";
        console.log(this.state.stepValidation);
         selectedPlaceList = selectedPlace.map((place,index)=>{ 
                    return <div className="location-address">
                            {place.address}
                            <i class="fas fa-minus-circle"></i>
                           </div>
                             ;
              }); 
             
        return (
            <div>
                {!this.state.stepValidation &&
                    <div class="promote-page">
                        <div class="promote-title-main">
                            <h2>Choose Audience</h2> 
                        </div>  
                        <div class="promote-section">
                            <div class="promote-list">
                                <div class="promote-activity">
                                    <div class="potential-approx">  
                                        <h2>0</h2>  
                                        <span>Potential audience (approx.)</span>       
                                    </div>  
                                    <div class="choose-audience-tab">
                                        <div class="potential-audience">
                                            <div class="potential-audience-btn">
                                                <button  type="button" onClick={this.toggleOption.bind(this,"location")} class="potential-btn">Location<i class="fas fa-chevron-right"></i></button>
                                            </div>
                                        </div>
                                        <div class="potential-audience">
                                            <div class="potential-audience-btn">
                                                <button  type="button" onClick={this.toggleOption.bind(this,"category")} class="potential-btn">Categories<i class="fas fa-chevron-right"></i></button>
                                            </div>
                                        </div>
                                        <div class="potential-audience">
                                            <div class="potential-audience-btn">
                                                <button  type="button" onClick={this.toggleOption.bind(this,"age")} class="potential-btn">Age<i class="fas fa-chevron-right"></i></button>
                                            </div>
                                        </div>
                                        <div class="potential-audience">
                                            <div class="potential-audience-btn">
                                                <button  type="button" onClick={this.toggleOption.bind(this,"gender")} class="potential-btn">Gender<i class="fas fa-chevron-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={this.checkValidation} class="proceed-btn">Proceed</button>
                                </div> 
                            </div>
                            <div class="choose_audience-detail">
                                { this.state.optionType == 'location' && 
                                    <div>
                                        <div class="Location-search-title">
                                            <h2>Add Location(s)</h2>
                                        </div>
                                        <div class="input-group seaarch-box">
                                            <input type="text" class="form-control border-right-0" />
                                            <span class="input-group-append">
                                                <button class="btn seaarch-btn" type="button"><i class="fas fa-search"></i></button>
                                            </span>
                                            <LocationSearchComponent callBackPlaceSelected={this.callBackPlaceSelected}/>
                                        </div>
                                
                                        <div class="select-location">
                                            <div class="select-location-title">
                                                <p>Selected location</p>
                                            </div>
                                            <div class="location-list">
                                                {selectedPlaceList} 
                                            </div>
                                        </div> 
                                    </div>
                                } 
                                { this.state.optionType == 'category' && 
                                    <div> 
                                        <SkillComponent layout="2" skillType="individual" callBackPlaceSelected = {this.callBackCategorySelected}/> 
                                    </div>
                                }
                                { this.state.optionType == 'age' && 
                                    <div class="ssearch-location">
                                            <div class="Location-search-title">
                                                <h2>Choose Age Range</h2>
                                            </div>
                                            <div class="age-range">
                                                <Slider range defaultValue={[this.state.ageStart, this.state.ageEnd]} onChange={this.onAgeChange} onAfterChange={this.onAgeAfterChange}/>
                                            </div>
                                            <div class="year-cal">
                                                <h2>{this.state.ageStart} - {this.state.ageEnd} years</h2>
                                            </div>
                                    </div>
                                }

                                { this.state.optionType == 'gender' && 
                                    <div class="ssearch-location">
                                            <div class="Location-search-title">
                                                <h2>Choose Age Range</h2>
                                            </div>
                                            <div class="age-range">
                                                <Checkbox 
                                                    onChange={this.onCheckAllChange}
                                                    checked={this.state.checkAll}
                                                  >
                                                    Select all
                                                  </Checkbox> 
                                                <Checkbox.Group
                                                  options={plainOptions}
                                                  value={this.state.gender}
                                                  onChange={this.onGenderChange}
                                                />
                                            </div>
                                            <div class="year-cal">
                                                <h2>{this.state.ageStart} - {this.state.ageEnd} years</h2>
                                            </div>
                                    </div>
                                }                      
                            </div>
                        </div>
                    </div>
                }
                {this.state.stepValidation &&
                    <div>
                    <DurationBudgetComponent promotstate={this.state}/>
                    </div>
                }
            </div>
        );
    }
} 
export default PromotePost