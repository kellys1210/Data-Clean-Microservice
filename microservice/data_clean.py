"""
data_clean.py takes a dict from the database and cleans it
If common_name = False, replace with 'No Data'
If countries = [], replace with 'No Data'
Overwrite countries list into a string, deliminated by ", "
Overwrite dict keys to:
    common_name = Common Name
    countries = Countries
    scientific_name = Scientific Name
"""

from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():

    # Request data from database microservice hosted on port 5001
    response = requests.get("http://127.0.0.1:5001/cat-data")
    if response.status_code == 200:
        data = response.json()

        # Iterates over each dictionary in list 'data'
        for dict in data:

            # Iterates over each key-value pair in the dictionary
            for key, value in list(dict.items()):

                # If key = 'common_name', renamed to 'Common Name' by popping current key
                if key == 'common_name':
                    dict['Common Name'] = dict.pop('common_name')

                    # If 'Common Name' = 'false', sets to 'No Data'
                    if value == 'false':
                        dict['Common Name'] = "No Data"

                # If key = 'countries', renamed to 'Countries' by popping current key
                elif key == 'countries':
                    dict['Countries'] = dict.pop('countries')

                    # If 'Countries' = empty list, sets to 'No Data'
                    if value == []:
                        dict['Countries'] = 'No Data'

                    # If Countries = list, converted to string with each element separated by a comma
                    elif isinstance(value, list):
                        dict['Countries'] = ', '.join(value)

                # If key = 'scientific_name', renamed to 'Scientific Name' by popping current key
                elif key == 'scientific_name':
                    dict['Scientific Name'] = dict.pop('scientific_name')

                # This can be removed if not necessary; preserves order of keys in each dict
                else:
                    dict['image'] = dict.pop('image')

    # Return data
    return jsonify(data), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5004, debug=True)