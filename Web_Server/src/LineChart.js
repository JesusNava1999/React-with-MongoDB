import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

//const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
//const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
var elements = 0;
var scores = [];
var scores2 = [];
var labels = [];
var yHat = 0;
var sumXtimesY = 0;
var sumX = 0;
var sumY = 0;
var sumXsqr = 0;
var b0 = 0;
var b1 = 0;
//const labels = [10, 20, 30, 40, 50, 60, 70];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart(props) {
  scores = props.Data1;
  scores2 = props.Data2;
  elements = props.Data1.length;

  for (let i = 0; i < props.Data1.length; i++) {
    if (!labels.includes(i + 1)) {
      labels.push(i + 1);
      sumXtimesY = sumXtimesY + (parseInt(props.Data1[i]) * parseInt(props.Data2[i]));
      sumX = sumX + parseInt(props.Data2[i]);
      sumY = sumY + parseInt(props.Data1[i]);
      sumXsqr = sumXsqr + Math.pow(parseInt(props.Data2[i]), 2);
    }
  }
  b1 = ((elements * sumXtimesY - sumX * sumY) / (elements * sumXsqr - (sumX * sumX)));
  b0 = ((sumY - b1 * sumX) / (elements));
  console.log(parseInt(b0));
  console.log(parseInt(b1));
  //sumXtimesY = sumXtimesY + (dataSet[i].value_1 * dataSet[i].value_2);
  //sumX = sumX + parseInt(dataSet[i].value_2);
  //sumY = sumY + parseInt(dataSet[i].value_1);
  //sumXsqr = sumXsqr + Math.pow(parseInt(dataSet[i].value_2), 2);
  //b0 = (sumY - b1 * sumX) / (elements);
  //b1 = (elements * sumXtimesY - sumX * sumY) / (elements * sumXsqr - (sumX * sumX));

  const Predecir = (a) => {
    console.log("b0 ", b0);
    console.log("b1 ", parseInt(b1));
  }

  const guardarPredecir = (predecir) => {
    console.log("Predecir: ", predecir);
    Predecir(predecir)
    yHat = b0 + b1 * predecir;
    console.log("Predicción: ", yHat);
  }

  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Ventas",
          data: scores,
          tension: 0.4,
          borderColor: "Red",
          pointRadius: 6,
          pointBackgroundColor: "Blue",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Advertising",
          tension: 0.4,
          data: scores2,
          borderColor: "Black",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, [scores, scores2]);
  return (
    <>
      <form>
        <label>
          Predecir:
          <input type="text" name="Number" onChange={e => guardarPredecir(e.target.value)} />
        </label>
        <button type="submit">Predecir</button>
      </form>
      <Line data={data} options={options} />
    </>
  );
}