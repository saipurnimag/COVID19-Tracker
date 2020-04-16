import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../App.css";
import { Skeleton } from "antd";

function GraphComponent(props) {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (flag === false) {
      getStates();
    }
  }, [flag]);

  const getStates = () => {
    setData(makeData());
    setFlag(true);
  };
  const makeData = () => {
    var totaldata = props.totaldata;
    var country = props.location.split("_")[0];
    var countryObj = totaldata[country];
    if (props.location.split("_")[1] == undefined) {
      for (var key in countryObj) {
        if (String(key) == "null") {
          console.log("here");
          var object = countryObj[key];
          console.log(object["DataPoints"]);

          return object["DataPoints"];
        }
      }
    } else {
      var provinceObj = countryObj[props.location.split("_")[1]];
      return provinceObj["DataPoints"];
    }
  };
  if (flag) {
    return (
      <ResponsiveContainer xs={{span: 24}} sm = {{span:24}} lg = {{span:24}} height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="confirmedcolor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
              <stop offset="95%" stopColor="white" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="recoveredcolor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="green" stopOpacity={0.8} />
              <stop offset="95%" stopColor="green" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="deathcolor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="white" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="confirmed"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#confirmedcolor)"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#deathcolor)"
          />
          <Area
            type="monotone"
            dataKey="recovered"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#recoveredcolor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  } else {
    return <Skeleton active />;
  }
}
export default GraphComponent;
