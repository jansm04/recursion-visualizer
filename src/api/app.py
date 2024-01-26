from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def transform():
    print(str(request.data))
    return "Hello, World!"

if __name__ == '__main__':
    app.run(port=5000)