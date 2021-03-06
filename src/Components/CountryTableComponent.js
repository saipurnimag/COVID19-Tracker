import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Table, } from "antd";
import GraphComponent from "./GraphComponent";
const columns = [
  {
    title: "Country Name",
    dataIndex: "name",
    width: "40%",
    fixed:'left',
  },
  {
    title: "Confirmed Cases",
    dataIndex: "confirmed_cases",
    width: "15%",
    sorter: (a, b) => a.confirmed_cases - b.confirmed_cases,
    fixed : 'right',
    render(text, record) {
      return {
        props: {
          style: { color: 'blue' },
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "Deaths",
    dataIndex: "deaths",
    width: "15%",
    sorter: (a, b) => a.deaths - b.deaths,
    fixed : 'right',
    render(text, record) {
      return {
        props: {
          style: { color: 'red' },
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "Recovered",
    dataIndex: "recovered",
    width: "15%",
    sorter: (a, b) => a.recovered - b.recovered,
    fixed : 'right',
    render(text, record) {
      return {
        props: {
          style: { color: 'green' },
        },
        children: <div>{text}</div>,
      };
    },
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
  
  const expandTheProvince = (record, country) =>{
    return <GraphComponent totaldata = {props.totaldata} location = {country.name+"_"+record.name} />
  }

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
          width: "25%",
        },
        {
          title: "Confirmed Cases",
          dataIndex: "confirmed_cases",
          sorter: (a, b) => a.confirmed_cases - b.confirmed_cases,
          width: '20%',
          fixed: 'right',render(text, record) {
            return {
              props: {
                style: { color: 'blue' },
              },
              children: <div>{text}</div>,
            };
          },
        },
        {
          title: "Deaths",
          dataIndex: "deaths",
          sorter: (a, b) => a.deaths - b.deaths,
          width: '20%',
          fixed:'right',
          render(text, record) {
            return {
              props: {
                style: { color: 'red' },
              },
              children: <div>{text}</div>,
            };
          },
        },
        {
          title: "Recovered",
          dataIndex: "recovered",
          sorter: (a, b) => a.recovered - b.recovered,
          width: '20%',
          fixed: 'right',
          render(text, record) {
            return {
              props: {
                style: { color: 'green' },
              },
              children: <div>{text}</div>,
            };
          },
        },
      ];
      
      return <Table

      scroll={scroll}  expandable={{
        expandedRowRender: (record) => (
          expandTheProvince(record,country)
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }} columns={columns} dataSource={record["provinces"]} pagination={false} />;
    }
    
  };
  const scroll = {};

      scroll.x = '100vw';

  return (
    
      <Table

        expandable={{
          expandedRowRender: (record) => (
            expandTheCountry(record)
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        pagination={false}
        columns={tableColumns}
        dataSource={data}
        scroll = {scroll}
        tableLayout = "fixed"
      />
    
  );
};

export default CountryTableComponent;

