import React from "react";
import { Skeleton } from 'antd';
import "../index.css";
import { Row, Col, Layout, Divider, Space } from "antd";
import { Typography } from "antd";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
class LoadingComp extends React.Component {
  render() {
    return (
      <Layout className="layout" >
      

      <Content
        className="contentbox"
        sm={{ span: 24 }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        style={{ paddingLeft: "0%", paddingRight: "0%", backgroundColor:"#ffffff"}}
      >
        <div sm={{ span: 24 }} xs={{ span: 24 }} className="headingname">
          <Skeleton active/>
        </div>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 8 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Skeleton active/>
            <Divider />
            
            <div sm={{ span: 24 }} xs={{ span: 24 }} className="headingname">
              <Title>
              <Skeleton active/>
              </Title>
              
            </div>
            <Skeleton active/>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 16 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Skeleton active/>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
           <Skeleton active/>
          </Col>
        </Row>
      </Content>
      <Footer>
        <center>
        <Skeleton active/>
        </center>
      </Footer>
    </Layout>
 
    );
  }
}
export default LoadingComp;



