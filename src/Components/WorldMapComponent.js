import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import { jsonToCSV } from "react-papaparse";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
import { isoCountries, twotoThree } from "../Helpers/CountryCodes";
import "../index.css";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
var min = 10,
  max = 100000;
const colorScale = scaleLinear()
  .domain([0, 400000])
  .range(["#ffedea", "#ff5233"]);

const WorldMapComponent = (props) => {
  const [fetched, setFetched] = useState([]);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  useEffect(() => {
    
    setData(makeData(props.totaldata));
  }, [fetched]);
  // }, [fetched]);
  // csv(`/vulnerability.csv`).then((data) => {
  //   setData(data);
  // });

  function makeData() {
    var jsonobj = [];
    var mydata = props.totaldata;
    for (var key in mydata) {
      var anon = {};
      var country = mydata[key];
      anon["ISO3"] = twotoThree[isoCountries[key.replace(/[ \-()*,]/g, "_")]];
      anon["Name"] = key;
      anon["Total_confirmed"] = country["Total_confirmed"];
      if (country["Total_confirmed"] > max) {
        max = country["Total_confirmed"];
      } else if (country["Total_confirmed"] < min) {
        min = country["Total_confirmed"];
      }
      jsonobj.push(anon);
    }
    var csv = jsonToCSV(jsonobj);

    console.log(csv);
    return jsonobj;
  }

  return (
    <div>
      <ComposableMap
      
        projection="geoMercator"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 100
        }}
      >
      <ZoomableGroup zoom={1.3} >
        {data.length > 0 && (
          <Geographies 
          stroke
          geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["Total_confirmed"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
        </ZoomableGroup>
      </ComposableMap>
      
    </div>
  );
};
export default WorldMapComponent;
