import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'; 
import { useStateValue } from '../StateProvider';
import { useEffect} from 'react';

import {DARK_OLIVE,LIGHT_GREEN} from "../Constants"


ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartDoctor() {
    const [unaccepted,setUnaccepted] = useState([])
    const [accepted,setAccepted] = useState([])
    const [state, dispatch] = useStateValue();  

    useEffect(()=>{
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }
		
		const details = {
			doctorId: state.id
		}

        axios.post('http://localhost:8080/api/v1/app/getPatientsByDoctor',details,auth)
        .then(response=>{
            let size = response.data.length
            let temp1 = 0, temp2 = 0; 
            for(let i=0;i<size;i++){
                if(response.data[i].status === false)
                    temp1+=1;
                else
                    temp2+=1 
            }
            setUnaccepted(temp1); 
            setAccepted(temp2); 
        })
    },[])


  return (
    <div>
        
        <Doughnut data={{
            labels:['Requests Pending','Active Patients'],
            datasets:[
                {
                    label: "Users Split", 
                    data:[unaccepted, accepted],
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


