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
  .domain([0, 100000])
  .range(["#ffedea", "#ff5233"]);

const WorldMapComponent = (props) => {
  const [fetched, setFetched] = useState([]);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  useEffect(() => {
    min = 0;
    max = 10000;
    setData(makeData(props.totaldata));
  }, [fetched]);
  // }, [fetched]);
  // csv(`/vulnerability.csv`).then((data) => {
  //   setData(data);
  // });

  function makeData() {
    var jsonobj = [];
    max = 0;
    min = 10000000;
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

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <div>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <ZoomableGroup zoom={1.5}>
          <Sphere stroke="#E4E5E6" strokeWidth={1} />
          <Graticule stroke="#E4E5E6" strokeWidth={1} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
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
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default WorldMapComponent;
