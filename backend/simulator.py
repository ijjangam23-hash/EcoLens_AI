def calculate_savings(data, current_result):

    current_transport = current_result["transport"]


    vehicle = data["vehicle"]


    suggestions = {

        "petrol_car": {
            "alternative": "cycle",
            "factor": 0.0
        },

        "diesel_car": {
            "alternative": "cycle",
            "factor": 0.0
        },

        "bike": {
            "alternative": "cycle",
            "factor": 0.0
        },

        "bus": {
            "alternative": "cycle",
            "factor": 0.0
        },

        "electric_vehicle": {
            "alternative": "cycle",
            "factor": 0.0
        },

        "cycle": {
            "alternative": "Already using sustainable transport",
            "factor": 0.0
        }

    }



    option = suggestions.get(vehicle)


    if option is None:

        return {

            "message": "No simulation available"

        }



    new_transport = (
        data["distance"]
        *
        data["days"]
        *
        option["factor"]
    )



    saved = current_transport - new_transport



    if saved < 0:

        saved = 0



    return {

        "current_vehicle": vehicle,

        "recommended_vehicle": option["alternative"],

        "current_transport_emission": current_transport,

        "potential_saving": round(saved,2),

        "message":
        f"Switching to {option['alternative']} can reduce transport emissions."

    }