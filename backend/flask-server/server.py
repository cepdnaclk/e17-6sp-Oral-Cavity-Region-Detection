from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin
import cv2
import urllib.request
import numpy as np

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    return "Welcome to python server!"

@app.route("/mask",methods=['POST'])
@cross_origin(supports_credentials=True)
def members():
    image_url = "http://localhost:8000/Storage/masks/0aa155fa_front_2_masks_0.png"
    local_filename, headers = urllib.request.urlretrieve(image_url)
    image_object = cv2.imread(local_filename)
    return image_object

if __name__ == '__main__':
    app.run(debug=True)