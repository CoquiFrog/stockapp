import React, {useState, useEffect} from "react";
import {VictoryChart, VictoryLine, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer } from 'victory';
// import * as V from 'victory';
import "../styling/Home.css";
import DateConversion from "../functions/DateConversion";

const DataPoint1 = (props) => {
      const {x, y, datum} = props; // VictoryScatter supplies x, y and datum
    //   const cat = datum._y >= 0 ? "😻" : "😹";
    const cat = datum._y >= 0 ? "▼" : "🔺";
    
      return (
        <text x={x} y={y} fontSize={10} className="highFractal">
          {cat}
        </text>
      );
    }

    const DataPoint2 = (props) => {
        const {x, y, datum} = props; // VictoryScatter supplies x, y and datum
      //   const cat = datum._y >= 0 ? "😻" : "😹";
      const cat = datum._y >= 0 ? "🔺" : "🔺";
      
        return (
          <text x={x} y={y} fontSize={10} className="lowFractal">
            {cat}
          </text>
        );
      }
  

export const StockChart = (props) => {
    console.log('PROPS: ', props);
    return (
        <div>
            <VictoryChart domainPadding={{ y: 10}}
                height={850}
                width={1600}
                minDomain={{y: props.graphFloor}} // props.graphFloor
                maxDomain={{y: props.graphCeiling}} // props.graphCeiling
                scale="linear"
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({datum}) => `${DateConversion((datum.x))}`}
                    />
                }
                
            >
                <VictoryLine
                    // dataComponent={<DataPoint/>}
                    data={props.storageBox}
                    style={{
                        labels: { fill: "black" },
                        data: { stroke: "purple" },
                        parent: { border: ".5px dotted #ccc"}
                    }}
                />
                {/* <VictoryLine
                    data={props.stockChartFractalHighs}
                    style={{
                        labels: { fill: "black" },
                        data: { stroke: "green" },
                        parent: { border: ".1px dotted #ccc"}
                    }}
                />
                <VictoryLine
                    data={props.stockChartFractalLows}
                    style={{
                        labels: { fill: "black" },
                        data: { stroke: "red" },
                        parent: { border: ".1px dotted #ccc"}
                    }}
                /> */}
<VictoryScatter
 dataComponent={<DataPoint1/>}
  size={7}
  data={props.victoryScatterHigh}
  style={{
    data: {
      fill: ({ datum }) => datum.fill,
      opacity: ({ datum }) => datum.opacity
    }
  }}
/>
<VictoryScatter
 dataComponent={<DataPoint2/>}
  size={7}
  data={props.victoryScatterLow}
  style={{
    data: {
      fill: ({ datum }) => datum.fill,
      opacity: ({ datum }) => datum.opacity
    }
  }}
/>
            </VictoryChart>
    </div>
    )
}

export default StockChart;
