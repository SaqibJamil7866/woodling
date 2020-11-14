import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getSkills } from '../../services/Promotion';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';

const Categories = (props) => {
  const [skills, setSkills] = useState([]);
  // const [data, setData] = useState(props.data.slice());
  useEffect(() => {
    getSkills().then((res) => {
      console.log('skills', res.data);
      setSkills(res.data.data);
    });
  }, []);
  const filterChange = (event) => {
    const data = filterBy(skills.slice(), event.filter);
    // setData(data);
  };
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <h5 className="alignCenter">
            <b>Add Categories</b>
          </h5>
        </Col>
        <Col lg={12}>
          <MultiSelect
            data={skills}
            value={props.selectCatagory}
            onChange={props.handleCategory}
            dataItemKey="id"
            textField="name"
            filterable={true}
            onFilterChange={filterChange}
          />
          {/* <select
            value={props.selectCatagory}
            onChange={props.handleCategory}
            name="lookingFor"
            id="inputState"
            className="form-control bold box-shadow-none"
          >
            {skills &&
              skills.map((i, index) => {
                return <option value={i.id}>{i.name}</option>;
              })}
          </select> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
