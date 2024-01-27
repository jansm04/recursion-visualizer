from flask import Flask
from flask import request
from flask_cors import CORS
import submit as sb

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def transform():
    body = str(request.data)
    sb.submit(body)
    return "Submission Successful!"

if __name__ == '__main__':
    app.run(port=5000)