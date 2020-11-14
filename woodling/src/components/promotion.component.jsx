import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Location from './common/location.component';
import AgeRange from './common/age.component';
import { ActivityStreamService } from '../services/ActivityStreamService';
import { CastingCallService } from '../services/CastingCallsService';
import { useHistory, useParams } from 'react-router-dom';
import Categories from './common/categories.component';
import InputRange from 'react-input-range';
import { postPromotion } from '../services/Promotion';
import { AuthService } from '../services/AuthService';
import Gender from './common/gender.component';

const PromotionScreen = (props) => {
  const params = useParams();
  const history = useHistory();
  const [location, setLocation] = useState(false);
  const [categories, setCatagories] = useState(false);
  const [age, setAge] = useState(false);
  const [gender, setGender] = useState(false);

  const [loc, setLoc] = useState([]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [formatted_address, setFormatted_address] = useState('');
  const [ageRange, setAgeRange] = useState({
    min: 18,
    max: 35,
  });
  const [selectCatagory, setSelectCatagory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  const [proceed1, setProceed1] = useState(false);
  const [duration, setDuration] = useState('3');
  const [budget, setBudget] = useState('1');

  const [proceed2, setProceed2] = useState(false);

  const handleLocation = () => {
    setLocation(true);
    setCatagories(false);
    setAge(false);
    setGender(false);
  };

  const handleCategories = () => {
    setLocation(false);
    setCatagories(true);
    setAge(false);
    setGender(false);
  };

  const handleAge = () => {
    setLocation(false);
    setCatagories(false);
    setAge(true);
    setGender(false);
  };

  const handleGender = () => {
    setLocation(false);
    setCatagories(false);
    setAge(false);
    setGender(true);
  };

  const handleLocationSearch = (keyword) => {
    CastingCallService.getLocation(keyword).then((res) => {
      setLoc(res.data.predictions);
    });
  };

  const searchLocation = (loc) => {
    if (loc && loc.length > 0) {
      ActivityStreamService.getLocationDetailByPlaceId(loc[0].place_id).then(
        (response) => {
          const res = response.data.results[0];
          const address = loc[0].description.split(',');
          setFormatted_address(res.formatted_address);
          setLat(res.geometry.location.lat);
          setLng(res.geometry.location.lng);
        }
      );
    }
  };

  const sliderOnChange = (value) => {
    setAgeRange({
      max: value.max,
      min: value.min,
    });
  };

  const handleCategory = (e) => {
    const str = e.target.value.join(',');
    setSelectCatagory(e.target.value);
  };

  const handleProceedBtn1 = () => {
    setProceed1(true);
  };

  const handleDuration = (value) => {
    console.log(value);
    setDuration(value);
  };

  const handleBudget = (value) => {
    setBudget(value);
  };

  const handleProceedBtn2 = () => {
    setProceed2(true);
  };

  const handleSubmit = async () => {
    // formatted_address selectCatagory ageRange duration budget
    const cat = selectCatagory.map((i) => i.id).join(',');
    const age = `${ageRange.min},${ageRange.max}`;
    const gen = selectedGender.join(',');
    const param = {
      location: formatted_address,
      tag_set: cat,
      age: age,
      user_id: AuthService.getUserId(),
      post_id: params.id,
      duration: duration,
      total_budget: budget,
      gender_set: gen,
    };
    await postPromotion(param).then((res) => {
      history.replace('/home');
    });
  };

  const handleGenderData = (val) => {
    console.log('value', val);
    selectedGender.push(val);
  };

  return (
    <div className="scrolling h-100">
      {proceed2 ? (
        <Container>
          <Row>
            <Col lg={4}>
              <div className="h-100vh d-flex align-items-center justify-content-center flex-column">
                <div className="mt-10">
                  <img src={require('../assets/card-template.png')} />
                </div>
                <p className="alignCenter">
                  By creating this promotion you have agreed to Woodling's
                  advertising and promotion guideline
                </p>
              </div>
              <div className="w-100 d-flex justify-content-end">
                <Button
                  onClick={handleSubmit}
                  style={{ backgroundColor: 'red' }}
                >
                  Create Promotion
                </Button>
              </div>
            </Col>
            <Col lg={8}>
              <h3 className="alignCenter">Summary</h3>
              <div className="d-flex align-items-center justify-content-center h-100vh flex-column">
                <div className="border d-flex justify-content-between w-50">
                  <h5>Duration and Budget</h5>
                  <p>
                    <b>
                      ${budget}/{duration}days
                    </b>
                  </p>
                </div>
                <h3 style={{ marginTop: '30px' }}>
                  <b>Promtion will cost your total</b>
                </h3>
                <h2>
                  <b>${budget}</b>
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
      ) : proceed1 ? (
        <Container className="h-100vh">
          <Row>
            <Col lg={6} className="h-100vh">
              <h1 className="bottom-red w-100">
                <b>Durations & Budget</b>
              </h1>
              <div className="d-flex flex-column justify-content-center h-100">
                <p className="alignCenter">Total Spend Time</p>
                <h1 className="alignCenter">
                  <b>
                    $ {budget} over {duration} days
                  </b>
                </h1>
              </div>
              <div>
                <Button
                  onClick={handleProceedBtn2}
                  style={{ backgroundColor: 'red' }}
                >
                  Proceed
                </Button>
              </div>
            </Col>
            <Col
              lg={6}
              className="d-flex flex-column justify-content-around h-100vh"
            >
              <h3 className="alignCenter">Duration</h3>
              <div>
                <InputRange
                  formatLabel={(value) => `${value} Days`}
                  //   step={10}
                  maxValue={30}
                  minValue={0}
                  value={duration}
                  onChange={handleDuration}
                />
              </div>
              <h3 className="alignCenter">Budget</h3>
              <div>
                <InputRange
                  formatLabel={(value) => `$${value} Per Day`}
                  //   step={10}
                  maxValue={10}
                  minValue={0}
                  value={budget}
                  onChange={handleBudget}
                />
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col lg={12}>
              <div>
                <h1 className="bottom-red w30">
                  <b>Choose Audience</b>
                </h1>
              </div>
            </Col>
            <Col lg={4}>
              <div className="white d-flex justify-content-center align-items-center h-100vh flex-column">
                <div
                  onClick={handleLocation}
                  className={
                    location
                      ? 'd-flex space-between w100p border p10 pointer bg-red clr-w'
                      : 'd-flex space-between w100p border p10 pointer'
                  }
                >
                  <p className="m0 fs20 fw500">Location</p>
                  <i className="fa fa-angle-right fs25 " />
                </div>
                <div
                  onClick={handleCategories}
                  className={
                    categories
                      ? 'd-flex space-between w100p border p10 pointer bg-red clr-w'
                      : 'd-flex space-between w100p border p10 pointer'
                  }
                >
                  <p className="m0 fs20 fw500">Categories</p>
                  <i className="fa fa-angle-right fs25 " />
                </div>
                <div
                  onClick={handleAge}
                  className={
                    age
                      ? 'd-flex space-between w100p border p10 pointer bg-red clr-w'
                      : 'd-flex space-between w100p border p10 pointer'
                  }
                >
                  <p className="m0 fs20 fw500">Age</p>
                  <i className="fa fa-angle-right fs25 " />
                </div>
                <div
                  onClick={handleGender}
                  className={
                    gender
                      ? 'd-flex space-between w100p border p10 pointer bg-red clr-w'
                      : 'd-flex space-between w100p border p10 pointer'
                  }
                >
                  <p className="m0 fs20 fw500">Gender</p>
                  <i className="fa fa-angle-right fs25 " />
                </div>
                <div className="d-flex justify-content-end w-100">
                  <Button
                    disabled={
                      formatted_address.length > 0
                        ? selectCatagory.length
                          ? false
                          : true
                        : true
                    }
                    onClick={handleProceedBtn1}
                    style={{ backgroundColor: 'red' }}
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              {location ? (
                <Location
                  loc={loc}
                  handleLocationSearch={handleLocationSearch}
                  searchLocation={searchLocation}
                />
              ) : null}
              {categories ? (
                <Categories
                  catagory={selectCatagory}
                  handleCategory={handleCategory}
                />
              ) : null}
              {age ? (
                <AgeRange age={ageRange} sliderOnChange={sliderOnChange} />
              ) : null}
              {gender ? <Gender handleGenderData={handleGenderData} /> : null}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default PromotionScreen;
