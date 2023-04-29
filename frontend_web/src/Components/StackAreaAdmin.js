import React from 'react';
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

      

const curr = new Date()
var yesterday = new Date(curr.getTime());
yesterday.setDate(curr.getDate() - 1);
const labels = [yesterday.getDate() + "-" + curr.getMonth()+"-"+curr.getYear(),curr.getDate() + "-" + curr.getMonth()+"-"+curr.getYear()];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Energetic',
      data: [100,200],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        fill: true,
        label: 'Happy',
        data: [500,100],
        borderColor: 'rgb(255, 255, 51)',
        backgroundColor: 'rgb(255,255,51,0.5)',
    },
    {
        fill: true,
        label: 'Calm',
        data: [600,150],
        borderColor: 'rgb(255, 102, 255)',
        backgroundColor: 'rgb(255,102,255,0.5)'
    },
    {
        fill: true,
        label: 'Mood Swings',
        data: [900,700],
        borderColor: 'rgb(102, 255, 255)',
        backgroundColor: 'rgb(102,255,255,0.5)'
    },
    {
        fill: true,
        label: 'Sad',
        data: [70,200],
        borderColor: 'rgb(153,0,0)',
        backgroundColor: 'rgb(153,0,0,0.5)'
    },
    {
        fill: true,
        label: 'Irritated',
        data: [200,300],
        borderColor: 'rgb(255,0,0)',
        backgroundColor: 'rgb(255,0,0,0.5)',
    },
  ],
};

function StackAreaAdmin() {
  return <Line options={options} data={data} />;
}

export default StackAreaAdmin; 