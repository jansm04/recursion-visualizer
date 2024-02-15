import config
import requests
import json
import time
import parse as pc
import setup as sp

key = config.API_KEY

def submit(code):
    url = "https://judge0-ce.p.rapidapi.com/submissions"
    querystring = {"fields":"*"}
    
    code = sp.setup(pc.parseCode(code))
    code = code.replace("\\n", "\n")
    print(code)
    try:
        payload = {
            "language_id": 71,
            "source_code": code
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
    except:
        print("An error occurred while creating the code submission.")
        return False
    
    # wait 1 second before getting result
    time.sleep(1)
    try:
        token = responseText['token']
        url = "https://judge0-ce.p.rapidapi.com/submissions/" + token
        headers = {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)
        responseText = json.loads(response.text)
        status = responseText['status']
        id = status['id']
        if (id != 3):
            print(responseText)
            return False
        outputText = responseText['stdout']
        return outputText
    except:
        print("An error occurred while getting the code submission.")
        return False