/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ToastsStore } from 'react-toasts';
import {AuthService} from '../../services/AuthService';

class SkillSelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            skillsList:[],
            suggestionSkillsList:[],
            skillLoad:false,
            openSkillBox:false,
            selectedOption: null,
            skill_key:'',
            selectedSkills:[],
            layout: this.props.layout
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleSearchSkill = this.handleSearchSkill.bind(this);
        this.handleOpenClick = this.handleOpenClick.bind(this);
    }

    componentDidMount() {  
       this.getAllSkilss(); 
    } 
   
    getAllSkilss(){
        AuthService.getSkills(this.props.skillType).then((res)=>{
            if(res.data.status !== 'error'){
                this.setState(
                    {skillsList: res.data.data, skillLoad:true}
                ); 
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e)) 
    }

    handleChange(e){
        const { name, value } = e.target;
    }

    handleSearchSkill(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }); 
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({ submitted: true });
        const { email, password } = this.state; 
    } 

    openSkillBox(){

        let status = true;
        if(this.state.openSkillBox){
            status = false;
        }
        this.setState({openSkillBox:status});
    }

    handleSearchSkill(e){debugger
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
        if(this.state.layout === 2){
          this.setState({openSkillBox:false});
        }
        setTimeout(
                function(){debugger
                    let skillsList = this.state.skillsList;
                    const selectedSkills = this.state.selectedSkills;
                    const difference = skillsList.filter(x => !selectedSkills.includes(x));

                    this.setState({  
                    skillsList: difference, 
                    });
                    this.props.callBackPlaceSelected(this.state.selectedSkills);
                }
                .bind(this),
                100
            );
        
    }
    
    handleRemoveSkill(skill){debugger
        let selectedSkills = this.state.selectedSkills; 
        let skillsList = this.state.skillsList;
        selectedSkills.pop(skill);
        skillsList.push(skill);
        this.sendDataToParant(selectedSkills);
        this.setState({  
          selectedSkills: selectedSkills, 
          skillsList: skillsList, 
        });
    }

    sendDataToParant(selectedSkills){debugger
        let indents = [];
        let selectedSkill = selectedSkills.map((skill,index)=>{ 
            return indents.push(skill.id);
        });
      console.log("selectedSkills",indents);  
      this.props.callBackPlaceSelected(indents);    
    }
    
    handleOpenClick(){debugger
      this.setState({openSkillBox:true});
    } 
     
     
    render(){
        const { skillsList, selectedSkills, layout, openSkillBox, skill_key } = this.state;
        let skillItems='';
        let selectedSkill = '';
        let lastSelectedList = ''; 
        let lastSelected = selectedSkills; 
        if(selectedSkills.length > 2) {
            lastSelected = lastSelected.slice(-2);
        }
        console.log("skillList: ", skillsList);
        skillItems = skillsList.map((skill, index)=>{
            return(
                <div key={index}>
                    <div onClick={this.handleSkillSelect.bind(this,skill)}>{skill.name}</div>
                </div>
            )
        });

        if(!layout){
            selectedSkill = selectedSkills.map((skill, index)=>{ 
                return(
                    <div key={index} className="selected-skill-name">
                        <div onClick={this.handleRemoveSkill.bind(this,skill)}>{skill.name}</div>
                    </div>
                )
            });
        }

        if(layout === 2){
            selectedSkill = selectedSkills.map((skill, index)=>{ 
                return(
                    <div key={index} className="location-address">
                        {skill.name}
                        <i className="fa fa-minus-circle" onClick={this.handleRemoveSkill.bind(this,skill)} />
                    </div>
                )
            });
        }

        lastSelectedList = lastSelected.map((skill, index)=>{ 
            return(
                <div key={index}>
                    {skill.name}
                </div>
            )
        });

        return (
            <div>
                { !layout &&
                    <div>
                        <div className="">
                            <div className="form-control" onClick={this.openSkillBox.bind(this)}>
                            {selectedSkills.length === 0 &&   <span>Choose a Skill</span> }
                            
                            {lastSelectedList}
                            {selectedSkills.length > 2 && 
                                <div>
                                    <span>...</span>
                                    <span>{selectedSkills.length}</span>
                                </div>
                            }

                            </div>
                            {
                                openSkillBox &&
                                <div className="search-skill">
                                    <input type="text" name="skill_key" value={skill_key} onChange={this.handleSearchSkill} />
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

                {layout === 2 &&
                    <div>
                        <div className="">
                            <div className="Location-search-title">
                                <h2>Select Categories</h2>
                            </div>
                            <div className="input-group seaarch-box">
                                <input className="form-control border-right-0" placeholder="Search" name="skill_key" value={this.state.skill_key} onChange={this.handleSearchSkill} onClick={this.handleOpenClick}/>
                                <span className="input-group-append">
                                    <button className="btn seaarch-btn" type="button" ><i className="fa fa-search" /></button>
                                </span> 
                            </div>
                            {openSkillBox &&
                                <div className="search-skill-list">  
                                    {skillItems}  
                                </div>
                            }
                        </div> 
                        <div className="select-location">
                            <div className="select-location-title">
                                <p>Selected Categories</p>
                            </div>
                            <div className="location-list">
                                {selectedSkill} 
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
 
export default SkillSelectComponent