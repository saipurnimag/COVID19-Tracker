
import axios from "axios";
import { readString } from "react-papaparse";
const filename_confirmed =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const filename_deaths =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const filename_recovered =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";
const CSV_COUNTRY = "Country/Region";
const CSV_PROVINCE = "Province/State";
const CSV_LAT = "Lat";
const CSV_LONG = "Long";

function fetchData(callback) {
  var confirmed;
  var death;
  var recovered;

  const promises = [
    axios.get(filename_confirmed),
    axios.get(filename_deaths),
    axios.get(filename_recovered),
  ];

  Promise.all(promises).then((result) => {
    confirmed = readString(result[0].data, {
      header: true,
      dynamicTyping: true,
    });
    death = readString(result[1].data, { header: true, dynamicTyping: true });
    recovered = readString(result[2].data, {
      header: true,
      dynamicTyping: true,
    });
    callback(transformData(confirmed, death, recovered));
  });
}
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function transformData(confirmed, deaths, recovered) {
  var confData = {};
  var deathData = {};
  var recovData = {};
  confirmed.data.forEach((elem) => {
    var cnty = elem[CSV_COUNTRY];
    var prov = elem[CSV_PROVINCE];
    if (prov == "") prov = "Mainland";

    var dat = {
      Latitute: elem[CSV_LAT],
      Longitude: elem[CSV_LONG],
      DataPoints: [],
    };
    for (var key in elem) {
      if (new RegExp("\\d+/\\d+/\\d+").test(key)) {
        var toPush = { date: key };
        toPush["confirmed"] = parseInt(elem[key]);
        toPush["deaths"] = 0;
        toPush["recovered"] = 0;
        dat.DataPoints.push(toPush);
      }
    }
    if (confData[cnty] == undefined) {
      confData[cnty] = {};
    }
    confData[cnty][prov] = dat;
  });
  deaths.data.forEach((elem) => {
    var cnty = elem[CSV_COUNTRY];
    var prov = elem[CSV_PROVINCE];
    if (prov == "") prov = "Mainland";

    var dat = {
      Latitute: elem[CSV_LAT],
      Longitude: elem[CSV_LONG],
      DataPoints: {},
    };
    for (var key in elem) {
      if (new RegExp("\\d+/\\d+/\\d+").test(key)) {
        dat.DataPoints[key] = parseInt(elem[key]);
      }
    }
    if (deathData[cnty] == undefined) {
      deathData[cnty] = {};
    }
    deathData[cnty][prov] = dat;
  });
  recovered.data.forEach((elem) => {
    var cnty = elem[CSV_COUNTRY];
    var prov = elem[CSV_PROVINCE];
    if (prov == "") prov = "Mainland";

    var dat = {
      Latitute: elem[CSV_LAT],
      Longitude: elem[CSV_LONG],
      DataPoints: {},
    };
    for (var key in elem) {
      if (new RegExp("\\d+/\\d+/\\d+").test(key)) {
        dat.DataPoints[key] = parseInt(elem[key]);
      }
    }
    if (recovData[cnty] == undefined) {
      recovData[cnty] = {};
    }
    recovData[cnty][prov] = dat;
  });
  delete confData[undefined];
  delete deathData[undefined];
  delete recovData[undefined];
  for (var key_cnt in confData) {
    var cnt_total_confirmed = 0;
    var cnt_total_deaths = 0;
    var cnt_total_recovered = 0;
    for (var key_prov in confData[key_cnt]) {
      confData[key_cnt][key_prov].DataPoints.forEach((ele) => {
        if (
          deathData[key_cnt] != undefined &&
          deathData[key_cnt][key_prov] != undefined &&
          deathData[key_cnt][key_prov].DataPoints[ele.date] != undefined
        ) {
          ele.deaths = deathData[key_cnt][key_prov].DataPoints[ele.date];
        }
        if (
          recovData[key_cnt] != undefined &&
          recovData[key_cnt][key_prov] != undefined &&
          recovData[key_cnt][key_prov].DataPoints[ele.date] != undefined
        ) {
          ele.recovered = recovData[key_cnt][key_prov].DataPoints[ele.date];
        }
      });

      cnt_total_confirmed =
        cnt_total_confirmed +
        confData[key_cnt][key_prov].DataPoints.slice(-1)[0].confirmed;
      cnt_total_deaths =
        cnt_total_deaths +
        confData[key_cnt][key_prov].DataPoints.slice(-1)[0].deaths;
      cnt_total_recovered =
        cnt_total_recovered +
        confData[key_cnt][key_prov].DataPoints.slice(-1)[0].recovered;
    }
    confData[key_cnt]["Total_confirmed"] = cnt_total_confirmed;
    confData[key_cnt]["Total_Deaths"] = cnt_total_deaths;
    confData[key_cnt]["Total_Recovered"] = cnt_total_recovered;
  }
  return confData;
}
export {fetchData, isEmpty};