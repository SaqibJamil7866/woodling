/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, {Component} from 'react';
import { Card } from 'react-bootstrap';
import { ToastsStore } from 'react-toasts';
import convertToFloat from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';
import RatingStar from './rating-stars.component';
import { ReactComponent as PremiumIcon } from '../../assets/premium-icon.svg';
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
        const { talent: { username, full_name, profile_thumb, rating, followers_count, premium, city }, openProfile } = this.props;
        return(
            <div className='f-left mt10 ml10'>
                <Card style={{ width: '19rem', borderRadius: '10px', minHeight:'360px', maxHeight:'360px' }}>
                    <Card.Img variant="top" src={require('../../assets/card-background.svg')} />
                    <div className='center__item dir-col m-50 p-relative'>
                        <Card.Img className='border-radius60 w35 h100' src={siteUrl+""+profile_thumb} />
                        <RatingStar rating={convertToFloat(rating)} />
                            <Card.Title className="mb0"><b>{full_name}</b></Card.Title>
                            <span>Followers: {followers_count}</span>
                        <i onClick={this.state.starLiked === false ? this.liked : this.unLike} className={this.state.starLiked ? "fa fa-star p-absolute star clr__red" : "fa fa-star-o p-absolute star"} />
                    </div>
                    <Card.Body>
                        <div className='center__item dir-col'>
                            <Card.Text className='clr-grey'>
                                <b>@{username}</b> {convertToFloat(premium) === 1 ? <PremiumIcon /> : null }
                            </Card.Text>
                            {city &&(
                                <Card.Text className='alignCenter'>
                                    <i className="fa fa-map-marker" /> {city}
                                </Card.Text>
                            )}

                            <button onClick={()=>openProfile(this.props.talent)}>View Profile</button>

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
