import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";
import LoadingComp from "./Components/LoadingComp";
import Home from "./Components/Home";
import {fetchData, isEmpty} from "./Helpers/Generate";
function App(props) {
  const [MainData, setData] = useState({});
  const [fetched, setFetched] = useState(false);
  
  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = () => {
    fetchData((data) => {
      setData(data);
    });
    if (isEmpty(MainData)) {
      console.log("False");
      setFetched(false);
    } else {
      setFetched(true);
    }
  };


  if (!isEmpty(MainData)) {
    return <Home maindata={MainData} />;
  } else {
    return <LoadingComp />;
  }
}

export default App;
