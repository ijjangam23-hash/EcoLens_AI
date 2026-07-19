import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import CarbonChart from "./CarbonChart";
import downloadPDF from "./PDFReport";
import ClimateCoach from "./ClimateCoach";

import{
  FaLeaf,
  FaCar,
    FaBolt,
  FaUtensils,
  FaChartLine,
  FaDownload,
  FaRobot,
  FaArrowDown,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function App() {


  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
// Premium UI States
const [heroLoaded, setHeroLoaded] = useState(false);
const [navbarScrolled, setNavbarScrolled] = useState(false);

const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({

    vehicle: "bike",

    distance: 10,

    days: 25,

    electricity: 100,

    diet: "vegetarian",

    waste: 2

  });





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };





useEffect(() => {
  setHeroLoaded(true);

  const handleScroll = () => {
    setNavbarScrolled(window.scrollY > 30);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const calculateCarbon = async () => {


    try {


      setLoading(true);

      setError("");



      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/calculate`,

        formData

      );



      setResult(response.data);



    } catch (err) {


      console.log(err);


      setError(

        "Backend connection failed. Please start the backend server."

      );



    } finally {


      setLoading(false);


    }


  };







  return (


    <>
<nav className={`navbar ${navbarScrolled ? "navbar-scrolled" : ""}`}>

  <div className="navbar-container">

    {/* Logo */}

    <div className="logo">

      <div className="logo-text">

        <h2>EcoLens AI</h2>

        <span>AI Sustainability Platform</span>

      </div>

    </div>

    {/* Navigation */}

{/* Desktop Navigation */}

<ul className={`nav-links ${menuOpen ? "active" : ""}`}>
  <li><a href="#">Home</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#calculator">Calculator</a></li>
  <li><a href="#dashboard">Dashboard</a></li>
</ul>

{/* Mobile Menu Button */}

<div
  className="menu-toggle"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FaTimes /> : <FaBars />}
</div>

  </div>

</nav>

  


      {/* ================= NAVBAR ================= */}




{/* ================= HERO SECTION ================= */}

<section
  className={`landing-hero ${heroLoaded ? "hero-loaded" : ""}`}
>

  <div className="hero-background">
    <div className="blur-circle circle1"></div>
    <div className="blur-circle circle2"></div>
    <div className="blur-circle circle3"></div>
  </div>

  <div className="hero-content container">

    {/* LEFT */}
    <div className="hero-left">

      <div className="hero-badge">
        🌍 AI Powered Sustainability Platform
      </div>

      <h1>
        Measure Your
        <br />
        <span>Carbon Footprint</span>
      </h1>

      <p>
        EcoLens AI helps you calculate your carbon
        emissions, discover sustainability insights,
        receive AI-powered recommendations and build
        a greener future.
      </p>

      <div className="hero-buttons">

        <button
          className="hero-primary-btn"
          onClick={() =>
            document
              .querySelector("#calculator")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          Calculate Footprint
        </button>

        <button
          className="hero-secondary-btn"
          onClick={() =>
            document
              .querySelector("#features")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          Learn More
        </button>

      </div>

    </div>

    {/* RIGHT */}
    <div className="hero-right">

      <div className="hero-info-card">

        <h3>🌱 EcoLens AI</h3>

        <div className="hero-stat">
          <span>Eco Score</span>
          <strong>96/100</strong>
        </div>

        <div className="hero-stat">
          <span>AI Accuracy</span>
          <strong>92%</strong>
        </div>

        <div className="hero-stat">
          <span>Carbon Analysis</span>
          <strong>Instant</strong>
        </div>

        <div className="hero-stat">
          <span>Reports</span>
          <strong>PDF Ready</strong>
        </div>

      </div>

    </div>

  </div>

</section>

      {/* ================= FEATURES ================= */}



     <section className="features" id="features"
>

<div className="feature-card">

  <div className="feature-icon">
    🌍
  </div>

  <h3>
    Carbon Tracking
  </h3>

  <p>
    Calculate emissions from transport,
    electricity, food and waste.
  </p>

</div>



<div className="feature-card">

  <div className="feature-icon">
    🤖
  </div>

  <h3>
    AI Intelligence
  </h3>

  <p>
    Get AI-based sustainability
    insights and suggestions.
  </p>

</div>



<div className="feature-card">

  <div className="feature-icon">
    📊
  </div>

  <h3>
    Analytics Dashboard
  </h3>

  <p>
    Visualize your carbon impact
    using interactive charts.
  </p>

</div>



<div className="feature-card">

  <div className="feature-icon">
    📄
  </div>

  <h3>
    PDF Reports
  </h3>

  <p>
    Generate detailed carbon
    footprint reports.
  </p>

</div>


</section>



{/* ================= INPUT FORM ================= */}

<section className="form-card" id="calculator">

  <h2>Enter Lifestyle Details</h2>
<p className="form-subtitle">
Fill in your lifestyle details to receive an AI-powered carbon footprint analysis and personalized sustainability recommendations.</p>
  <div className="form-grid">

    <div className="form-group">
      <label>Vehicle</label>
      <select
        name="vehicle"
        value={formData.vehicle}
        onChange={handleChange}
      >
        <option value="cycle">Cycle</option>
        <option value="bike">Bike</option>
        <option value="petrol_car">Petrol Car</option>
        <option value="diesel_car">Diesel Car</option>
        <option value="bus">Bus</option>
        <option value="electric_vehicle">Electric Vehicle</option>
      </select>
    </div>

    <div className="form-group">
      <label>Distance per Day (km)</label>
      <input
        type="number"
        name="distance"
        value={formData.distance}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Travel Days</label>
      <input
        type="number"
        name="days"
        value={formData.days}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Electricity Units / Month</label>
      <input
        type="number"
        name="electricity"
        value={formData.electricity}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Diet</label>
      <select
        name="diet"
        value={formData.diet}
        onChange={handleChange}
      >
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="medium_meat">Medium Meat</option>
        <option value="high_meat">High Meat</option>
      </select>
    </div>

    <div className="form-group">
      <label>Waste per Week (kg)</label>
      <input
        type="number"
        name="waste"
        value={formData.waste}
        onChange={handleChange}
      />
    </div>

  </div>

  <button onClick={calculateCarbon}>
    🌱 Calculate Carbon Footprint
  </button>

</section>




            {/* ================= LOADING ================= */}


      {loading && (


        <div className="ai-loading-card">


          <h2>

            🤖 AI Carbon Engine

          </h2>



          <p>

            Analyzing your lifestyle data...

          </p>





          <div className="ai-steps">


            <div>

              ✓ Calculating carbon emissions

            </div>



            <div>

              ✓ Finding highest contributor

            </div>



            <div>

              ✓ Generating sustainability insights

            </div>



          </div>





          <div className="loader"></div>




          <p>

            Please wait...

          </p>



        </div>


      )}







      {/* ================= ERROR ================= */}



      {error && (


        <div className="error-card">


          ⚠️ {error}


        </div>


      )}









      {/* ================= RESULT DASHBOARD ================= */}



      {result && (



        <section

          className="result-section"

          id="dashboard"

        >




         <div className="dashboard-header">

  <span className="dashboard-badge">
    🌍 AI Carbon Analysis
  </span>

  <h2>
    Your Carbon Footprint Dashboard
  </h2>

  <p>
    EcoLens AI has analyzed your lifestyle and generated a complete
    sustainability report. Explore your emissions, Eco Score,
    AI insights, recommendations, and carbon reduction opportunities.
  </p>

</div> 






          {/* Carbon Cards */}



          <div className="cards">





            <div className="carbon-card">

  <div className="card-top">

    <div className="icon">
      🚗
    </div>

    <span
  className={`card-status ${
    result.transport < 100
      ? "low"
      : result.transport < 250
      ? "moderate"
      : "high"
  }`}
>
  {result.transport < 100
    ? "🟢 Low"
    : result.transport < 250
    ? "🟡 Moderate"
    : "🔴 High"}
</span>

  </div>

  <h3>Transport</h3>

  <p className="carbon-value">
    {result.transport}
    <span> kg CO₂</span>
  </p>

  <div className="card-footer">

    Monthly Emission

  </div>

</div>








       <div className="carbon-card">

  <div className="card-top">

    <div className="icon">
      ⚡
    </div>

    <span
  className={`card-status ${
    result.electricity < 100
      ? "low"
      : result.electricity < 250
      ? "moderate"
      : "high"
  }`}
>
  {result.electricity < 100
    ? "🟢 Low"
    : result.electricity < 250
    ? "🟡 Moderate"
    : "🔴 High"}
</span>
  </div>

  <h3>Electricity</h3>

  <p className="carbon-value">
    {result.electricity}
    <span> kg CO₂</span>
  </p>

  <div className="card-footer">

    Monthly Emission

  </div>

</div>







<div className="carbon-card">

  <div className="card-top">

    <div className="icon">
      🍃
    </div>

  <span
  className={`card-status ${
    result.food < 100
      ? "low"
      : result.food < 250
      ? "moderate"
      : "high"
  }`}
>
  {result.food < 100
    ? "🟢 Low"
    : result.food < 250
    ? "🟡 Moderate"
    : "🔴 High"}
</span>

  </div>

  <h3>Food</h3>

  <p className="carbon-value">
    {result.food}
    <span> kg CO₂</span>
  </p>

  <div className="card-footer">

    Monthly Emission

  </div>

</div>








      <div className="carbon-card">

  <div className="card-top">

    <div className="icon">
      ♻️
    </div>

    <span
  className={`card-status ${
    result.waste < 50
      ? "low"
      : result.waste < 100
      ? "moderate"
      : "high"
  }`}
>
  {result.waste < 50
    ? "🟢 Low"
    : result.waste < 100
    ? "🟡 Moderate"
    : "🔴 High"}
</span>

  </div>

  <h3>Waste</h3>

  <p className="carbon-value">
    {result.waste}
    <span> kg CO₂</span>
  </p>

  <div className="card-footer">

    Monthly Emission

  </div>

</div>
</div>









          {/* ================= TOTAL CARBON ================= */}

<div className="total-carbon-card">

  <div className="total-header">

    <span className="total-badge">
      🌍 Monthly Carbon Report
    </span>

    <h2>Total Carbon Footprint</h2>

  </div>

  <div className="total-carbon-value">

    {result.total_carbon}

    <span> kg CO₂</span>

  </div>

  <div
    className={`impact-pill ${
      result.analysis?.impact_level === "Low"
        ? "low"
        : result.analysis?.impact_level === "Moderate"
        ? "moderate"
        : "high"
    }`}
  >

    {result.analysis?.impact_level === "Low"
      ? "🟢 Low Impact"
      : result.analysis?.impact_level === "Moderate"
      ? "🟡 Moderate Impact"
      : "🔴 High Impact"}

  </div>

  <p className="carbon-period">

    Monthly Environmental Impact

  </p>

  <div className="carbon-message">

    {result.analysis?.analysis_message}

  </div>

</div>








          {/* ================= CHART ================= */}



          <CarbonChart result={result} />









          {/* ================= AI CARBON INTELLIGENCE ================= */}

{/* ================= AI CARBON INTELLIGENCE ================= */}

{result.analysis && (

<div className="ai-analysis-card">

    <div className="ai-header">

        <span className="ai-badge">
            🤖 AI Powered Analysis
        </span>

        <h2>AI Carbon Intelligence</h2>

        <p>
            Our AI analyzed your lifestyle and generated an environmental
            assessment based on transport, electricity, food and waste emissions.
        </p>

    </div>

    <div className="eco-score-box">

        <div className="score-circle">

            <h1>{result.analysis.eco_score}</h1>

            <span>/100</span>

        </div>

        <div className="score-info">

            <h3>Eco Score</h3>

            <p>
                Higher scores indicate a more sustainable lifestyle.
            </p>

            <div className="score-progress">

                <div
                    className="score-progress-fill"
                    style={{
                        width: `${result.analysis.eco_score}%`,
                    }}
                ></div>

            </div>

        </div>

    </div>

    <div className="impact-status">

        {result.analysis.eco_score >= 80
            ? "🟢 Excellent Sustainability"
            : result.analysis.eco_score >= 50
            ? "🟡 Moderate Sustainability"
            : "🔴 Needs Improvement"}

    </div>

          
    <div className="analysis-grid">

        <div className="analysis-item">

            <div className="analysis-icon">
                📊
            </div>

            <h4>Impact Level</h4>

            <p>{result.analysis.impact_level}</p>

        </div>

        <div className="analysis-item">

            <div className="analysis-icon">
                ⚡
            </div>

            <h4>Highest Contributor</h4>

            <p>{result.analysis.highest_contributor}</p>

            <span>
                {result.analysis.highest_contributor_value} kg CO₂
            </span>

        </div>

    </div>

    <div className="ai-message">

        <h3>💡 AI Sustainability Insight</h3>

        <p>
            {result.analysis.analysis_message}
        </p>

    </div>

    <div className="ai-confidence">

        <div className="confidence-top">

            <h3>🤖 AI Confidence</h3>

            <strong>92%</strong>

        </div>

        <div className="confidence-bar">

            <div className="confidence-fill"></div>

        </div>

        <p>
            Analysis generated using transport, electricity,
            food and waste emission models.
        </p>

    </div>

</div>

)}
                


{/* ================= ECO SUMMARY ================= */}

<div className="eco-summary-card">

    <div className="summary-header">

        <span className="summary-badge">
            🌱 Sustainability Overview
        </span>

        <h2>Eco Summary</h2>

        <p>
            A quick overview of your environmental performance generated
            from your carbon footprint analysis.
        </p>

    </div>

    <div className="summary-grid">

        <div className="summary-item">

            <div className="summary-icon">🌍</div>

            <h4>Total Emissions</h4>

            <h3>{result.total_carbon} kg CO₂</h3>

            <span>Monthly Carbon Output</span>

        </div>

        <div className="summary-item">

            <div className="summary-icon">⭐</div>

            <h4>Eco Score</h4>

            <h3>{result.analysis?.eco_score}/100</h3>

            <span>Overall Sustainability</span>

        </div>

        <div className="summary-item">

            <div className="summary-icon">⚡</div>

            <h4>Highest Contributor</h4>

            <h3>{result.analysis?.highest_contributor}</h3>

            <span>Main Emission Source</span>

        </div>

        <div className="summary-item">

            <div className="summary-icon">📉</div>

            <h4>Saving Potential</h4>

            <h3>{result.simulation?.potential_saving || 0} kg CO₂</h3>

            <span>Possible Monthly Reduction</span>

        </div>

    </div>

    <div className="summary-message">

        <h3>💡 AI Recommendation</h3>

        <p>
            Focus on reducing your highest emission source. Small lifestyle
            improvements every month can significantly improve your Eco Score
            and reduce your environmental impact.
        </p>

    </div>

</div>








     

{/* ================= AI RECOMMENDATIONS ================= */}

<div className="recommendation-section">

    <div className="recommendation-header">

        <span className="recommendation-badge">
            🌱 Personalized Suggestions
        </span>

        <h2>AI Sustainability Recommendations</h2>

        <p>
            Based on your carbon footprint analysis, EcoLens AI recommends
            the following actions to reduce emissions and improve your Eco Score.
        </p>

    </div>

    <div className="recommendation-grid">

        {result.recommendations?.map((item, index) => (

            <div className="recommendation-card" key={index}>

                <div className="recommendation-icon">

                    {index === 0
                        ? "🚗"
                        : index === 1
                        ? "⚡"
                        : index === 2
                        ? "🥗"
                        : "♻️"}

                </div>

                <div className="recommendation-content">

                    <h3>

                        {index === 0
                            ? "Transport"
                            : index === 1
                            ? "Energy"
                            : index === 2
                            ? "Food"
                            : "Waste"}

                    </h3>

                    <p>{item}</p>

                </div>

            </div>

        ))}

    </div>

</div>








      {/* ================= CARBON REDUCTION SIMULATOR ================= */}



{/* ================= CARBON REDUCTION SIMULATOR ================= */}

{result.simulation && (

<div className="simulator-card">

    <div className="simulator-header">

        <span className="simulator-badge">
            🌍 AI Prediction Engine
        </span>

        <h2>Carbon Reduction Simulator</h2>

        <p>
            Simulate smarter lifestyle choices and see how much carbon
            you could save every month with AI-powered recommendations.
        </p>

    </div>

    <div className="simulation-grid">

        <div className="simulation-box">

            <div className="simulation-icon">
                🚘
            </div>

            <h3>Current Choice</h3>

            <p>{result.simulation.current_vehicle}</p>

            <span>Your current transport option</span>

        </div>

        <div className="simulation-box">

            <div className="simulation-icon">
                🌱
            </div>

            <h3>AI Recommendation</h3>

            <p>{result.simulation.recommended_vehicle}</p>

            <span>Cleaner alternative suggested by AI</span>

        </div>

        <div className="simulation-box">

            <div className="simulation-icon">
                📉
            </div>

            <h3>Potential Saving</h3>

            <p>{result.simulation.potential_saving} kg CO₂</p>

            <span>Estimated monthly reduction</span>

        </div>

    </div>

    <div className="simulation-message">

        <h3>🤖 AI Insight</h3>

        <p>
            Switching to sustainable transportation can significantly
            reduce your carbon emissions and improve your Eco Score over time.
        </p>

    </div>

</div>

)}

  
{/* ================= PDF DOWNLOAD ================= */}

<div className="pdf-section">

    <div className="pdf-content">

        <span className="pdf-badge">
            📄 Professional Report
        </span>

        <h2>Download Your Carbon Report</h2>

        <p>
            Export a professionally formatted PDF containing your carbon
            footprint analysis, Eco Score, AI insights, recommendations,
            and sustainability summary.
        </p>

    </div>

    <button
        className="pdf-download-btn"
        onClick={() => {

            try{

                downloadPDF(result, formData);

            }catch(error){

                console.error(error);

                alert("PDF generation failed.");

            }

        }}
    >

        📥 Download PDF Report

    </button>

</div>








    </section>



  )}

  
  {/* ================= FOOTER ================= */}
<footer className="footer">

    {/* Top */}

    <div className="footer-top">

        <h2>🌱 EcoLens AI</h2>

        <p>
            EcoLens AI is an AI-powered sustainability platform that helps users
            measure, understand and reduce their carbon footprint through
            intelligent analysis, interactive dashboards and personalized
            recommendations.
        </p>

    </div>

    {/* Bottom */}

    <div className="footer-bottom-content">

        <div className="footer-links">

            <h3>Quick Links</h3>

            <a href="#">Home</a>
            <a href="#features">Features</a>
            <a href="#calculator">Calculator</a>
            <a href="#dashboard">Dashboard</a>

        </div>

        <div className="footer-social">

            <h3>Connect</h3>

            <div className="social-icons">

                <a href="https://github.com/" target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>

                <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>

                <a href="#" target="_blank" rel="noreferrer">
                    <FaGlobe />
                </a>

            </div>

        </div>

    </div>

    <div className="footer-bottom">

        © {new Date().getFullYear()} EcoLens AI • Built with React, Flask & AI • Designed by Ishwary Jangam

    </div>

</footer>
</>



  );


}



export default App;