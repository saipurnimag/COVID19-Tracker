import React from "react";
import ReactLoading from "react-loading";
class LoadingComp extends React.Component {
  render() {
    return (
      <div style={{verticalAlign:"centern"}}>
         <center>
         <ReactLoading type="spinningBubbles" color="black" />
         <h1>loading...</h1>
         </center>
        
      </div>
    );
  }
}
export default LoadingComp;
