from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ARQUIVO_DADOS = 'clima.json'

def ler_dados():
    try:
        with open(ARQUIVO_DADOS, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

@app.route('/clima', methods=['GET'])
def get_clima():
    return jsonify(ler_dados())

if __name__ == '__main__':
    app.run(debug=True)
