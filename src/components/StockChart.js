import React from "react";
import {VictoryChart, VictoryLine, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer } from 'victory';
import "../styling/Home.css";
import DateConversion from "../functions/DateConversion";

const DataPoint1 = (props) => {
    const {x, y, datum} = props; // VictoryScatter supplies x, y and datum
    //   const cat = datum._y >= 0 ? "😻" : "😹";
    const point = datum._y >= 0 ? "▼" : "🔺";

    return (
        <text x={x} y={y} fontSize={10} className="highFractal">
            {point}
        </text>
    );
}

const DataPoint2 = (props) => {
    const {x, y, datum} = props; // VictoryScatter supplies x, y and datum
    //   const cat = datum._y >= 0 ? "⧐" : "😹";
    const point = datum._y >= 0 ? "🔺" : "🔺";
    
    return (
        <text x={x} y={y} fontSize={10} className="lowFractal">
            {point}
        </text>
    );
}

const DataPoint3 = (props) => {
    const {x, y, datum} = props; // VictoryScatter supplies x, y and datum
    //   const cat = datum._y >= 0 ? "⫷" : "😹";
    const point = datum._y >= 0 ? "⧐" : "😻";

    return (
        <text x={x} y={y} fontSize={10} className="dateOverlay">
            {point}
        </text>
    );
}

export const StockChart = (props) => {
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
                    // labels={({datum}) => `${(datum.x)}`}
                        labels={({datum}) => `${DateConversion((datum.x))}`}
                    />
                }
                
            >
                <VictoryLine
                    data={props.storageBox}
                    style={{
                        labels: { fill: "black" },
                        data: { stroke: "purple" },
                        parent: { border: ".5px dotted #ccc"}
                    }}
                />
                {props.showFractalHigh && <VictoryScatter
                    dataComponent={<DataPoint1/>}
                    size={7}
                    data={props.victoryScatterHigh}
                    style={{
                        data: {
                        fill: ({ datum }) => datum.fill,
                        // opacity: ({ datum }) => datum.opacity
                        }
                    }}
                /> }
                {props.showFractalLow && <VictoryScatter
                    dataComponent={<DataPoint2/>}
                    size={7}
                    data={props.victoryScatterLow}
                    style={{
                        data: {
                        fill: ({ datum }) => datum.fill,
                        // opacity: ({ datum }) => datum.opacity
                        }
                    }}
                />}
                {props.showDateOverlay && <VictoryScatter
                    dataComponent={<DataPoint3/>}
                    size={7}
                    data={props.victoryDateOverlay}
                    style={{
                        data: {
                        fill: ({ datum }) => datum.fill,
                        // opacity: ({ datum }) => datum.opacity
                        }
                    }}
                />}
            </VictoryChart>
    </div>
    )
}

export default StockChart;
