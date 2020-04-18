import React, { useState, useEffect } from "react";
import { Statistic, Typography, Skeleton, Divider, Space } from "antd";
import "../App.css";
const {Text, Title } = Typography;
function TotalStatisticsCards(props) {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({});
  const [stats, setStats] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  });
  useEffect(() => {
    if (flag === false) {
      getStates();
    }
  }, [flag]);

  const getStates = () => {
    setData(JSON.stringify(props.totaldata));
    console.log("I still don't have it ", data);
    console.log("Setting .. ", props.totaldata);
    makevariables(props.totaldata);
    setFlag(true);
  };

  function makevariables(Data) {
    console.log("YO", Data);

    for (var keys in Data) {
      var obj = Data[keys];
      stats["confirmed"] += obj["Total_confirmed"];
      stats["deaths"] += obj["Total_Deaths"];
      stats["recovered"] += obj["Total_Recovered"];
    }
  }

  if (flag) {
    console.log("Rendering .. ", props.totaldata);
    return (
      <div style={{padding:"0% 10%"}}>
        <Space direction="vertical" size="middle">
        <Space>
        <Text strong>CONFIRMED</Text>
        <Statistic
          md={{span:8}}
          className="statistic"
          value={stats["confirmed"]}
          valueStyle={{ color: "BLUE" }}
          suffix="cases"
          style={{ minHeight: "100%", minWidth: "50%"}}
        />
        </Space>
        
        <Space>
        <Text strong>DEATHS</Text>
        <Statistic
          md={{span:8}}
          className="statistic"
          value={stats["deaths"]}
          valueStyle={{ color: "rED" }}
          suffix="cases"
          style={{ minHeight: "100%" }}
        />
        </Space>
        <Space>
        <Text strong>RECOVERED</Text>
        <Statistic
          md={{span:8}}
          className="statistic"
          value={stats["recovered"]}
          valueStyle={{ color: "Green" }}
          suffix="cases"
          style={{ minHeight: "100%" }}
        />
        </Space>
        </Space>
      </div>
    );
  } else {
    return <Skeleton active  />;
  }
}

export default TotalStatisticsCards;
