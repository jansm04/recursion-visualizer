import config
import requests
import json
import time
import setup as sp
import extract as ex

key = config.API_KEY

def submit(code):
    url = "https://judge0-ce.p.rapidapi.com/submissions"
    querystring = {"fields":"*"}
    
    code = sp.setup(code)
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

        # check if post request returns a quota message instead of a token
        if 'message' in responseText:
            return (False, "This site has reached the maximum daily quota for code submissions! Please try again later.")
        if 'token' in responseText:
            print('Recieved submission token.')
        
    except:
        return (False, "A problem occurred while creating the code submission.")
    
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
        print(responseText)
        status = responseText['status']
        id = status['id']

        # if code execution exceeds time limit
        if id == 11:
            return (False, "Time limit exceeded! Try a lower argument.")
        
        # if any other error occurred
        if id != 3:
            message = ex.extract_err_message(responseText['stderr'])
            return (False, message)
        
        outputText = responseText['stdout']
        print("Size of text: " + str(len(outputText)))
        print(outputText)

        # if function had to be returned manually
        if 'j7Kbx9p1s' in outputText:
            return (False, "Please don't try an infinite loop...")
        
        # if function went down too many levels
        if 'h6Bv1yO2n' in outputText:
            return (False, "Too much recursion! Try a lower argument.")
        
        return (True, outputText)
    except:
        return (False, "A problem occurred while getting the code submission.")