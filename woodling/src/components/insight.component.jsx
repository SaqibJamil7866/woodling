import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const InsightScreen = () => {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h1>
            <b>Insights</b>
          </h1>
        </Col>
        <Col lg={6}>
          <div className="bg-white mt-3">
            <h3>
              <b>Status</b>
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InsightScreen;
