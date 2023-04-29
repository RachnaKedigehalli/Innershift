import React, { useEffect,useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {DARK_OLIVE,LIGHT_GREEN} from "../Constants"
import axios from 'axios'; 
import { useStateValue } from '../StateProvider';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Patient Mood Tracker',
    },
  },
};

      



function StackAreaAdmin() {
  const [state, dispatch] = useStateValue(); 
  const [countMapToday,setCountMapToday] = useState([0,0,0,0,0,0]);
  const [countMapYesterday,setCountMapYesterday] = useState([0,0,0,0,0,0]);
   
  useEffect(()=>{
    const auth = {
      headers: {
            Authorization: `Bearer ${state.adminToken}`
        }
    }

    const dateToday = {
      date:new Date()
    }

    axios.post('http://localhost:8080/api/v1/app/getMoodsByDate',dateToday,auth)
    .then(response=>{
        var len = response.data.length
        for(let i = 0;i<len;i++){
          countMapToday[response.data[i].mood]++; 
          setCountMapToday(countMapToday)
        }
    })

    var yesterday = new Date(curr.getTime());
    yesterday.setDate(curr.getDate() - 1);
    const dateYesterday = {
      date:yesterday
    }
    
    axios.post('http://localhost:8080/api/v1/app/getMoodsByDate',dateYesterday,auth)
    .then(response=>{
        var len = response.data.length
        for(let i = 0;i<len;i++){
          countMapYesterday[response.data[i].mood]++; 
          setCountMapToday(countMapYesterday)
        }
    })
  },[])

  const curr = new Date()
  var yesterday = new Date(curr.getTime());
  yesterday.setDate(curr.getDate() - 1);
  const labels = [yesterday.getDate() + "-" + curr.getMonth()+"-"+curr.getYear(),curr.getDate() + "-" + curr.getMonth()+"-"+curr.getYear()];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Energetic',
        data: [countMapToday[0],countMapYesterday[0]],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
          fill: true,
          label: 'Happy',
          data: [countMapToday[1],countMapYesterday[1]],
          borderColor: 'rgb(255, 255, 51)',
          backgroundColor: 'rgb(255,255,51,0.5)',
      },
      {
          fill: true,
          label: 'Calm',
          data: [countMapToday[2],countMapYesterday[2]],
          borderColor: 'rgb(255, 102, 255)',
          backgroundColor: 'rgb(255,102,255,0.5)'
      },
      {
          fill: true,
          label: 'Mood Swings',
          data: [countMapToday[3],countMapYesterday[3]],
          borderColor: 'rgb(102, 255, 255)',
          backgroundColor: 'rgb(102,255,255,0.5)'
      },
      {
          fill: true,
          label: 'Sad',
          data: [countMapToday[4],countMapYesterday[4]],
          borderColor: 'rgb(153,0,0)',
          backgroundColor: 'rgb(153,0,0,0.5)'
      },
      {
          fill: true,
          label: 'Irritated',
          data:[countMapToday[5],countMapYesterday[5]],
          borderColor: 'rgb(255,0,0)',
          backgroundColor: 'rgb(255,0,0,0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default StackAreaAdmin; 