/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, {Component} from 'react';
import { Card } from 'react-bootstrap';
import { ToastsStore } from 'react-toasts';
import convertToFloat from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';
import RatingStar from './rating-stars.component';
import { showLoader, hideLoader } from '../../public/loader';
import { TalentService } from '../../services/TalentService';

class TalentCard extends Component {
    constructor(props){
        super(props);
        this.state = {starLiked: false}
    }

    liked = () => {
        showLoader();
        TalentService.starTalent(this.props.talent.id).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                this.setState({starLiked: true});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
    }

    unLike = () => {
        showLoader();
        TalentService.unstarTalent(this.props.talent.id).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                this.setState({starLiked: false});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
    }
    
    render() {
        const { talent: { username, full_name, profile_thumb, rating } } = this.props;
        return(
            <div className='f-left mt10 ml10'>
                <Card style={{ width: '19rem', borderRadius: '10px', minHeight:'310px', maxHeight:'310px' }}>
                    <Card.Img variant="top" src={require('../../assets/card-background.svg')} />
                    <div className='center__item dir-col m-50 p-relative'>
                        <Card.Img className='border-radius60 w35' src={siteUrl+""+profile_thumb} />
                        <RatingStar rating={convertToFloat(rating)} />
                            <Card.Title><b>{full_name}</b></Card.Title>
                        <i onClick={this.state.starLiked === false ? this.liked : this.unLike} className={this.state.starLiked ? "fa fa-star p-absolute star clr__red" : "fa fa-star-o p-absolute star"} />
                    </div>
                    <Card.Body>
                        <div className='center__item dir-col'>
                            <Card.Text className='clr-grey'>
                                <b>@{username}</b>
                            </Card.Text>
                            {/* <Card.Text className='clr-grey alignCenter'>
                                <b>Actor, Artist, Actor, Artist, Actor, Artist, Actor, Artist</b>
                            </Card.Text>
                            <Card.Text className='alignCenter'>
                                <b>Loki, Phoki, Choki, Okhi</b>
                            </Card.Text> */}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default TalentCard;
