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

    const response = await axios.post("https://ecolens-ai-ykno.onrender.com/calculate", formData);


    setResult(response.data);


  } catch (error) {

    console.log(error);


    setError(
      "Backend is not running. Start the server and try again"
    );


  } finally {

    setLoading(false);

  }

};













  return (



<div className="container">







<div className="hero">


<h1>
🌱 EcoLens AI
</h1>


<p className="subtitle">

AI-Powered Carbon Footprint Monitoring Platform

</p>


<p className="description">

Measure your carbon impact,
analyze emissions and get
personalized sustainability insights.

</p>


</div>









<div className="form-card">



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
Electricity Units/month
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








<button onClick={calculateCarbon}>

Calculate Footprint

</button>





</div>









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





<p className="wait-text">

Please wait...

</p>



</div>


)}









{error && (


<div className="error-card">


⚠️ {error}


</div>


)}









{result && (


<div className="result-section">



<h2>
📊 Carbon Dashboard
</h2>





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
          {/* Total Carbon Footprint */}


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

                "⚖️ Your footprint is moderate. Small changes can improve it."

                :

                "⚠️ Your footprint is high. Consider sustainable alternatives."

              }


            </div>


          </div>









          {/* Carbon Chart */}


          <CarbonChart result={result}/>









          {/* AI Carbon Intelligence */}


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

                {result.analysis?.eco_score}/100

              </p>





              <div className="score-progress">


                <div

                  className="score-progress-fill"

                  style={{
                    width:`${result.analysis?.eco_score}%`
                  }}

                >

                </div>


              </div>



            </div>








            <div className="impact-status">


            {

              result.analysis?.eco_score >= 80

              ?

              "🟢 Excellent Environmental Impact"


              :

              result.analysis?.eco_score >= 50

              ?

              "🟡 Moderate Environmental Impact"


              :

              "🔴 Needs Improvement"


            }


            </div>








            <div className="analysis-details">



              <p>

                📊

                {" "}

                <b>
                  Impact Level:
                </b>

                {" "}

                {result.analysis?.impact_level}


              </p>







              <p>

                ⚡

                {" "}

                <b>
                  Highest Contributor:
                </b>

                {" "}

                {result.analysis?.highest_contributor}


                {" "}

                (

                {result.analysis?.highest_contributor_value}

                kg CO₂)

              </p>




            </div>







            <div className="ai-message">


              💡

              {" "}

              {result.analysis?.analysis_message}


            </div>




          </div>


          )}









          {/* Eco Summary */}



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
                  {result.simulation?.potential_saving}
                  {" "}
                  kg CO₂
                </p>


              </div>





            </div>








            <div className="summary-message">


              💡

              Your next goal:

              Reduce your highest emission source
              to improve your environmental impact.


            </div>




          </div>









          {/* AI Recommendations */}



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
                    {/* Carbon Reduction Simulator */}


          {

          result.simulation && (


          <div className="recommendation">


            <h2>
              🌍 Carbon Reduction Simulator
            </h2>





            <p>

              🚘

              {" "}

              <b>
                Current Vehicle:
              </b>

              {" "}

              {result.simulation?.current_vehicle}


            </p>






            <p>

              🌱

              {" "}

              <b>
                Recommended Vehicle:
              </b>

              {" "}

              {result.simulation?.recommended_vehicle}


            </p>






            <p>

              📉

              {" "}

              <b>
                Potential Saving:
              </b>

              {" "}

              {result.simulation?.potential_saving}

              {" "}

              kg CO₂/month


            </p>




          </div>


          )

          }









          {/* PDF Report Button */}



          <button

            onClick={() =>
              downloadPDF(result, formData)
            }

          >

            📄 Download Carbon Report


          </button>







        </div>


      )}



    </div>


  );


}


export default App;