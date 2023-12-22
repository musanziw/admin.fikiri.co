import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Statistics = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "S. En attentes",
        data: [34, 22, 37, 56, 21, 35, 60, 34, 56, 78, 89, 53],
        color: "#e4e7ed"
      },
      {
        name: "S. Cartographiées",
        data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
        color: "#38cab3"
      },

      {
        name: "S. Explorées",
        data: [12, 28, 15, 40, 32, 26, 18, 42, 35, 20, 28, 15],

        color: "#89A3D9"
      },
      {
        name: "S. Expérimentées",
        data: [5, 18, 25, 10, 15, 30, 22, 17, 29, 10, 15, 20],
        color: "#BAD9D9"
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 280,
      },
      grid: {
        borderColor: "#f2f6f7",
        show: true,
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          borderradius: "5px",
          colors: {
            ranges: [
              {
                from: -100,
                to: -46,
                color: "#ebeff5",
              },
              {
                from: -45,
                to: 0,
                color: "#ebeff5",
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      legend: {
        show: true,
        position: "top",
      },
      xaxis: {
        type: "month",
        categories: [
          'Janv.',
          'Fév.',
          'Mar.',
          'Avr.',
          'Mai',
          'Juin',
          'Juill.',
          'Août',
          'Sept.',
          'Oct.',
          'Nov.',
          'Déc.',
        ],
        axisBorder: {
          show: true,
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "rgba(119, 119, 142, 0.05)",
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          rotate: -90,
        },
      },
      yaxis: {
        title: {
          text: "stats",
          style: {
            color: "#adb5be",
            fontSize: "14px",
            fontFamily: "poppins, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-label",
          },
        },
        labels: {
          formatter: function (y) {
            return y.toFixed(0) + "";
          },
        },
      },
      fill: {
        opacity: 1,
      },

    },
  });

  useEffect(() => {
    // Move colors assignment inside useEffect
    setChartData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        colors: prevData.series.map((item) => item.color),
      },
    }));
  }, []);

  return (
      <div id="chart">
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={280}
        />
      </div>
  );
};

export default Statistics;

