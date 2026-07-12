def generate_recommendations(data, result):

    recommendations = []


    # Transport recommendations
    if data["vehicle"] == "petrol_car" or data["vehicle"] == "diesel_car":

        recommendations.append(
            "Consider using public transport, cycling, or walking for short distances to reduce transport emissions."
        )


    elif data["vehicle"] == "bike":

        recommendations.append(
            "Your bike usage is better than a car, but cycling for short trips can further reduce emissions."
        )


    elif data["vehicle"] == "cycle":

        recommendations.append(
            "Great choice! Cycling produces almost zero direct carbon emissions."
        )


    # Electricity recommendations
    if float(data["electricity"]) > 300:

        recommendations.append(
            "Your electricity usage is high. Try using energy-efficient appliances and reducing unnecessary power consumption."
        )

    else:

        recommendations.append(
            "Your electricity consumption is under control. Continue saving energy."
        )


    # Food recommendations
    if data["diet"] == "high_meat":

        recommendations.append(
            "Reducing meat consumption can significantly lower your food carbon footprint."
        )

    elif data["diet"] == "medium_meat":

        recommendations.append(
            "Try adding more vegetarian meals to reduce food emissions."
        )

    elif data["diet"] == "vegetarian" or data["diet"] == "vegan":

        recommendations.append(
            "Your diet choice helps reduce food-related emissions."
        )


    # Waste recommendations
    if float(data["waste"]) > 5:

        recommendations.append(
            "Reduce waste generation by recycling and reusing materials."
        )


    # Overall carbon score
    if result["total_carbon"] > 500:

        recommendations.append(
            "Your carbon footprint is high. Focus on reducing transport, electricity, and food emissions."
        )

    elif result["total_carbon"] < 200:

        recommendations.append(
            "Excellent! Your carbon footprint is relatively low."
        )


    return recommendations