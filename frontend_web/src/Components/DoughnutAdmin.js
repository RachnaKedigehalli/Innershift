import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'; 
import { useStateValue } from '../StateProvider';
import { useEffect} from 'react';

import {DARK_OLIVE,LIGHT_GREEN} from "../Constants"


ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const [allPatients,setAllPatients] = useState([])
    const [allDoctors,setAllDoctors] = useState([])
    const [state, dispatch] = useStateValue();

    const [data,setData] = useState({}); 

    useEffect(()=>{
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        axios.get('http://localhost:8080/api/v1/app/getAllDoctors',auth)
        .then(response=>{
            setAllDoctors(response.data.length)
        })

        axios.get('http://localhost:8080/api/v1/app/getAllPatients',auth)
        .then(response=>{
            setAllPatients(response.data.length)
        })
    },[])


  return (
    <div>
        {console.log(data)}
        <Doughnut data={{
            labels:['Doctors','Patients'],
            datasets:[
                {
                    label: "Users Split", 
                    data:[allDoctors, allPatients],
                    backgroundColor: [
                        DARK_OLIVE,
                        LIGHT_GREEN
                    
                    ],
                    borderColor: [
                        DARK_OLIVE,
                        LIGHT_GREEN
                    ],
                    borderWidth: 1,
                },
            ]
        }} /> 
    </div>
  );
}


