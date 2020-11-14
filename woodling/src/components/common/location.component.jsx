import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Container, Row, Col } from 'react-bootstrap';

const Location = ({ loc, searchLocation, handleLocationSearch }) => {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h1 className="alignCenter">Add Location(s)</h1>
        </Col>
        <Col>
          <AsyncTypeahead
            id="location_typehead"
            labelKey="description"
            placeholder="Search for a Location"
            minLength={3}
            onSearch={handleLocationSearch}
            onChange={searchLocation}
            options={loc}
            className="form-control box-shadow-none border-none brder-l-r-t mb10"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Location;
