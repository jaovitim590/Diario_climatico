from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ARQUIVO_DADOS = 'clima.json'

def ler_dados():
    try:
      
        with open(ARQUIVO_DADOS, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        print(f"Erro: Arquivo '{ARQUIVO_DADOS}' não encontrado.")
        return []
    except json.JSONDecodeError as e:
        print(f"Erro ao decodificar JSON de '{ARQUIVO_DADOS}': {e}")
        return []

@app.route('/clima', methods=['GET'])
def get_clima():
    return jsonify(ler_dados())

if __name__ == '__main__':
    app.run(debug=True)