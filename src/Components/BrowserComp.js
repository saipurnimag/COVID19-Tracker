import React, { useState, useEffect }  from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Row, Col, Layout, Menu } from "antd";
import TotalStatisticsCards from "./TotalStatisticsCards";
import WorldMapComponent from "./WorldMapComponent";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function BrowserComp(props) {
  
  return (
    <Layout className="layout">
      <Header style={{ height: "50%" }}>
        <Menu
          span={24}
          className="Mainmenu"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          theme="dark"
          mode="horizontal"
          style={{ height: "60%" }}
          selectedKeys="pagename"
        >
          <Menu.Item key="pagename" style={{ float: "left" }}>
            <span id="Pagename">
              <b>COVID-19 Tracker</b>
            </span>
          </Menu.Item>

          <Menu.Item key="wiki-link" style={{ float: "right" }}>
            <a
              href="https://en.wikipedia.org/wiki/Coronavirus_disease_2019"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b id="Pagename">WIKI</b>
            </a>
          </Menu.Item>
          <SubMenu
            style={{ float: "right" }}
            title={
              <span id="Pagename">
                <b>About</b>
              </span>
            }
          >
            <Menu.Item key="git-link">
              <a
                href="https://github.com/saipurnimag"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
            </Menu.Item>
            <Menu.Item key="git-link">
              <a
                href="https://www.linkedin.com/in/saipurnimag"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>

      <Content style={{ padding: "2% 2%" }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <Row style={{padding: "8px 0" }}>
              <TotalStatisticsCards totaldata={ props.maindata} />
            </Row>
          </Col>

          <Col
            className="gutter-row"
            style={{ minHeight: "50%" }}
            span={16}
          >
             <WorldMapComponent totaldata={ props.maindata}/>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

           

        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>My first React project</Footer>
    </Layout>
  );
}

export default BrowserComp;
