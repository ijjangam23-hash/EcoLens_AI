# carbon_engine.py

# Emission factors (kg CO2 per unit)

TRANSPORT_FACTORS = {
    "cycle": 0.0,
    "petrol_car": 0.192,
    "diesel_car": 0.171,
    "bike": 0.103,
    "bus": 0.089,
    "electric_vehicle": 0.05
}


FOOD_FACTORS = {
    "high_meat": 250,
    "medium_meat": 150,
    "vegetarian": 100,
    "vegan": 60
}



def calculate_transport_emission(vehicle, distance_per_day, days):
    """
    Calculate monthly transport emissions
    """

    factor = TRANSPORT_FACTORS.get(vehicle, 0)

    emission = distance_per_day * days * factor

    return round(emission, 2)



def calculate_electricity_emission(units):
    """
    Calculate monthly electricity emissions
    """

    emission_factor = 0.82

    emission = units * emission_factor

    return round(emission, 2)



def calculate_food_emission(diet):
    """
    Calculate monthly food emissions
    """

    emission = FOOD_FACTORS.get(diet, 0)

    return emission



def calculate_waste_emission(waste_per_week):
    """
    Calculate monthly waste emissions
    """

    emission = waste_per_week * 52 * 0.5 / 12

    return round(emission, 2)



def calculate_total_carbon(data):

    distance = float(data.get("distance", 0))
    days = float(data.get("days", 0))
    electricity_units = float(data.get("electricity", 0))
    waste = float(data.get("waste", 0))


    transport = calculate_transport_emission(
        data.get("vehicle", "bike"),
        distance,
        days
    )


    electricity = calculate_electricity_emission(
        electricity_units
    )


    food = calculate_food_emission(
        data.get("diet", "vegetarian")
    )


    waste_emission = calculate_waste_emission(
        waste
    )


    total = (
        transport +
        electricity +
        food +
        waste_emission
    )


    return {
        "transport": transport,
        "electricity": electricity,
        "food": food,
        "waste": waste_emission,
        "total_carbon": round(total, 2)
    }