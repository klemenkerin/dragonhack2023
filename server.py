import os
from flask import Flask, jsonify, render_template, request

import chatgpt_api

app = Flask(__name__)

#pages

@app.route('/')
def index():
    return render_template('index.html')


#APIs ---------------------------------------------------------------------------------------------

#API for code explanation
@app.route('/api/explain', methods=['POST'])
def explain():
    # Read the prompt from the get request
    data = request.get_json()
    code = data.get('code')
    input_language = data.get('input_language')
    prompt = f'In short explain what this {input_language} code does:\n{code}'

    # get the explanation
    explanation = chatgpt_api.send_single_request(token, model, prompt)
    explanation = explanation.json()['choices'][0]['message']['content']
    print(explanation)

    return jsonify({'explanation': explanation})

#API for code translation
@app.route('/api/translate', methods=['POST'])
def translate():
    # Read the prompt from the get request
    data = request.get_json()
    code = data.get('code')
    input_language = data.get('input_language')
    output_language = data.get('output_language')

    prompt = f'Translate the following {input_language} code to {output_language} :\n{code}'

    # Get the explanation and preprocess it
    explanation = chatgpt_api.send_single_request(token, model, prompt)
    explanation = explanation.json()['choices'][0]['message']['content']

    print(explanation)
    # Return the explanation as a json object
    return jsonify({'explanation': explanation})

#API for code debug
@app.route('/api/debug', methods=['POST'])
def debug():
    # Read the prompt from the get request
    data = request.get_json()
    code = data.get('code')
    input_language = data.get('input_language')
    prompt = f'Debug this {input_language} code:\n{code}'

    # get the explanation
    explanation = chatgpt_api.send_single_request(token, model, prompt)
    explanation = explanation.json()['choices'][0]['message']['content']
    print(explanation)

    return jsonify({'explanation': explanation})
    

#API for generating data structure of program from description
@app.route('/api/structure', methods=['POST'])
def generate_structure():
    # Read the prompt from the get request
    data = request.get_json()
    description = data.get('description')
    languages = data.get('languages') #list of languages
    
    prompt = f'Generate the folder data structure for a program using linux terminal comands. The program is in {languages}, with this description:\n{description}\n'

    # get the explanation
    commands = chatgpt_api.send_single_request(token, model, prompt)
    commands.json()['choices'][0]['message']['content']
    print(commands)
    # Return the explanation as a json object

    #run the commands in the terminal
    os.system(commands)

    return jsonify({"done": "true"})

if __name__ == '__main__':
    with open('key.txt', 'r') as f:
        key = f.read().strip()
    
    prompt = 'Explain this code'
    model = 'gpt-3.5-turbo'
    token = key
    
    app.run(debug=True, port=8080)