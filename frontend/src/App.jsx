import { useState } from "react";
import axios from "axios";
import "./App.css";

import CarbonChart from "./CarbonChart";
import downloadPDF from "./PDFReport";


function App() {


  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



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


    <div className="container">





      {/* ================= NAVBAR ================= */}


      <nav className="navbar">



        <div className="logo">

          🌱 EcoLens AI

        </div>




        <div className="nav-links">


          <a href="#">

            Home

          </a>



          <a href="#features">

            Features

          </a>



          <a href="#calculator">

            Calculator

          </a>



          <a href="#dashboard">

            Dashboard

          </a>



        </div>



      </nav>







      {/* ================= HERO SECTION ================= */}



      <section className="landing-hero">


  <div className="hero-badge">

    🌍 AI Powered Sustainability Platform

  </div>



  <h1>

    🌱 EcoLens AI

  </h1>



  <h2>

    Understand Your Carbon Impact.
    <br />
    Build a Greener Future With AI.

  </h2>




  <p>

    Track your carbon footprint,
    discover your biggest emission sources,
    and receive intelligent recommendations
    to reduce your environmental impact.

  </p>




  <div className="hero-buttons">


    <button

      onClick={() =>
        document
          .querySelector("#calculator")
          ?.scrollIntoView({
            behavior:"smooth"
          })
      }

    >

      Calculate Footprint 🌱

    </button>



    <button

      className="secondary-btn"

      onClick={() =>
        document
          .querySelector("#features")
          ?.scrollIntoView({
            behavior:"smooth"
          })
      }

    >

      Explore Features

    </button>



  </div>



</section>







      {/* ================= FEATURES ================= */}



     <section
  className="features"
  id="features"
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



      <section

        className="form-card"

        id="calculator"

      >



        <h2>

          Enter Lifestyle Details

        </h2>







        <label>

          Vehicle

        </label>



        <select

          name="vehicle"

          value={formData.vehicle}

          onChange={handleChange}

        >



          <option value="cycle">

            Cycle

          </option>



          <option value="bike">

            Bike

          </option>



          <option value="petrol_car">

            Petrol Car

          </option>



          <option value="diesel_car">

            Diesel Car

          </option>



          <option value="bus">

            Bus

          </option>



          <option value="electric_vehicle">

            Electric Vehicle

          </option>



        </select>







        <label>

          Distance per day (km)

        </label>



        <input

          type="number"

          name="distance"

          value={formData.distance}

          onChange={handleChange}

        />







        <label>

          Travel Days

        </label>



        <input

          type="number"

          name="days"

          value={formData.days}

          onChange={handleChange}

        />







        <label>

          Electricity Units / Month

        </label>



        <input

          type="number"

          name="electricity"

          value={formData.electricity}

          onChange={handleChange}

        />







        <label>

          Diet

        </label>



        <select

          name="diet"

          value={formData.diet}

          onChange={handleChange}

        >



          <option value="vegan">

            Vegan

          </option>



          <option value="vegetarian">

            Vegetarian

          </option>



          <option value="medium_meat">

            Medium Meat

          </option>



          <option value="high_meat">

            High Meat

          </option>



        </select>







        <label>

          Waste per week (kg)

        </label>



        <input

          type="number"

          name="waste"

          value={formData.waste}

          onChange={handleChange}

        />







        <button

          onClick={calculateCarbon}

        >

          Calculate Footprint 🌱

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




          <h2>

            📊 Carbon Dashboard

          </h2>







          {/* Carbon Cards */}



          <div className="cards">





            <div className="carbon-card">


              <div className="icon">

                🚗

              </div>



              <h3>

                Transport

              </h3>



              <p className="carbon-value">

                {result.transport}

              </p>



              <span>

                kg CO₂

              </span>



            </div>








            <div className="carbon-card">


              <div className="icon">

                ⚡

              </div>



              <h3>

                Electricity

              </h3>



              <p className="carbon-value">

                {result.electricity}

              </p>



              <span>

                kg CO₂

              </span>



            </div>








            <div className="carbon-card">


              <div className="icon">

                🍃

              </div>



              <h3>

                Food

              </h3>



              <p className="carbon-value">

                {result.food}

              </p>



              <span>

                kg CO₂

              </span>



            </div>








            <div className="carbon-card">


              <div className="icon">

                ♻️

              </div>



              <h3>

                Waste

              </h3>



              <p className="carbon-value">

                {result.waste}

              </p>



              <span>

                kg CO₂

              </span>



            </div>





          </div>









          {/* ================= TOTAL CARBON ================= */}




          <div className="total-carbon-card">



            <h2>

              🌍 Total Carbon Footprint

            </h2>





            <p className="total-carbon-value">


              {result.total_carbon} kg CO₂


            </p>





            <p className="carbon-period">


              Monthly Environmental Impact


            </p>






            <div className="carbon-message">


              {

                result.analysis?.impact_level === "Low"

                  ?

                  "🌱 Excellent! Your lifestyle has a low carbon impact."

                  :

                  result.analysis?.impact_level === "Moderate"

                    ?

                    "⚖️ Your footprint is moderate. Small improvements can reduce it."

                    :

                    "⚠️ Your footprint is high. Sustainable changes are recommended."

              }



            </div>




          </div>









          {/* ================= CHART ================= */}



          <CarbonChart result={result} />









          {/* ================= AI CARBON INTELLIGENCE ================= */}



          {result.analysis && (



            <div className="ai-analysis-card">





              <h2>

                🤖 AI Carbon Intelligence

              </h2>









              <div className="eco-score-box">



                <h3>

                  🌱 Eco Score

                </h3>





                <p className="eco-score-number">


                  {result.analysis.eco_score}

                  <span>

                    /100

                  </span>


                </p>






                <div className="score-progress">


                  <div


                    className="score-progress-fill"


                    style={{


                      width:

                        `${result.analysis.eco_score}%`


                    }}


                  >


                  </div>



                </div>





                <p>

                  AI calculated sustainability score

                </p>



              </div>









              <div className="impact-status">


                {


                  result.analysis.eco_score >= 80

                    ?

                    "🟢 Excellent Environmental Impact"


                    :

                    result.analysis.eco_score >= 50

                      ?

                      "🟡 Moderate Environmental Impact"


                      :

                      "🔴 Needs Improvement"



                }



              </div>









              <div className="analysis-details">





                <div>


                  <p>


                    📊

                    <br />


                    <b>

                      Impact Level

                    </b>


                    <br />


                    {result.analysis.impact_level}


                  </p>


                </div>







                <div>


                  <p>


                    ⚡

                    <br />


                    <b>

                      Highest Contributor

                    </b>


                    <br />



                    {result.analysis.highest_contributor}



                    <br />


                    {result.analysis.highest_contributor_value}

                    kg CO₂



                  </p>


                </div>




              </div>









              <div className="ai-message">



                <h3>

                  💡 AI Sustainability Insight

                </h3>




                <p>

                  {result.analysis.analysis_message}

                </p>



              </div>








              <div className="ai-confidence">



                <h3>

                  🤖 AI Confidence

                </h3>




                <p>

                  92%

                </p>



                <span>

                  Based on transport, electricity,

                  food and waste analysis.

                </span>



              </div>






            </div>



          )}
                {/* ================= ECO SUMMARY ================= */}



      <div className="eco-summary-card">



        <h2>

          🌱 Eco Summary

        </h2>





        <div className="summary-grid">





          <div className="summary-item">


            <h3>

              🌍 Total Emission

            </h3>



            <p>

              {result.total_carbon} kg CO₂

            </p>


          </div>








          <div className="summary-item">


            <h3>

              ⭐ Eco Score

            </h3>



            <p>

              {result.analysis?.eco_score}/100

            </p>


          </div>








          <div className="summary-item">


            <h3>

              ⚡ Main Contributor

            </h3>



            <p>

              {result.analysis?.highest_contributor}

            </p>


          </div>








          <div className="summary-item">


            <h3>

              📉 Saving Potential

            </h3>



            <p>


              {result.simulation?.potential_saving || 0}

              {" "}kg CO₂


            </p>


          </div>





        </div>







        <div className="summary-message">


          💡

          Your next goal:

          Reduce your highest emission source

          to improve your Eco Score.



        </div>






      </div>









      {/* ================= AI RECOMMENDATIONS ================= */}



      <div className="recommendation">





        <h2>

          🌱 AI Sustainability Recommendations

        </h2>






        <div className="recommendation-grid">



          {

            result.recommendations?.map(

              (item,index)=>(


                <div

                  className="recommendation-card"

                  key={index}

                >



                  <div className="recommendation-icon">


                    {

                      index === 0

                        ?

                        "🚗"

                        :

                        index === 1

                          ?

                          "⚡"

                          :

                          "🌱"

                    }


                  </div>





                  <p>

                    {item}

                  </p>



                </div>


              )


            )


          }



        </div>





      </div>









      {/* ================= CARBON REDUCTION SIMULATOR ================= */}





      {

        result.simulation && (



          <div className="simulator-card">





            <h2>

              🌍 AI Carbon Reduction Simulator

            </h2>







            <div className="simulation-grid">





              <div className="simulation-box">


                <h3>

                  🚘 Current Choice

                </h3>



                <p>

                  {result.simulation.current_vehicle}

                </p>



                <span>

                  Current lifestyle option

                </span>



              </div>








              <div className="simulation-box">


                <h3>

                  🌱 Recommended Choice

                </h3>



                <p>

                  {result.simulation.recommended_vehicle}

                </p>



                <span>

                  AI suggested alternative

                </span>



              </div>








              <div className="simulation-box">


                <h3>

                  📉 Saving Potential

                </h3>



                <p>

                  {result.simulation.potential_saving}

                </p>



                <span>

                  kg CO₂/month

                </span>



              </div>





            </div>









            <div className="simulation-message">


              🤖 AI Prediction:


              <br />


              Switching to sustainable choices

              can reduce emissions and improve

              your Eco Score.



            </div>






          </div>



        )


      }









      {/* ================= PDF REPORT ================= */}





      <button

onClick={() => {

  try {

    console.log("PDF Button Clicked");

    console.log(result);

    downloadPDF(result, formData);


  } catch(error) {

    console.error(
      "PDF Generation Error:",
      error
    );

    alert(
      "PDF generation failed. Check console."
    );

  }

}}

>

📄 Download Carbon Report

</button>









    </section>



  )}





</div>



  );


}



export default App;