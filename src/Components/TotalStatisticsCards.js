import React, { useState, useEffect } from "react";
import { Statistic, Typography, Skeleton, Divider } from "antd";
import "../App.css";
const { Title } = Typography;
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
      <div>
        <Statistic
          md={{span:8}}
          className="statistic"
          title="CONFIRMED"
          value={stats["confirmed"]}
          valueStyle={{ color: "Red" }}
          suffix="cases"
          style={{ minHeight: "100%", minWidth: "50%" }}
        />
        <Divider xs={{span:24}} sm={{span: 24}} md ={{type: "vertical"}} />

        <Statistic
          md={{span:8}}
          className="statistic"
          title="DEATHS"
          value={stats["deaths"]}
          valueStyle={{ color: "Blue" }}
          suffix="cases"
          style={{ minHeight: "100%" }}
        />
        <Divider xs={{span:24}} sm={{span: 24}} md ={{type: "vertical"}} />
        <Statistic
          md={{span:8}}
          className="statistic"
          title="RECOVERED"
          value={stats["recovered"]}
          valueStyle={{ color: "Green" }}
          suffix="cases"
          style={{ minHeight: "100%" }}
        />
      </div>
    );
  } else {
    return <Skeleton active />;
  }
}

export default TotalStatisticsCards;
