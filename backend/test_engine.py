from carbon_engine import calculate_total_carbon


user_data = {
    "vehicle": "petrol_car",
    "distance": 20,
    "days": 25,
    "electricity": 200,
    "diet": "vegetarian",
    "waste": 3
}


result = calculate_total_carbon(user_data)

print(result)