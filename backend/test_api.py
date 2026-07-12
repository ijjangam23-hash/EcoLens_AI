import requests

data = {
    "vehicle": "bike",
    "distance": 15,
    "days": 25,
    "electricity": 150,
    "diet": "vegetarian",
    "waste": 2
}

response = requests.post(
    "http://127.0.0.1:5000/calculate",
    json=data
)

print(response.json())