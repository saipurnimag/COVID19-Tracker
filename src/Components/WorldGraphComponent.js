import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../App.css";
import { Skeleton } from "antd";

function WorldGraphComponent(props) {
  const [mapReady, setFlag] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (mapReady === false) {
      getStates();
    }
  }, [mapReady]);

  const getStates = () => {
    setData(makeData());
    setFlag(true);
  };
  const makeData = () => {
    var totaldata = props.totaldata;
    var obj = totaldata["Afghanistan"];
    for (var key in obj) {
      if (String(key) == "null") {
        console.log("here");
        var object = obj[key];
        console.log(object["DataPoints"]);
        return object["DataPoints"];
      }
    }
  };
  return(<Skeleton active/>);
}

export default WorldGraphComponent;

/**
 * 
 * 
 * if(mapReady){
  return (
      
      <ResponsiveContainer xs= {{ width: "100%", height: 300 }} sm= {{ width: "100%", height: 300 }} lg = {{ width: "100%", height:"100%" }} 
        width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="confirmedcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="red" stopOpacity={0.8} />
            <stop offset="95%" stopColor="red" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="deathcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
            <stop offset="95%" stopColor="blue" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="recoveredcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
            <stop offset="95%" stopColor="blue" stopOpacity={0} />
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
}
else{
  return( <Skeleton active/> );
}
}
 */