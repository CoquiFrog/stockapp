import React, {useState, useEffect} from "react";
import {VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer } from 'victory';
// import * as V from 'victory';

export const StockGraph = (props) => {
    return (
        <div>
            <VictoryChart domainPadding={{ y: 10}}
                height={900}
                width={900}
                minDomain={{y: props.graphFloor}}
                maxDomain={{y: props.graphCeiling}}
                scale="linear"
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({datum}) => `${(datum.x)}`}
                    />
                }
            ></VictoryChart>
    </div>
    )
}

export default StockGraph;
