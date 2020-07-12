import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import RatingStar from './rating-stars.component';

class TalentCard extends Component {
    state = {starLiked: false}
    liked = () => {
        this.setState({starLiked: true})
    }
    unLike = () => {
        this.setState({starLiked: false})
    }
    render() {
        return(
            <div className='f-left mt10 ml10'>
                <Card style={{ width: '19rem', borderRadius: '10px' }}>
                    <Card.Img variant="top" src={require('../../assets/card-background.svg')} />
                    <div className='center__item dir-col m-50 p-relative'>
                        <Card.Img className='border-radius60 w35'  src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' />
                        <RatingStar rating={2.4} />
                        <Card.Title><b>Ali Khan</b></Card.Title>
                        <i onClick={this.state.starLiked===false ? this.liked : this.unLike} className={this.state.starLiked ? "fa fa-star p-absolute star clr__red" : "fa fa-star-o p-absolute star"}></i>
                    </div>
                    <Card.Body>
                        <div className='center__item dir-col'>
                            <Card.Text className='clr-grey'>
                                <b>@khan.aqil145</b>
                            </Card.Text>
                            <Card.Text className='clr-grey alignCenter'>
                                <b>Actor, Artist, Actor, Artist, Actor, Artist, Actor, Artist</b>
                            </Card.Text>
                            <Card.Text className='alignCenter'>
                                <b>Loki, Phoki, Choki, Okhi</b>
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
        </div>
        );
    }
}
export default TalentCard;
