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
    print(result)
    if not result:
        obj = {
            "type": 'invalid', 
            "text": 'zip', 
            "arg": 'nada' 
        }
        print("reached here (1)")
    else:
        text, intialArg = result[0], result[1]
        obj = {
            "type": 'valid', 
            "text": text, 
            "arg": intialArg 
        }
        print("reached here (2)")
    jsonObject = json.dumps(obj)
    return jsonObject

if __name__ == '__main__':
    app.run(port=5000)