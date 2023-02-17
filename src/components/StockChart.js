import React, {useState, useEffect} from "react";
import {VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer } from 'victory';
// import * as V from 'victory';

export const StockChart = (props) => {
    console.log('PROPS: ', props);
    return (
        <div>
            <VictoryChart domainPadding={{ y: 10}}
                height={900}
                width={900}
                minDomain={{y: props.graphFloor}} // props.graphFloor
                maxDomain={{y: props.graphCeiling}} // props.graphCeiling
                scale="linear"
                containerComponent={
                    <VictoryVoronoiContainer
                        // labels={({datum}) => `${(datum.x)}`}
                    />
                }
                
            >
                <VictoryLine
                    style={{
                        labels: { fill: "black" },
                        data: { stroke: "purple" },
                        parent: { border: ".5px dotted #ccc"}
                    }}

                    data={props.storageBox}
                />


            </VictoryChart>
    </div>
    )
}

export default StockChart;
