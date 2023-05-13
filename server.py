import os
from flask import Flask, jsonify, render_template, request, send_file
import numpy as np

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

    # get the explanation
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
    try:
        conversation = []

<<<<<<< HEAD
        # Read the prompt from the get request
        data = request.get_json()
        description = data.get('description')
        languages = data.get('languages') #list of languages
        
        prompt = f'Generate the entire data structure (directories and populate it with files) for a program using linux terminal comands mkdir without any explanations. The program is in {languages}, with this description:\n{description}\n'

        # get the explanation
        commands, conversation = chatgpt_api.send_request(token, model, prompt, conversation)

        # print(commands)

        # run the commands in a linux terminal, in tmp_files folder
        os.system(f'cd tmp_files && {commands}')

        # print tree of the folder structure and pipe it to string variable
        tree = os.popen('cd tmp_files && tree').read()

        # print all the files in the folder and all the subfolders and pipe it to string variable
        files = os.popen('cd tmp_files && find . -type f').read()

        # prompt for the explanation of the files
        prompt = f'The strucure of the program is:\n{tree}\n\nOnly the files are:\n{files}\n\nSelect only those files that are scripts (have to be coded) and order them by order of development, from the first to the last and output it like this: [file1, file2, file3, ...].\n'

        # get the array of files
        files, conversation = chatgpt_api.send_request(token, model, prompt, conversation)

        # files to array
        files = files.replace('[', '').replace(']', '').replace(' ', '').split(',')

        print("files:", files)

        # for files or max 5 files
        i = 0
        for file in files[:5]:
            print("at file: ", file)

            # prompt to generate barebone code
            prompt = f'Generate simple code for {file}. Output only code in pure text.\n'

            # get the code
            code, conversation = chatgpt_api.send_request(token, model, prompt, conversation)

            # save the code to file
            with open(f'tmp_files/{file}', 'w') as f:
                f.write(code)

            print("made file: ", file)
            i += 1


        ###########################################

        # print(tree)

        # delete the zip file if it exists
        os.system('rm -rf tmp_files.zip')

        # zip the folder and save it to variable
        os.system('cd tmp_files && zip -r ../tmp_files.zip .')


        # delete everything in tmp_files folder
        os.system('rm -rf tmp_files/*')

        # Download the zip file
        # return send_file(zip_file, as_attachment=True, mimetype='application/zip', download_name='data_structure.zip')
        return send_file('tmp_files.zip', as_attachment=True)
    
    except Exception as e:
        return jsonify({'error': str(e)})
=======
    # get the explanation
    commands = chatgpt_api.send_single_request(token, model, prompt)
    commands.json()['choices'][0]['message']['content']
    print(commands)
    # Return the explanation as a json object

    #run the commands in the terminal
    os.system(commands)

    return jsonify({"done": "true"})
>>>>>>> 8206620ec645fa55aded43ebd2750defc645ee18

if __name__ == '__main__':
    with open('key.txt', 'r') as f:
        key = f.read().strip()
    
    prompt = 'Explain this code'
    model = 'gpt-3.5-turbo'
    token = key
    
    app.run(debug=True, port=8080)