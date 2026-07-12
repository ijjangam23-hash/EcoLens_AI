import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


function CarbonChart({ result }) {


  const data = {

    labels: [
      "Transport",
      "Electricity",
      "Food",
      "Waste"
    ],

    datasets: [
      {

        data: [
          result.transport,
          result.electricity,
          result.food,
          result.waste
        ],

        backgroundColor: [
          "#4CAF50",
          "#FFC107",
          "#2196F3",
          "#9E9E9E"
        ],

        borderWidth: 1

      }
    ]

  };


  const options = {

    responsive: true,

    plugins: {

      legend: {

        position: "bottom"

      }

    }

  };


  return (

    <div className="chart">

      <h2>📊 Carbon Contribution</h2>

      <Pie
        data={data}
        options={options}
      />

    </div>

  );

}


export default CarbonChart;