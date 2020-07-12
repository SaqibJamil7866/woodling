import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class AddFundsModel extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.logout();

        this.state = { 
             amount: 10000,
             modalOpen:this.props.modelOpen,
        };

        this.handleChange = this.handleChange.bind(this);
        this.addFunds = this.addFunds.bind(this);
        this.closeModel = this.closeModel.bind(this);
        
    }

    componentDidMount() {  
       
    } 
   
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }); 
    }
    addFunds(){ 
      this.props.sendFund(this.state.amount);
      this.closeModel();
    }
    closeModel(){
       this.setState({modalOpen:false});
       this.props.modelClose();
    }
    
    render() {
          
        return (
              <div className={`modal-wrep ${!this.state.modalOpen ? 'hide-payment-modal' : ''}`} >
                  <div className="add-funds">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header funds-header">      
                            <button type="button" onClick={this.closeModel.bind(this)}  class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div class="modal-body"> 
                            <div class="funds-form">
                              <div class="form-group">
                                <input type="text" name="amount" value={this.state.amount} class="form-control funds-add" onChange={this.handleChange} />
                              </div>
                              <button  class="add-fund-btnt" onClick={this.addFunds}><i class="fas fa-fingerprint"></i>Add Funds</button>
                            </div>
                          </div>
                        </div>   
                      </div> 
                    </div>
              </div>      
        );
    }
}
 
export default AddFundsModel