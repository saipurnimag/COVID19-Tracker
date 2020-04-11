import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Row, Col, Layout, Menu } from "antd";
import TotalStatisticsCards from "./TotalStatisticsCards";
import { Typography } from "antd";
import WorldMapComponent from "./WorldMapComponent";
import WorldGraphComponent from "./WorldGraphComponent";
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
class Home extends React.Component {
  render(props) {
    console.log("Home.js maindata => ", this.props.maindata);
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
            <SubMenu
              theme="dark"
              style={{ float: "right" }}
              title={
                <span id="Pagename">
                  <b>More</b>
                </span>
              }
            >
              <Menu.Item key="wiki-link" style={{ float: "right" }}>
                <a
                  href="https://en.wikipedia.org/wiki/Coronavirus_disease_2019"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b id="Pagename">WIKI</b>
                </a>
              </Menu.Item>
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
        <Content className="contentbox">
          <div className="headingname">
            <Title> COVID-19</Title>
          </div>

          <div className="CardHolder">
            <TotalStatisticsCards totaldata={this.props.maindata} />
          </div>
          <div className="MapHolder">
            <WorldGraphComponent totaldata={this.props.maindata} />
          </div>
          <div className="graphHolder" style={{ minWidth: "100%" }}>
            <WorldMapComponent totaldata={this.props.maindata} />
          </div>
        </Content>
      </Layout>
    );
  }
}
export default Home;
