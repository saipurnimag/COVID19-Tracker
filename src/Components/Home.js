import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import {
  Row,
  Col,
  Layout,
  Divider,
  Space,
  Typography,
  BackTop,
  Menu,
  Button,
} from "antd";
import TotalStatisticsCards from "./TotalStatisticsCards";
import WorldMapComponent from "./WorldMapComponent";
import CountryTableComponent from "./CountryTableComponent";
import {
  LineChartOutlined,
  LinkedinOutlined,
  GithubOutlined,
  LinkOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import GraphComponent from "./GraphComponent";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};
const { SubMenu } = Menu;
class Home extends React.Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(props) {
    return (
      <Layout className="layout">
        <Header style={{ height: "50%" }}>
          <Space direction="horizontal" size="middle">
            <span
              id="Pagename"
              style={{ float: "unset", fontSize: 32, color: "#a6adb4" }}
            >
              <b>COVID-19 Tracker</b>
            </span>
          </Space>
        </Header>

        <BackTop>
          <div style={style}>UP</div>
        </BackTop>

        <Content
          className="contentbox"
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          style={{
            paddingLeft: "0%",
            paddingRight: "0%",
            backgroundColor: "#ffffff",
          }}
        >
          <div sm={{ span: 24 }} xs={{ span: 24 }} className="headingname">
            <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
              <Title>
                COVID-19 <LinkOutlined />
              </Title>
            </a>
          </div>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 8 }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ paddingLeft: "4%" }}
            >
              <TotalStatisticsCards totaldata={this.props.maindata} />
              <Divider />

              <div
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                style={{ paddingLeft: "5%" }}
                className="headingname"
              >
                <Title>
                  INDIA <LineChartOutlined style={{ fontSize: 32 }} />
                </Title>
              </div>
              <GraphComponent
                style={{ padding: "0% 5% 5% 0%" }}
                totaldata={this.props.maindata}
                location={"India"}
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 16 }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ padding: "0% 5% 0% 2%" }}
            >
              <WorldMapComponent totaldata={this.props.maindata} />
            </Col>
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            style={{ marginTop: "2%" }}
          >
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <CountryTableComponent totaldata={this.props.maindata} />
            </Col>
          </Row>
        </Content>

        <Footer>
          <center>
            <Space size="large">
              <Title>
                <a href="https://github.com/saipurnimag">
                  <GithubOutlined />
                </a>
                <a href="https://www.linkedin.com/in/saipurnimag/">
                  <LinkedinOutlined />
                </a>
              </Title>
            </Space>

            <Typography level={1} strong underline mark>
              Datasource :{" "}
              <a href="https://github.com/CSSEGISandData/COVID-19">
                <Typography level={1}>
                  2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by
                  Johns Hopkins CSSE
                </Typography>
              </a>
            </Typography>
          </center>
        </Footer>
      </Layout>
    );
  }
}
export default Home;
