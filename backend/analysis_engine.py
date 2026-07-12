def generate_analysis(result):

    total = result["total_carbon"]

    categories = {
        "Transport": result["transport"],
        "Electricity": result["electricity"],
        "Food": result["food"],
        "Waste": result["waste"]
    }


    # Find highest emission source

    highest_source = max(
        categories,
        key=categories.get
    )


    highest_value = categories[highest_source]


    # Calculate Eco Score

    if total <= 200:
        score = 90

    elif total <= 400:
        score = 75

    elif total <= 600:
        score = 60

    else:
        score = 40



    # Impact level

    if score >= 85:
        level = "Low"

    elif score >= 60:
        level = "Moderate"

    else:
        level = "High"



    # AI analysis message

    messages = {

        "Transport":
        "Your transportation choices are the biggest contributor. Consider cycling, walking, or public transport for short distances.",

        "Electricity":
        "Your electricity consumption has the highest impact. Try reducing unnecessary power usage and using energy-efficient devices.",

        "Food":
        "Your food habits contribute significantly. More sustainable food choices can reduce your footprint.",

        "Waste":
        "Waste generation is your major contributor. Focus on recycling and reducing unnecessary waste."
    }



    return {

        "eco_score": score,

        "impact_level": level,

        "highest_contributor": highest_source,

        "highest_contributor_value": highest_value,

        "analysis_message": messages[highest_source]

    }