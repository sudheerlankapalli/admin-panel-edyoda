import {Bar }from "react-chartjs-2";
import  Chart  from "chart.js/auto";



const BarChart=()=>{
const storedApiData =JSON.parse(localStorage.getItem("apiData"))||{}
const  performance=storedApiData?.dasbhoardPage?.performance||{}
const labels =Object.keys(performance)
const datasetsData=Object.values(performance)

const data={
    labels,
    datasets:[
        {
            label: "# of hits",
            data:datasetsData,
            backgroundColor:labels,
            barThickness:6,
        }
    ],
}
const options={
    indexAxis:'y',
    plugins:{
        legend:{
            display:true,
            labels:{
                color: 'white',
            }
        },
    },
    scales:{
        x:{
            min:20,
            max:60,
            ticks:{
                stepSize:10,
                color:'white'
            }
        },
        y:{
            ticks:{
                color:'white'
            }
        }
    },
}


    return(
        <div className='chart'>
            <Bar data={data} options={options}/>
        </div>
    )
}

export default BarChart