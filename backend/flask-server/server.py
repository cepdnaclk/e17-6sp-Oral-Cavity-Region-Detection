from flask import Flask,request, jsonify, send_file, redirect, url_for,make_response
from flask_cors import CORS, cross_origin
import cv2
import urllib.request
import urllib
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app, support_credentials=True)

UPLOAD_FOLDER = 'static/uploads/'
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    return "Welcome to python server!"

@app.route("/mask",methods=['POST'])
@cross_origin(supports_credentials=True)
def masking():
    masks = request.json["masks"]
    original = request.json["original"]

    req = urllib.request.urlopen('https://6spstorage.blob.core.windows.net/images/'+original)
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    original_img = cv2.imdecode(arr, -1) # 'Load it as it is'

    results = []
    for x in masks:
        req = urllib.request.urlopen('https://6spstorage.blob.core.windows.net/images/%s' % x)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        img = cv2.imdecode(arr, -1) # 'Load it as it is'
        results.append(img)
    
    colors = [[0,255,0],[225,255,0],[0,255,225],[255,0,0],[0,0,225],[255,0,255],[127,127,0],[0,127,127]]
    alpha = 0.5
    segment = np.copy(original_img)
    segment_prev = np.copy(original_img)
    segments = [original_img]

    for index, mask in enumerate(results):
        segment[mask==255] = colors[index]
        segment = cv2.addWeighted(segment, alpha, segment_prev, 1-alpha, 0)
        segment_prev = np.copy(segment)
        segments.append(segment_prev)

    cv2.imwrite("deleteme.png",segments[-1])
    response = make_response(send_file("deleteme.png",mimetype='image/png'))
    response.headers['Content-Transfer-Encoding']='base64'
    return response 
    #return send_file("deleteme.png", mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)