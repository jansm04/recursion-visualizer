from flask import Flask
from flask import request
from flask_cors import CORS
import submit as sb
import verify as vf
import parse as pc
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def transform():
    body = str(request.data)
    code = pc.parseCode(body)
    verification = vf.verify(code)
    isValid, message = verification[0], verification[1]
    if isValid:
        result = sb.submit(code)
        isAccepted, text, fnName = result[0], result[1], result[2]
        obj = {
            "type": isAccepted, 
            "text": text,
            "functionName": fnName
        }
    else:
        obj = {
            "type": False,
            "text": message,
            "functionName": ""
        }
    jsonObject = json.dumps(obj)
    return jsonObject

if __name__ == '__main__':
    app.run(port=5000)