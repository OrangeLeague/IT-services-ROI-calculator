import React, { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "./styles.module.css";

Chart.register(...registerables);

const ROICalculator = () => {
  const [results, setResults] = useState(null);
  const chartRef = useRef(null);
  const roiChartRef = useRef(null);

  const calculateROI = () => {
    const serviceType = document.getElementById("service-type").value;
    const duration = parseInt(
      document.getElementById("project-duration").value
    );
    const teamSize = parseInt(document.getElementById("team-size").value);
    const currentRevenue = parseInt(
      document.getElementById("current-revenue").value
    );
    const marketSize = parseInt(document.getElementById("market-size").value);
    const competition = parseInt(document.getElementById("competition").value);

    const monthlyDevelopmentCost = 1000 * teamSize;
    const totalDevelopmentCost = monthlyDevelopmentCost * duration;
    const maintenanceCost = monthlyDevelopmentCost * 0.2;

    let revenueIncrease;
    switch (serviceType) {
      case "web":
        revenueIncrease = 0.3;
        break;
      case "mobile":
        revenueIncrease = 0.35;
        break;
      case "fintech":
        revenueIncrease = 0.4;
        break;
      default:
        revenueIncrease = 0;
        break;
    }

    const monthlyBenefit = currentRevenue * revenueIncrease;
    const breakevenMonths = Math.ceil(totalDevelopmentCost / monthlyBenefit);
    const yearOneROI =
      ((monthlyBenefit * 12 - totalDevelopmentCost - maintenanceCost * 12) /
        totalDevelopmentCost) *
      100;

    setResults({
      totalDevelopmentCost,
      maintenanceCost,
      monthlyBenefit,
      breakevenMonths,
      yearOneROI,
    });
  };

  useEffect(() => {
    if (results) {
      const { totalDevelopmentCost, monthlyBenefit } = results;
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous chart instance if it exists
      if (roiChartRef.current) {
        roiChartRef.current.destroy();
      }

      const months = Array.from({ length: 24 }, (_, i) => i + 1);
      const cumulativeCosts = months.map(
        (month) =>
          totalDevelopmentCost + (totalDevelopmentCost * 0.2 * month) / 12
      ); 
      const cumulativeBenefits = months.map((month) => monthlyBenefit * month);

      roiChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: "Cumulative Costs",
              data: cumulativeCosts,
              borderColor: "#e74c3c",
              fill: false,
            },
            {
              label: "Cumulative Benefits",
              data: cumulativeBenefits,
              borderColor: "#2ecc71",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Amount ($)" },
            },
            x: { title: { display: true, text: "Months" } },
          },
        },
      });
    }
  }, [results]);

  return (
    <div className="calculator-container">
      <h1>IT Services ROI Calculator</h1>
      <div className="input-group">
        <div className="question">
          <p>
            Please provide the following information to calculate your potential
            ROI:
          </p>
        </div>

        <label htmlFor="service-type">
          What type of service are you interested in?
        </label>
        <select id="service-type">
          <option value="">-- Select Service Type --</option>
          <option value="web">Web Development</option>
          <option value="mobile">Mobile Development</option>
          <option value="fintech">Fintech Solutions</option>
        </select>

        <label htmlFor="project-duration">
          How long do you expect the project to take? (in months)
        </label>
        <input
          type="number"
          id="project-duration"
          min="1"
          defaultValue="6"
          placeholder="Enter project duration"
        />

        <label htmlFor="team-size">How many team members do you need?</label>
        <input
          type="number"
          id="team-size"
          min="1"
          defaultValue="3"
          placeholder="Enter team size"
        />

        <label htmlFor="current-revenue">
          What is your current monthly revenue? ($)
        </label>
        <input
          type="number"
          id="current-revenue"
          min="0"
          defaultValue="10000"
          placeholder="Enter current monthly revenue"
        />

        <label htmlFor="market-size">
          What is your target market size? ($)
        </label>
        <input
          type="number"
          id="market-size"
          min="0"
          placeholder="Enter target market size"
        />

        <label htmlFor="competition">
          How many direct competitors do you have?
        </label>
        <input
          type="number"
          id="competition"
          min="0"
          placeholder="Enter number of competitors"
        />

        <button onClick={calculateROI}>Calculate ROI</button>
      </div>

      {results && (
        <div className="results" id="results">
          <h2>ROI Analysis</h2>
          <div id="roi-details">
            <p>
              <strong>Total Development Cost:</strong> $
              {results.totalDevelopmentCost.toLocaleString()}
            </p>
            <p>
              <strong>Monthly Maintenance Cost:</strong> $
              {results.maintenanceCost.toLocaleString()}
            </p>
            <p>
              <strong>Projected Monthly Revenue Increase:</strong> $
              {results.monthlyBenefit.toLocaleString()}
            </p>
            <p>
              <strong>Break-even Period:</strong> {results.breakevenMonths}{" "}
              months
            </p>
            <p>
              <strong>First Year ROI:</strong> {results.yearOneROI.toFixed(2)}%
            </p>
          </div>
          <div className="chart-container">
            <canvas id="roiChart" ref={chartRef}></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;
