from flask import Flask
from flask import request
from flask_cors import CORS
import submit as sb
import json

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def transform():
    body = str(request.data)
    result = sb.submit(body)
    text, intialArg = result[0], result[1]
    obj = {
        "type": "valid", # 'valid' or 'invalid'
        "text": text, # map text or error text
        "arg": intialArg # initial argument
    }
    jsonObject = json.dumps(obj)
    return jsonObject

if __name__ == '__main__':
    app.run(port=5000)