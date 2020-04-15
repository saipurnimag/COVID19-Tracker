import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Table, Switch, Radio, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";
import LoadingComp from "./LoadingComp";
import WorldGraphComponent from "./WorldGraphComponent";
import GraphComponent from "./GraphComponent";
const columns = [
  {
    title: "Country Name",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "Confirmed Cases",
    dataIndex: "confirmed_cases",
    width: "25%",
    sorter: (a, b) => a.confirmed_cases - b.confirmed_cases,
  },
  {
    title: "Deaths",
    dataIndex: "deaths",
    width: "25%",
    sorter: (a, b) => a.deaths - b.deaths,
  },
  {
    title: "Recovered",
    dataIndex: "recovered",
    width: "25%",
    sorter: (a, b) => a.recovered - b.recovered,
  },
];

const showHeader = true;

const CountryTableComponent = (props) => {
  var state = {
    loading: true,
    size: "default",
    showHeader,
    scroll: undefined,
  };

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: state.ellipsis,
  }));

  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [hasdata, setHasData] = useState(false);
  useEffect(() => {
    if (loading) {
      setData(makeData());
      setHasData(true);
      setloading(true);
    }
  }, [hasdata]);

  const makeData = () => {
    console.log(props.totaldata);
    var num = 1;
    var mainData = props.totaldata;
    var op = [];
    for (var country_name in mainData) {
      var deets = mainData[country_name];
      var obj = {};
      var children = [];
      obj["key"] = num++;
      obj["name"] = country_name;
      for (var key in deets) {
        if (String(key) == "Total_confirmed") {
          obj["confirmed_cases"] = deets["Total_confirmed"];
        } else if (String(key) == "Total_Deaths") {
          obj["deaths"] = deets["Total_Deaths"];
        } else if (String(key) == "Total_Recovered") {
          obj["recovered"] = deets["Total_Recovered"];
        } else if (String(key) == "null") {
          var nullobj = deets[key];
          obj["dates"] = nullobj["DataPoints"];
        }else {
          //new Province
          var provinceobj = deets[key];
          var obj2 = {};
          obj2["name"] = key;
          for (var k in provinceobj) {
            if (String(k) == "DataPoints") {
              obj2["dates"] = provinceobj[k];
              var datesAry = provinceobj[k];
              var lastObj = datesAry[datesAry.length-1];
              obj2["confirmed_cases"] = lastObj["confirmed"];
              obj2["deaths"] = lastObj["deaths"];
              obj2["recovered"] = lastObj["recovered"];              
            }
            if(Object.keys(obj2).length>1){
              obj2["key"] = num++;
              children.push(obj2);
            }
          }
        }
      }
      if (children.length > 0) {
        obj["provinces"] = children;
      }
      op.push(obj);
    }
    return op;
  };
  

  const expandTheCountry = (record) => {
    console.log("This is record ==> "+String(record));
    if(String(record["provinces"])=="undefined"){
      return <GraphComponent totaldata={props.totaldata} location = {record.name} />
    }
    else{
      const country = record;
      const columns = [
        {
          title: "Province Name",
          dataIndex: "name",
        },
        {
          title: "Confirmed Cases",
          dataIndex: "confirmed_cases",
          sorter: (a, b) => a.confirmed_cases - b.confirmed_cases,
        },
        {
          title: "Deaths",
          dataIndex: "deaths",
          sorter: (a, b) => a.deaths - b.deaths,
        },
        {
          title: "Recovered",
          dataIndex: "recovered",
          sorter: (a, b) => a.recovered - b.recovered,
        },
      ];
      return <Table  expandable={{
        expandedRowRender: (record) => (
          expandTheProvince(record,country)
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }} columns={columns} dataSource={record["provinces"]} pagination={false} />;
    }
    
  };

  return (
    <div>
      <Table
        expandable={{
          expandedRowRender: (record) => (
            expandTheCountry(record)
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        pagination={false}
        state
        columns={tableColumns}
        dataSource={data}
      />
    </div>
  );
};

export default CountryTableComponent;

/*

state = {
    loading: true,
    pagination: false,
    size: "default",
    expandable,
    showHeader,
    scroll: undefined,
    hasData: false,
    tableLayout: "fixed",
  };

  handleToggle = (prop) => (enable) => {
    this.setState({ [prop]: enable });
  };

  render() {
    const { ...state } = this.state;

    

*/

/**
 * else {
          //new Province
          var provinceobj = deets[key];
          var obj2 = {};
          obj2["name"] = key;
          for (var k in provinceobj) {
            if (String(k) == "DataPoints") {
              obj2["dates"] = provinceobj[k];
              var datesAry = provinceobj[k];
              var lastObj = datesAry[datesAry.length-1];
              obj2["confirmed_cases"] = lastObj["confirmed"];
              obj2["deaths"] = lastObj["deaths"];
              obj2["recovered"] = lastObj["recovered"];              
            }
            if(Object.keys(obj2).length>0){
              obj2["key"] = num++;
              children.push(obj2);
            }
          }
        }
 * 
 */
