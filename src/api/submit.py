import config
import requests
import json
import time

key = config.API_KEY

def submit(code):
    url = "https://judge0-ce.p.rapidapi.com/submissions"

    querystring = {"fields":"*"}
    xtra = """print("Result: " + str(fib(4)))"""

    inputCode = code[2:len(code)-1] + xtra
    parsedCode = inputCode.replace("\\\\n", "\\n")
    print(parsedCode)
    payload = {
        "language_id": 71,
        "source_code": parsedCode
    }
    headers = {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }
    response = requests.post(url, json=payload, headers=headers, params=querystring)
    responseText = json.loads(response.text)
    print(responseText)
    time.sleep(2)
    try:
        token = responseText['token']
        url = "https://judge0-ce.p.rapidapi.com/submissions/" + token
        headers = {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)
        print(response.json())
    except:
        print("An error occurred while submitting the code.")
        return False