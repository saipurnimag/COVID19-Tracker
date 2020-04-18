import React from "react";
import "antd/dist/antd.css";
import {Layout, Row, Col, Typography} from 'antd';
import notfound from '../notFound.jpg';
const { Header, Content, Footer } = Layout;
const {Title} = Typography;
const NotFound = () => (
  <Content>
  <Row>
    <Col span={24} offset={12} >
      <Title>NOT FOUND</Title>
    </Col>
  </Row>
    
  </Content>
);

export default NotFound;