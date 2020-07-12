import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';

import  {ValidationHelper} from '../helper/ValidationHelper';
import  {SkillServices} from '../services/SkillServices'; 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class SkillComponent extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.logout();

        this.state = { 
            skillsList:[],
            suggestionSkillsList:[],
            skillLoad:false,
            openSkillBox:false,
            selectedOption: null,
            skill_key:'',
            selectedSkills:[],
            isIndividual: this.props.skillType,
            layout: this.props.layout
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleSearchSkill = this.handleSearchSkill.bind(this);
        this.handleOpenClick = this.handleOpenClick.bind(this);
        //this.handleSkillSelect = this.handleSkillSelect.bind(this);
    }

    componentDidMount() {  
        alert(this.props.skillType);
       this.getAllSkilss(); 
    } 
   
    handleChange(e) {
        const { name, value } = e.target;
        //this.setState({ [name]: value });

        
    }
    handleSearchSkill(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }); 
    }
     

    getAllSkilss(){
      try{  
          SkillServices.getSkills(this.state.isIndividual).then(async (result) => {
             if(result.status){ 
                 
                  this.setState(
                    {skillsList: result.data ,skillLoad:true}
                  ); 
                    
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("jhere");
      }  
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({ submitted: true });
        const { email, password } = this.state; 
    } 

    openSkillBox(){
     
      var status = true;
      if(this.state.openSkillBox){
        status = false;
      }
       this.setState({openSkillBox:status});
    }

    handleSearchSkill(e){
       const { name, value } = e.target;
        this.setState({ [name]: value }); 
        if(value != ''){
          this.handleSearch(value);
        }else{
          this.getAllSkilss(); 
           setTimeout(
                function() {
                    const { skillsList, selectedSkills  } = this.state;  
                    let difference = skillsList.filter(item => !this.state.selectedSkills.some(item2 => item.name === item2.name));
                     this.setState({skillsList: difference});
                }
                .bind(this),
                1000
            );
        } 
    }  
   /* // array search 
    handleCheck(val) {
      return this.state.selectedSkills.some(item => val.name === item.name);
    }*/
    handleSearch(text) {
       const data = this.state.skillsList;
       this.setState({searchField: text});
       const search = [];
       // console.log(text);
       const regexp1 = new RegExp(`${text}`, 'gi');
       data.forEach(e => {
         if (regexp1.test(e.name) === true) {
           search.push(e);
         }
       });
       // this.setState({ searchedData: search });

       this.setState({skillsList: search});
     }
    handleSkillSelect(skill){
      // const { name, value } = e.target;
         
        var selectedSkills = this.state.selectedSkills; 
        selectedSkills.push(skill);
       
        this.setState({  
          selectedSkills: selectedSkills, 
        });
        this.sendDataToParant(selectedSkills);
        if(this.state.layout == 2){
          this.setState({openSkillBox:false});
        }
        setTimeout(
                function() {
                    var skillsList = this.state.skillsList;
                    var selectedSkills = this.state.selectedSkills;
                     let difference = skillsList.filter(x => !selectedSkills.includes(x));

                      this.setState({  
                        skillsList: difference, 
                      });
                      this.props.callBackPlaceSelected(this.state.selectedSkills);
                }
                .bind(this),
                100
            );
        
    }
    handleRemoveSkill(skill){
      // const { name, value } = e.target;
         
        var selectedSkills = this.state.selectedSkills; 
        var skillsList = this.state.skillsList;
        selectedSkills.pop(skill);
        skillsList.push(skill);
        this.sendDataToParant(selectedSkills);
        this.setState({  
          selectedSkills: selectedSkills, 
          skillsList: skillsList, 
        });
         
        
    }

    sendDataToParant(selectedSkills){ 
      var indents = []; 
       var selectedSkill = selectedSkills.map((skill,index)=>{ 
                    return   indents.push(skill.id);
              });  
      console.log("selectedSkills",indents);  
      this.props.callBackPlaceSelected(indents);    
    }
    
    handleOpenClick(){
      this.setState({openSkillBox:true});
    } 
     
     
    render() {
         const { skillsList, selectedSkills } = this.state;
        
          
         var skillItems='';
         var selectedSkill = '';
         var lastSelectedList = ''; 
         var lastSelected = selectedSkills; 
         if(selectedSkills.length > 2) {
            lastSelected = lastSelected.slice(-2);
         }
         skillItems = skillsList.map((skill,index)=>{ 
                    return   <div>
                                  <div onClick={this.handleSkillSelect.bind(this,skill)}>{skill.name}</div>
                              </div>;
              }); 
          if(!this.state.layout){
            selectedSkill = selectedSkills.map((skill,index)=>{ 
                    return   <div className="selected-skill-name">
                                 <div onClick={this.handleRemoveSkill.bind(this,skill)}>{skill.name}</div>
                              </div>;
              });
          }

          if(this.state.layout == 2){
            selectedSkill = selectedSkills.map((skill,index)=>{ 
                    return <div className="location-address">
                            {skill.name}
                            <i class="fas fa-minus-circle" onClick={this.handleRemoveSkill.bind(this,skill)}></i>
                           </div>
                             ;
              });
          }           
        lastSelectedList = lastSelected.map((skill,index)=>{ 
                    
                    return   <div>
                                  {skill.name}
                              </div>;
                              
              });
        return (
            <div> 
            { !this.state.layout &&
              <div>
                <div className="skill-component">
                    <div className="form-control" onClick={this.openSkillBox.bind(this)}>
                      {selectedSkills.length == 0 &&   <span>Choose a Skill</span> }
                    
                      {lastSelectedList}
                      {selectedSkills.length > 2 && 
                          <div>
                              <span>...</span>
                              <span>{selectedSkills.length}</span>
                          </div>

                      }
                    </div>
                     {
                        this.state.openSkillBox &&
                          <div className="search-skill">
                              <input type="text" name="skill_key" value={this.state.skill_key} onChange={this.handleSearchSkill} />
                              <div> 
                                  <div style={{ borderBottom:"1px solid #ccc" }}>
                                  {selectedSkill} 
                                  </div> 
                                   {skillItems}  
                              </div>
                             
                          </div>
                      }
                </div>
              </div>
            }

            { this.state.layout == 2 &&
              <div>
                <div class="ssearch-location">
                  <div class="Location-search-title">
                    <h2>Select Categories</h2>
                  </div>
                   <div class="input-group seaarch-box">
                        <input class="form-control border-right-0" placeholder="Search" name="skill_key" value={this.state.skill_key} onChange={this.handleSearchSkill} onClick={this.handleOpenClick}/>
                        <span class="input-group-append">
                            <button class="btn seaarch-btn" type="button"><i class="fas fa-search"></i></button>
                        </span> 
                    </div>
                     {
                          this.state.openSkillBox &&
                            <div className="search-skill-list">  
                              {skillItems}  
                            </div>
                         }
                </div> 
                <div class="select-location">
                  <div class="select-location-title">
                                <p>Selected Categories</p>
                              </div>
                  <div class="location-list">
                    {selectedSkill} 
                  </div>
                </div> 
              </div>
            }
          </div>  
        );
    }
}
 
export default SkillComponent