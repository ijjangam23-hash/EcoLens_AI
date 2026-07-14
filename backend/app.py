from flask import Flask, request, jsonify
from flask_cors import CORS

from carbon_engine import calculate_total_carbon
from recommendation_engine import generate_recommendations
from analysis_engine import analyze_carbon
from simulator import generate_simulation
app = Flask(__name__)

CORS(app)



@app.route("/")
def home():

    return "EcoLens AI Backend Running"



@app.route("/calculate", methods=["POST"])
def calculate():

    try:

        data = request.json

        print("Received Data:", data)



        # Get Inputs

        vehicle = data.get("vehicle", "bike")

        distance = float(
            data.get("distance", 0)
        )

        days = int(
            data.get("days", 0)
        )

        electricity = float(
            data.get("electricity", 0)
        )

        diet = data.get(
            "diet",
            "vegetarian"
        )

        waste = float(
            data.get("waste", 0)
        )




        # Vehicle Emission Factors

        vehicle_factor = {

            "cycle": 0,

            "bike": 0.05,

            "petrol_car": 0.21,

            "diesel_car": 0.18,

            "bus": 0.08,

            "electric_vehicle": 0.03

        }




        transport = (

            distance *
            days *
            vehicle_factor.get(
                vehicle,
                0.05
            )

        )





        # Electricity

        electricity_emission = (
            electricity * 0.82
        )





        # Food

        food_factor = {


            "vegan": 40,

            "vegetarian": 60,

            "medium_meat": 100,

            "high_meat": 150

        }



        food = food_factor.get(
            diet,
            60
        )






        # Waste

        waste_emission = (

            waste * 4.33

        )






        # Total

        total_carbon = (

            transport +

            electricity_emission +

            food +

            waste_emission

        )






        # Eco Score

        eco_score = int(

            max(

                0,

                min(

                    100,

                    100 - (total_carbon / 10)

                )

            )

        )






        if eco_score >= 80:

            impact_level = "Low"


        elif eco_score >= 50:

            impact_level = "Moderate"


        else:

            impact_level = "High"







        # Find highest contributor

        contributors = {


            "Transport": transport,

            "Electricity": electricity_emission,

            "Food": food,

            "Waste": waste_emission

        }



        highest = max(

            contributors,

            key=contributors.get

        )






        # Recommendations


        recommendations = []



        if highest == "Transport":

            recommendations.append(

                "Reduce vehicle usage and prefer cycling or public transport."

            )

        else:

            recommendations.append(

                "Your transport emissions are under control."

            )




        if electricity_emission > 100:

            recommendations.append(

                "Reduce electricity consumption using energy efficient devices."

            )

        else:

            recommendations.append(

                "Your electricity consumption is under control. Continue saving energy."

            )




        if food > 100:

            recommendations.append(

                "Consider reducing meat consumption to lower food emissions."

            )

        else:

            recommendations.append(

                "Your diet choice helps reduce food-related emissions."

            )







        # Simulation


        simulation = {


            "current_vehicle": vehicle,


            "recommended_vehicle": "cycle",


            "potential_saving": round(

                transport * 0.7,

                2

            )

        }








        return jsonify({


            "transport": round(
                transport,
                2
            ),


            "electricity": round(
                electricity_emission,
                2
            ),


            "food": round(
                food,
                2
            ),


            "waste": round(
                waste_emission,
                2
            ),


            "total_carbon": round(
                total_carbon,
                2
            ),




            "analysis": {


                "eco_score": eco_score,


                "impact_level": impact_level,


                "highest_contributor": highest,


                "highest_contributor_value": round(
                    contributors[highest],
                    2
                ),


                "analysis_message":
                "AI analysis completed successfully."

            },





            "recommendations": recommendations,





            "simulation": simulation



        })






    except Exception as e:


        print(
            "Backend Error:",
            e
        )


        return jsonify({

            "error": str(e)

        }),500







if __name__ == "__main__":


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )