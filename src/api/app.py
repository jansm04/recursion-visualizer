from flask import Flask
from flask import request
from flask_cors import CORS
import api.runner.submit as sb
import api.verifier.verify as vf
import api.setup.parse as pc
import json

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def transform():
    body = str(request.data)
    code = pc.parseCode(body)
    verification = vf.verify(code)
    isValid, message = verification[0], verification[1]
    if isValid:
        result = sb.submit(code)
        isAccepted, text = result[0], result[1]
        obj = {
            "type": isAccepted, 
            "text": text 
        }
    else:
        obj = {
            "type": False,
            "text": message
        }
    jsonObject = json.dumps(obj)
    return jsonObject

if __name__ == '__main__':
    app.run(port=5000)