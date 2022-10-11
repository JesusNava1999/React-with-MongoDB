import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';

const DataSets = (props) => {
    var dataSet = [];
    var data_1 = [];
    var data_2 = [];

    useEffect(() => {
        const cargarDatos = async () => {
            const response = await axios("http://10.0.2.6:4000/test");
            dataSet = response.data;
            for (var i = 0; i < dataSet.length; i++) {
                //console.log(dataSet[i]);
                if (!data_1.includes(dataSet[i].value_1)) {
                    data_1.push(dataSet[i].value_1);
                }
                if (!data_2.includes(dataSet[i].value_2)) {
                    data_2.push(dataSet[i].value_2);
                }
            }
        }
        cargarDatos();
    }, [data_1, data_2]);

    return (
        <>
            <LineChart
                Data1={data_1}
                Data2={data_2}
            />
        </>
    )
}

export default DataSets;