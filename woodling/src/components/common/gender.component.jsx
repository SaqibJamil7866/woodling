import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SettingService } from '../../services/Setting';

const Gender = ({ handleGenderData }) => {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    SettingService.getGenders().then((res) => {
      setGenders(res.data.data);
    });
  });

  return (
    <Container>
      <Row>
        <Col>
          {genders &&
            genders.map((gender) => {
              return (
                <div className="d-flex flex-column p-2 justify-content-center align-items-start">
                  <label key={gender.id} className="containers">
                    {gender.sex}
                    <input
                      type="checkbox"
                      name="checkbox"
                      onClick={() => handleGenderData(gender.sex)}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default Gender;
