import React, { useState, useEffect, useCallback } from "react";
import Chart from "chart.js/auto";
import styles from "./styles.module.css";
import CountUp from "react-countup";
import img1 from "../Images/Icon.png";
import img2 from "../Images/forward.png";

const industryParameters = {
  ecommerce: {
    avgGrowthRate: 25,
    marketPenetration: 8,
    customerRetention: 70,
    infrastructureCost: 20,
    revenueMultiplier: 1.4,
  },
  healthcare: {
    avgGrowthRate: 15,
    marketPenetration: 4,
    customerRetention: 90,
    infrastructureCost: 25,
    revenueMultiplier: 1.6,
  },
  education: {
    avgGrowthRate: 12,
    marketPenetration: 6,
    customerRetention: 85,
    infrastructureCost: 15,
    revenueMultiplier: 1.3,
  },
  finance: {
    avgGrowthRate: 20,
    marketPenetration: 5,
    customerRetention: 88,
    infrastructureCost: 30,
    revenueMultiplier: 1.8,
  },
  retail: {
    avgGrowthRate: 18,
    marketPenetration: 7,
    customerRetention: 75,
    infrastructureCost: 18,
    revenueMultiplier: 1.5,
  },
};

function ROICalculator() {
  const [tab, setTab] = useState("inputs");
  const [serviceType, setServiceType] = useState("");
  const [industry, setIndustry] = useState("");
  const [projectDuration, setProjectDuration] = useState(2);
  // const [teamSize, setTeamSize] = useState(3);
  const [currentRevenue, setCurrentRevenue] = useState(1000); //setMaintainanceCost
  const [monthlyMaintainanceCost, setMonthlyMaintainanceCost] = useState(400); //setMaintainanceDuration
  const [maintainanceDuration, setMaintainanceDuration] = useState(4);
  const [currentMonthlyCost, setCurrentMonthlyCost] = useState(1000);
  // const [marketSize, setMarketSize] = useState(0);
  // const [competition, setCompetition] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);
  // const [competitionImpact, setCompetitionImpact] = useState(50);
  const [userGrowth, setUserGrowth] = useState(0);
  const [seoGrowth, setSeoGrowth] = useState(0);
  // const [customerLTV, setCustomerLTV] = useState(0);
  const [upsellRate, setUpsellRate] = useState(0); //setCrossSellRate
  const [crossSellRate, setCrossSellRate] = useState(0); //setCrossSellRate
  const [increaseInMargins, setIncreaseInMargins] = useState(0);
  const [additionalCustomers, setAdditionalCustomers] = useState(0);
  const [additionalRevenuStreams, setAdditionalRevenuStreams] = useState(0);
  const [potentialData, setPotentialData] = useState(0);

  // const [upsellValue, setUpsellValue] = useState(0);
  const [cacReduction, setCacReduction] = useState(0);
  const [marketingReduction, setMarketingReduction] = useState(0);
  const [manpowerSavings, setManpowerSavings] = useState(0); //setInventorySavings
  const [inventorySavings, setInventorySavings] = useState(0);
  const [roiChart, setRoiChart] = useState(null);
  const [results, setResults] = useState({
    totalROI: 0,
    paybackPeriod: 0,
    netProfit: 0,
    totalDevCost: 0,
    totalMaintainanceCost: 0,
    totalCost: 0,
    increaseInMonthlyRevenue: 0,
    reductionInCost: 0,
    totalBenifits: 0,
    multiplierFactor: 0,
  });

  console.log(setIndustry,'setIndustryzd');
  const updateSliderBackground = (value) => {
    return {
      background: `linear-gradient(to right, #e99476 ${value}%, #f9f9f9 ${value}%)`,
    };
  };

  const calculateROI = useCallback(() => {
    const industryParams = industryParameters[industry] || {
      revenueMultiplier: 1,
      infrastructureCost: 15,
    };

    // const monthlyDevCost = 1000 * currentMonthlyCost;
    // const totalDevCost =
    //   monthlyDevCost *
    //   projectDuration *
    //   (1 + industryParams.infrastructureCost / 100);
    // const maintenanceCost = monthlyDevCost * 0.2;

    const totalDevCost = currentMonthlyCost * projectDuration;

    // const maintenanceCost = currentMonthlyCost * 0.2;

    const totalMaintainanceCost =
      monthlyMaintainanceCost * maintainanceDuration;

    const totalCost = totalDevCost + totalMaintainanceCost;

    let revenueIncrease = 0;
    switch (serviceType) {
      case "web":
        revenueIncrease = 0.3 * industryParams.revenueMultiplier;
        break;
      case "mobile":
        revenueIncrease = 0.35 * industryParams.revenueMultiplier;
        break;
      case "fintech":
        revenueIncrease = 0.4 * industryParams.revenueMultiplier;
        break;
      default:
        break;
    }

    const monthlyBenefit =
      currentRevenue *
      (revenueIncrease + growthRate / 100) *
      (1 + growthRate / 100);

    // const breakEvenMonths = Math.ceil(
    //   totalDevCost / (monthlyBenefit * (1 - competitionImpact / 100))
    // );

    // const increaseInMonthlyRevenue = currentRevenue;  crossSellRate
    const increaseInMonthlyRevenue =
      currentRevenue *
        ((1 + userGrowth / 100) *
          (1 + seoGrowth / 100) *
          (1 + upsellRate / 100) *
          (1 + crossSellRate / 100) *
          (1 + additionalCustomers / 100) *
          (1 + additionalRevenuStreams / 100) *
          (1 + potentialData / 100)) -
      currentRevenue;
    console.log(
      increaseInMonthlyRevenue,
      "increaseInMonthlyRevenueasdasd",
      currentRevenue
    );
    const reductionInCost =
      currentRevenue *
        ((1 + cacReduction / 100) *
          (1 + marketingReduction / 100) *
          (1 + manpowerSavings / 100) *
          (1 + inventorySavings / 100)) -
      currentRevenue;
    const totalBenifits = increaseInMonthlyRevenue + reductionInCost;
    const breakEvenMonths = totalCost / totalBenifits;

    const yearOneROI = ((totalBenifits * 12 - totalCost) / totalCost) * 100;
    console.log(yearOneROI, "yearOneROIefwewer", monthlyBenefit, totalCost);

    setResults({
      totalROI: yearOneROI.toFixed(2),
      paybackPeriod: breakEvenMonths,
      netProfit: (
        monthlyBenefit * 36 -
        (totalDevCost + totalMaintainanceCost * 36)
      ).toFixed(2),
      totalDevCost: totalDevCost,
      totalMaintainanceCost: totalMaintainanceCost,
      totalCost: totalCost,
      increaseInMonthlyRevenue: increaseInMonthlyRevenue * 12,
      reductionInCost: reductionInCost * 12,
      totalBenifits: totalBenifits * 12,
      multiplierFactor: (totalBenifits * 12) / totalCost,
    });

    updateChart(totalDevCost, totalBenifits, projectDuration);
  });

  useEffect(() => {
    if (tab === "results") calculateROI();
  }, [tab,calculateROI]);
  
  const updateChart = (totalDevCost, monthlyBenefit, duration) => {
    const ctx = document.getElementById("roiChart")?.getContext("2d");
    if (ctx) {
      if (roiChart) roiChart.destroy();
      const months = Array.from({ length: 24 }, (_, i) => i + 1);
      console.log(months, "monthsasdaasd");
      const projectMonths = Array.from(
        { length: projectDuration + maintainanceDuration },
        (_, i) => i + 1
      );
      console.log(projectMonths, "projectMonthssdfsf");
      const cumulativeCosts = projectMonths.map((month) => {
        if (month <= projectDuration) {
          // During project duration, add development costs
          return currentMonthlyCost * month;
        } else {
          // During maintenance duration, add maintenance costs
          const maintenanceMonths = month - projectDuration;
          return (
            currentMonthlyCost * projectDuration + // Total cost during project
            monthlyMaintainanceCost * maintenanceMonths // Add maintenance cost for the remaining months
          );
        }
      });
      console.log(cumulativeCosts, "cumulativeCostsd");
      const cumulativeBenefits = months.map((month) => monthlyBenefit * month);

      setRoiChart(
        // new Chart(ctx, {
        //   type: "line",
        //   data: {
        //     labels: months,
        //     datasets: [
        //       // {
        //       //   label: "Cumulative Costs",
        //       //   data: cumulativeCosts,
        //       //   borderColor: "#e74c3c",
        //       //   fill: false,
        //       // },
        //       {
        //         label: "Cumulative Benefits",
        //         data: cumulativeBenefits,
        //         borderColor: "#2ecc71",
        //         fill: false,
        //       },
        //     ],
        //   },
        //   options: { responsive: true, maintainAspectRatio: false },
        // })

        new Chart(ctx, {
          type: "line",
          data: {
            labels: months,
            datasets: [
              {
                label: "Total Costs",
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
              x: {
                title: {
                  display: true,
                  text: "Months", // Add x-axis label here
                  color: "orange", // Customize label color
                  font: {
                    family: "'Arial', sans-serif", // Customize font
                    size: 14, // Customize font size
                    weight: "bold", // Customize font weight
                  },
                },
                ticks: {
                  color: "#666", // Set tick label color
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Dollars", // Add x-axis label here
                  color: "orange", // Customize label color
                  font: {
                    family: "'Arial', sans-serif", // Customize font
                    size: 14, // Customize font size
                    weight: "bold", // Customize font weight
                  },
                },
                ticks: {
                  color: "#666", // Set tick label color
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                  marginTop: "2px",
                },
              },
            },
          },
        })
        // new Chart(ctx, {
        //   type: "line",
        //   data: {
        //     labels: months, // Use `months` array with "M1", "M2", etc.
        //     datasets: [
        //       {
        //         label: "Cumulative Benefits",
        //         data: cumulativeBenefits,
        //         borderColor: "#2ecc71",
        //         fill: false,
        //       },
        //     ],
        //   },
        //   options: {
        //     responsive: true,
        //     maintainAspectRatio: false,
        //     scales: {
        //       x: {
        //         ticks: {
        //           color: "#666", // Set label color
        //           font: {
        //             family: "'Arial', sans-serif", // Font family
        //             size: 12, // Font size
        //             weight: "bold", // Font weight
        //           },
        //         },
        //         grid: {
        //           drawOnChartArea: false, // Only draw grid lines for ticks
        //           color: "#ddd",
        //         },
        //       },
        //       y: {
        //         ticks: {
        //           color: "#666",
        //           font: {
        //             family: "'Arial', sans-serif",
        //             size: 12,
        //           },
        //         },
        //         grid: {
        //           color: "#ddd",
        //         },
        //       },
        //     },
        //     plugins: {
        //       legend: {
        //         labels: {
        //           font: {
        //             size: 14,
        //           },
        //         },
        //       },
        //     },
        //   },
        // })
      );
    }
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.header}>OLVT IT Services ROI Calculator</div>
      <div className={styles.calculatorTabs}>
        {/* <button
          className={`${styles.tab} ${tab === "inputs" ? styles.active : ""}`}
          onClick={() => setTab("inputs")}
        >
          Inputs
        </button>
        <button
          className={`${styles.tab} ${tab === "results" ? styles.active : ""}`}
          onClick={() => setTab("results")}
        >
          Results
        </button> */}

        <button
          className={`${styles.tab} ${tab === "inputs" ? styles.active : ""}`}
          onClick={() => setTab("inputs")}
        >
          Inputs
        </button>
        <button
          className={`${styles.tab} ${tab === "results" ? styles.active : ""}`}
          onClick={() => setTab("results")}
        >
          Results
        </button>

        {/* <button
          className={`${styles.tab} ${
            tab === "assumptions" ? styles.active : ""
          }`}
          onClick={() => setTab("assumptions")}
        >
          Assumptions
        </button> */}
      </div>

      {tab === "inputs" && (
        <div id="inputs-section">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // Allows wrapping to next line
              gap: "20px", // Space between items
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flex: "1 1 calc(40% - 1rem)",
                background: "white",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                border: 2,
                borderColor: "#FBFCFE",
                boxShadow:
                  "4px 2px 8px 0 rgba(95, 157, 231, 0.48), -4px -2px 2px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <label>What type of service are you interested in?</label>
              {/* API Development
Design Services
Lead Magnet Development
Legacy Code Conversion
Cyber Security Services
Software Enhancement
Digital Transformation
Third Party Integrations
Cloud and Database Services
Maintenance Services
Digital Marketing Services
Business Consulting and Management Services
5:30
15. SaaS services
16. AI Developement */}
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="">-- Select Service Type --</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App (Android & iOS)</option>
                <option value="fintech">Fintech Solutions</option>
                <option value="fintech">API Development</option>
                <option value="fintech">Design Services</option>
                <option value="fintech">Lead Magnet Development</option>
                <option value="fintech">Legacy Code Conversion</option>
                <option value="fintech">Cyber Security Services</option>
                <option value="fintech">Software Enhancement</option>
                <option value="fintech">Digital Transformation</option>
                <option value="fintech">Third Party Integrations</option>
                <option value="fintech">Cloud and Database Services</option>
                <option value="fintech">Maintenance Services</option>
                <option value="fintech">Digital Marketing Services</option>
                <option value="fintech">
                  Business Consulting and Management Services
                </option>
                <option value="fintech">SaaS services</option>
                <option value="data-analytics">
                  Data Analytics and Visualization
                </option>
                <option value="iot-development">IoT Development</option>
                <option value="ar-vr">AR/VR Development</option>
                <option value="ai-ml">AI/ML Solutions</option>
                <option value="blockchain">Blockchain Development</option>
                <option value="devops">DevOps and Automation</option>
                <option value="quality-assurance">
                  Quality Assurance and Testing
                </option>
                <option value="it-support">
                  IT Support and Helpdesk Services
                </option>
                <option value="custom-software">
                  Custom Software Development
                </option>
                <option value="crm-development">CRM Development</option>
                <option value="erp-solutions">ERP Solutions</option>
                <option value="ecommerce">E-Commerce Solutions</option>
                <option value="game-development">Game Development</option>
                <option value="chatbot-development">Chatbot Development</option>
                <option value="big-data">Big Data Solutions</option>
                <option value="cloud-migration">
                  Cloud Migration Services
                </option>
                <option value="automation">Process Automation</option>
              </select>
            </div>

            <div
              style={{
                flex: "1 1 calc(40% - 1rem)",
                background: "white",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                border: 2,
                borderColor: "#FBFCFE",
                boxShadow:
                  "4px 2px 8px 0 rgba(95, 157, 231, 0.48), -4px -2px 2px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <label>
                {/* How long do you expect the project to take? (in months) */}
                How many months will the project take?
              </label>
              <input
                type="number"
                value={projectDuration}
                onChange={(e) => setProjectDuration(Number(e.target.value))}
              />
            </div>

            {/* <label>How many team members do you need?</label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
            /> */}
            <div
              style={{
                flex: "1 1 calc(40% - 1rem)",
                background: "white",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                border: 2,
                borderColor: "#FBFCFE",
                boxShadow:
                  "4px 2px 8px 0 rgba(95, 157, 231, 0.48), -4px -2px 2px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <label>What is monthly software development cost? ($)</label>
              <input
                type="number"
                value={currentMonthlyCost}
                onChange={(e) => setCurrentMonthlyCost(Number(e.target.value))}
              />
            </div>
            <div
              style={{
                flex: "1 1 calc(40% - 1rem)",
                background: "white",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                border: 2,
                borderColor: "#FBFCFE",
                boxShadow:
                  "4px 2px 8px 0 rgba(95, 157, 231, 0.48), -4px -2px 2px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <label>What is monthly software maintenance cost? ($)</label>
              <input
                type="number"
                value={monthlyMaintainanceCost}
                onChange={(e) =>
                  setMonthlyMaintainanceCost(Number(e.target.value))
                }
              />
            </div>
            <div
              style={{
                flex: "1 1 calc(40% - 1rem)",
                background: "white",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                border: 2,
                borderColor: "#FBFCFE",
                boxShadow:
                  "4px 2px 8px 0 rgba(95, 157, 231, 0.48), -4px -2px 2px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <label>How long do you want project to be maintained?</label>
              <input
                type="number"
                value={maintainanceDuration}
                onChange={(e) =>
                  setMaintainanceDuration(Number(e.target.value))
                }
              />
            </div>
            <div
              style={{
                flex: "1 1 calc(40% - 1rem)",
                background: "white",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                border: 2,
                borderColor: "#FBFCFE",
                boxShadow:
                  "4px 2px 8px 0 rgba(95, 157, 231, 0.48), -4px -2px 2px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <label>What is your current monthly revenue? ($)</label>
              <input
                type="number"
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(Number(e.target.value))} //
              />
            </div>
          </div>

          <div className={styles.assumptionBox}>
            <div
              style={{
                color: "#7E97B8",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              Growth Assumptions
            </div>
            <div style={{ padding: "16px" }}>
              <label>Expected Market Growth Rate (%)</label>
              <div className={styles.sliderWrapper}>
                <input
                  className={styles.userGrowthSlider}
                  type="range"
                  min="0"
                  max="100"
                  value={growthRate}
                  onChange={(e) => {
                    setGrowthRate(Number(e.target.value));
                    e.target.style.setProperty(
                      "--filled-percentage",
                      `${(e.target.value / e.target.max) * 100}%`
                    );
                  }}
                  style={updateSliderBackground(growthRate)}
                />
                <div
                  className={styles.tooltip}
                  style={{ left: `${growthRate}%` }}
                >
                  {growthRate}%
                </div>
              </div>
              <div className={styles.sliderValues}>
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div
              style={{
                color: "#7E97B8",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "36px",
              }}
            >
              Revenue Growth Factors
            </div>

            <div className={styles.revenueBox}>
              <div
                style={{ color: "#7E97B8", fontSize: "20px", fontWeight: 700 }}
              >
                Customer Growth
              </div>
              <div style={{ padding: "16px" }}>
                <div className={styles.sliderContainer}>
                  <label>Expected User Growth (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={userGrowth}
                      onChange={(e) => {
                        setUserGrowth(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(userGrowth)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${userGrowth}%` }}
                    >
                      {userGrowth}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>SEO-Led Territory Growth (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={seoGrowth}
                      onChange={(e) => {
                        setSeoGrowth(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(seoGrowth)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${seoGrowth}%` }}
                    >
                      {seoGrowth}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>Expected Upsell Rate (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={upsellRate}
                      onChange={(e) => {
                        setUpsellRate(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(upsellRate)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${upsellRate}%` }}
                    >
                      {upsellRate}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>Expected cross sell Rate (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={crossSellRate}
                      onChange={(e) => {
                        setCrossSellRate(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(crossSellRate)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${crossSellRate}%` }}
                    >
                      {crossSellRate}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>Increase in Margins (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={increaseInMargins}
                      onChange={(e) => {
                        setIncreaseInMargins(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(increaseInMargins)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${increaseInMargins}%` }}
                    >
                      {increaseInMargins}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>Additional offerings to Customers (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={additionalCustomers}
                      onChange={(e) => {
                        setAdditionalCustomers(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(additionalCustomers)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${additionalCustomers}%` }}
                    >
                      {additionalCustomers}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>Additional Revenue Streams (%)</label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={additionalRevenuStreams}
                      onChange={(e) => {
                        setAdditionalRevenuStreams(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(additionalRevenuStreams)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${additionalRevenuStreams}%` }}
                    >
                      {additionalRevenuStreams}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.sliderContainer}>
                  <label>
                    potential use of data insights and analytics (%)
                  </label>
                  <div className={styles.sliderWrapper}>
                    <input
                      className={styles.userGrowthSlider}
                      type="range"
                      min="0"
                      max="100"
                      value={potentialData}
                      onChange={(e) => {
                        setPotentialData(Number(e.target.value));
                        e.target.style.setProperty(
                          "--filled-percentage",
                          `${(e.target.value / e.target.max) * 100}%`
                        );
                      }}
                      style={updateSliderBackground(potentialData)}
                    />
                    <div
                      className={styles.tooltip}
                      style={{ left: `${potentialData}%` }}
                    >
                      {potentialData}%
                    </div>
                  </div>
                  <div className={styles.sliderValues}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.revenueBox}>
            <div
              style={{
                color: "#7E97B8",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              Cost Savings
            </div>
            <div style={{ padding: "16px" }}>
              <div className={styles.sliderContainer}>
                <label>Expected Reduction in CAC (%)</label>
                <div className={styles.sliderWrapper}>
                  <input
                    className={styles.userGrowthSlider}
                    type="range"
                    min="0"
                    max="100"
                    value={cacReduction}
                    onChange={(e) => {
                      setCacReduction(Number(e.target.value));
                      e.target.style.setProperty(
                        "--filled-percentage",
                        `${(e.target.value / e.target.max) * 100}%`
                      );
                    }}
                    style={updateSliderBackground(cacReduction)}
                  />
                  <div
                    className={styles.tooltip}
                    style={{ left: `${cacReduction}%` }}
                  >
                    {cacReduction}%
                  </div>
                </div>
                <div className={styles.sliderValues}>
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className={styles.sliderContainer}>
                <label>Marketing Cost Reduction (%)</label>
                <div className={styles.sliderWrapper}>
                  <input
                    className={styles.userGrowthSlider}
                    type="range"
                    min="0"
                    max="100"
                    value={marketingReduction}
                    onChange={(e) => {
                      setMarketingReduction(Number(e.target.value));
                      e.target.style.setProperty(
                        "--filled-percentage",
                        `${(e.target.value / e.target.max) * 100}%`
                      );
                    }}
                    style={updateSliderBackground(marketingReduction)}
                  />
                  <div
                    className={styles.tooltip}
                    style={{ left: `${marketingReduction}%` }}
                  >
                    {marketingReduction}%
                  </div>
                </div>
                <div className={styles.sliderValues}>
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className={styles.sliderContainer}>
                <label>Manpower Cost Savings (%)</label>
                <div className={styles.sliderWrapper}>
                  <input
                    className={styles.userGrowthSlider}
                    type="range"
                    min="0"
                    max="100"
                    value={manpowerSavings}
                    onChange={(e) => {
                      setManpowerSavings(Number(e.target.value));
                      e.target.style.setProperty(
                        "--filled-percentage",
                        `${(e.target.value / e.target.max) * 100}%`
                      );
                    }}
                    style={updateSliderBackground(manpowerSavings)}
                  />
                  <div
                    className={styles.tooltip}
                    style={{ left: `${manpowerSavings}%` }}
                  >
                    {manpowerSavings}%
                  </div>
                </div>
                <div className={styles.sliderValues}>
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className={styles.sliderContainer}>
                <label>Reduced Cost of Inventory (%)</label>
                <div className={styles.sliderWrapper}>
                  <input
                    className={styles.userGrowthSlider}
                    type="range"
                    min="0"
                    max="100"
                    value={inventorySavings}
                    onChange={(e) => {
                      setInventorySavings(Number(e.target.value));
                      e.target.style.setProperty(
                        "--filled-percentage",
                        `${(e.target.value / e.target.max) * 100}%`
                      );
                    }}
                    style={updateSliderBackground(inventorySavings)}
                  />
                  <div
                    className={styles.tooltip}
                    style={{ left: `${inventorySavings}%` }}
                  >
                    {inventorySavings}%
                  </div>
                </div>
                <div className={styles.sliderValues}>
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
          <button
            id="calculate_roi"
            style={{
              marginTop: 64,
              borderRadius: "12px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setTab("results")}
          >
            Calculate ROI
            <img
              src={img2}
              alt="img2"
              style={{ height: "24px", width: "24px" }}
            />
          </button>
        </div>
      )}

      {tab === "results" && (
        <div id="results-section">
          <div className={styles.summaryMetrics}>
            <div className={styles.metricCard}>
              <div className={styles.cardText}>Total DEV Cost</div>
              {/* <div className={styles.metricValue}>{results.totalDevCost}$</div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0}
                  end={results.totalDevCost}
                  duration={2} // Animation duration in seconds
                  separator=","
                  decimals={0} // Number of decimal points
                  suffix="$" // Add the dollar sign
                />
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.cardText}>Total Maintenance Cost</div>
              {/* <div className={styles.metricValue}>
                {results.totalMaintainanceCost}$
              </div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0}
                  end={results.totalMaintainanceCost}
                  duration={2} // Animation duration in seconds
                  separator=","
                  decimals={0} // Number of decimal points
                  suffix="$" // Add the dollar sign
                />
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.cardText}>Total Cost</div>
              {/* <div className={styles.metricValue}>{results.totalCost}$</div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0}
                  end={results.totalCost}
                  duration={2} // Animation duration in seconds
                  separator=","
                  decimals={0} // Number of decimal points
                  suffix="$" // Add the dollar sign
                />
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.cardText}>
                Increase In Revenue (1 Year)
              </div>
              {/* <div className={styles.metricValue}>
                ${Math.round(results.increaseInMonthlyRevenue / 100) * 100}
              </div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0} // Start counting from 0
                  end={Math.round(results.increaseInMonthlyRevenue / 100) * 100} // Rounded value to the nearest hundred
                  duration={2} // Duration of the animation in seconds
                  separator="," // Add commas as thousands separators
                  suffix="$" // Add the dollar sign as a suffix
                />
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.cardText}>Reduction In Cost (1 Year)</div>
              {/* <div className={styles.metricValue}>
                ${Math.round(results.reductionInCost / 100) * 100}
              </div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0} // Start counting from 0
                  end={Math.round(results.reductionInCost / 100) * 100} // Rounded value to the nearest hundred
                  duration={2} // Duration of the animation in seconds
                  separator="," // Add commas as thousands separators
                  suffix="$" // Add the dollar sign as a suffix
                />
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.cardText}>Total Benefits (1 Year)</div>
              {/* <div className={styles.metricValue}>
                ${Math.round(results.totalBenifits / 100) * 100}
              </div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0} // Start counting from 0
                  end={Math.round(results.totalBenifits / 100) * 100} // Rounded value to the nearest hundred
                  duration={2} // Duration of the animation in seconds
                  separator="," // Add commas as thousands separators
                  suffix="$" // Add the dollar sign as a suffix
                />
              </div>
            </div>

            {/* <div className={styles.metricCard}>
              <div>Break Even</div>
              <div className={styles.metricValue}>${results.netProfit}</div>
            </div> */}

            <div className={styles.metricCard}>
              <div className={styles.cardText}>Payback Period</div>
              {/* <div className={styles.metricValue}>
                {(Math.round(results.paybackPeriod * 100) / 100).toFixed(
                  2
                )}{" "}
                months
              </div> */}
              {/* <div className={styles.metricValue}>
                <CountUp
                  start={0} // Start the animation from 0
                  end={Math.round(results.paybackPeriod * 100) / 100} // Rounded value to two decimal places
                  duration={2} // Duration of the animation in seconds
                  decimals={2} // Set the number of decimal places to 2
                  separator="," // Add commas for thousands separators (optional)
                />{" "}
                months
              </div> */}
              <div className={styles.metricValue}>
                {isFinite(results.paybackPeriod) ? (
                  <CountUp
                    start={0}
                    end={Math.round(results.paybackPeriod * 100) / 100}
                    duration={2}
                    decimals={2}
                    separator=","
                  />
                ) : (
                  "0" // or "Not Available" or any other fallback message
                )}
                {" months"}
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.cardText}>Total ROI</div>
              {/* <div className={styles.metricValue}>{results.totalROI}%</div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0}
                  end={results.totalROI}
                  duration={2} // Animation duration in seconds
                  separator=","
                  decimals={0} // Number of decimal points
                  suffix="%" // Add the dollar sign
                />
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.cardText}>Multiplier Factor</div>
              {/* <div className={styles.metricValue}>
                {results.multiplierFactor.toFixed(2)}X
              </div> */}
              <div className={styles.metricValue}>
                <CountUp
                  start={0}
                  end={results.multiplierFactor.toFixed(2)}
                  duration={2} // Animation duration in seconds
                  separator=","
                  decimals={0} // Number of decimal points
                  suffix="X" // Add the dollar sign
                />
              </div>
            </div>
          </div>

          <div
            style={{
              color: "#7E97B8",
              marginTop: "52px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            Sensitivity Analysis
          </div>
          <div className={styles.chartContainer}>
            <canvas id="roiChart"></canvas>
          </div>
          <button
            style={{
              marginTop: 64,
              borderRadius: "12px",
              background: "white",
              color: "#F15D27",
              fontSize: "16px",
              fontWeight: "700",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setTab("inputs")}
          >
            <img
              src={img1}
              alt="img1"
              style={{ height: "24px", width: "24px" }}
            />
            change input
          </button>
        </div>
      )}

      {/* {tab === "assumptions" && (
        <div id="assumptions-section">
          <div className={styles.assumptionBox}>
            <h3>Default Assumptions</h3>
            <ul>
              <li>Average industry growth rate: 20% annually</li>
              <li>Market penetration rate: 5% in first year</li>
              <li>Customer retention rate: 85%</li>
              <li>Infrastructure costs: 15% of development cost</li>
            </ul>
          </div>
        </div>
      )} */}

      {/* <div className={styles.calculateButtonContainer}>
        <button onClick={() => setTab("results")}>Calculate ROI</button>
      </div> */}
      {/* <button style={{ marginTop: 64 }} onClick={() => setTab("results")}>
        Calculate ROI
      </button> */}
    </div>
  );
}

export default ROICalculator;
