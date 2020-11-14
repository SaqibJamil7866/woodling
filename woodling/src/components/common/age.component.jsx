import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InputRange from 'react-input-range';
import { CastingCallService } from '../../services/CastingCallsService';

const AgeRange = ({ age, sliderOnChange }) => {
  useEffect(() => {
    const roleType = CastingCallService.getRoleType();
    console.log('roleType', roleType);
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h3 className="alignCenter">Choose Location</h3>
        </Col>
        <Col lg={12} style={{ marginTop: '30px' }}>
          <InputRange
            value={age}
            onChange={sliderOnChange}
            maxValue={100}
            minValue={1}
          />
        </Col>
        <Col lg={12}>
          <div
            style={{ marginTop: '20px' }}
            className="d-flex justify-content-center align-items-center"
          >
            <h3>
              <b>
                {age.min}-{age.max} Years
              </b>
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AgeRange;
