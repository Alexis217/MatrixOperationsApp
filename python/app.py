from flask import Flask, request, jsonify
from werkzeug.serving import run_simple

app = Flask(__name__, static_folder='../public', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/operate-matrices', methods=['POST'])
def operate_matrices():
    try:
        data = request.get_json()
        operation = data['operation']
        matrix1 = data['matrix1']
        matrix2 = data['matrix2']
        
        if operation == 'sum':
            result = sum_matrices(matrix1, matrix2)
        elif operation == 'multiply':
            result = multiply_matrices(matrix1, matrix2)
        else:
            raise ValueError('Operación no válida')
            
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def sum_matrices(matrix1, matrix2):
    return [[matrix1[i][j] + matrix2[i][j] for j in range(len(matrix1[0]))] 
             for i in range(len(matrix1))]

def multiply_matrices(matrix1, matrix2):
    result = [[0 for _ in range(len(matrix2[0]))] for _ in range(len(matrix1))]
    for i in range(len(matrix1)):
        for j in range(len(matrix2[0])):
            for k in range(len(matrix1[0])):
                result[i][j] += matrix1[i][k] * matrix2[k][j]
    return result

if __name__ == '__main__':
    run_simple('localhost', 5000, app, use_reloader=True)