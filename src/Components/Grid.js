import React from "react";
import { Row, Col, Typography } from "antd";
import TotalStatisticsCards from "./TotalStatisticsCards";
const { Title } = Typography;
const Grid = (props) => {
        return(
                <>
                <Row span = {8} style={{backgroundColor:"pink"}} >
                        <Col span = {12}><Title > COVID-19</Title></Col>
                        <Col span = {12}><TotalStatisticsCards totaldata = {props.totaldata}/</Col>
                </Row>
                <Row span = {8} style={{backgroundColor:"pink"}} >
                        <Col span = {12}><Title > COVID-19</Title></Col>
                        <Col span = {12}></Col>
                </Row>
                </>
        );
};
export default Grid;
