def generate_recommendations(data, result):

    recommendations = []


    # Find major emission source
    sources = {
        "Transport": result["transport"],
        "Electricity": result["electricity"],
        "Food": result["food"],
        "Waste": result["waste"]
    }


    highest_source = max(
        sources,
        key=sources.get
    )


    # Priority recommendation

    if highest_source == "Transport":

        recommendations.append({
            "category": "Transport",
            "priority": "High",
            "message":
            "Transport is your biggest carbon contributor. "
            "Reduce private vehicle usage, use public transport, "
            "cycle, or carpool when possible."
        })


    elif highest_source == "Electricity":

        recommendations.append({
            "category": "Electricity",
            "priority": "High",
            "message":
            "Electricity consumption is your largest contributor. "
            "Use energy-efficient appliances and avoid unnecessary power usage."
        })


    elif highest_source == "Food":

        recommendations.append({
            "category": "Food",
            "priority": "Medium",
            "message":
            "Food choices contribute significantly to your footprint. "
            "Consider adding more plant-based meals."
        })


    elif highest_source == "Waste":

        recommendations.append({
            "category": "Waste",
            "priority": "Medium",
            "message":
            "Waste generation is affecting your footprint. "
            "Recycle, reuse, and reduce unnecessary waste."
        })


    # Additional personalized suggestions

    if data["vehicle"] in ["petrol_car", "diesel_car"]:

        recommendations.append({
            "category": "Transport",
            "priority": "Medium",
            "message":
            "Switching some trips to public transport or cycling can lower emissions."
        })


    if float(data["electricity"]) > 300:

        recommendations.append({
            "category": "Energy Saving",
            "priority": "Medium",
            "message":
            "Your electricity usage is high. Consider LED lights and efficient devices."
        })


    if data["diet"] == "high_meat":

        recommendations.append({
            "category": "Food",
            "priority": "Medium",
            "message":
            "Reducing meat consumption can significantly reduce food emissions."
        })


    # Overall footprint analysis

    if result["total_carbon"] > 500:

        recommendations.append({
            "category": "Overall",
            "priority": "High",
            "message":
            "Your carbon footprint is high. Focus on reducing the highest contributing categories first."
        })


    elif result["total_carbon"] < 200:

        recommendations.append({
            "category": "Overall",
            "priority": "Low",
            "message":
            "Great work! Your carbon footprint is relatively low."
        })


    return recommendations