# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import os
# import json

# app = Flask(__name__)
# CORS(app)

# # Load dataset
# with open('dataset.json', 'r') as f:
#     dataset = json.load(f)

# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# def get_average_skin_color(image_path):
#     img = cv2.imread(image_path)
#     if img is None:
#         return None

#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#     # Take center region for simplicity
#     h, w, _ = img.shape
#     x, y, size = w//2 - 50, h//2 - 50, 100
#     cropped = img_rgb[y:y+size, x:x+size]

#     avg_color_per_row = np.average(cropped, axis=0)
#     avg_color = np.average(avg_color_per_row, axis=0)

#     r, g, b = map(int, avg_color)
#     return f"rgb({r}, {g}, {b})"

# @app.route('/upload', methods=['POST'])
# def upload_image():
#     file = request.files.get('image')
#     if not file:
#         return jsonify({'error': 'No file provided'}), 400

#     filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(filepath)

#     skin_color = get_average_skin_color(filepath)
#     if not skin_color:
#         return jsonify({'error': 'Unable to process image'}), 500

#     match = next((item for item in dataset if item['skinColor'] == skin_color), dataset[0])

#     return jsonify({
#         'detectedSkin': skin_color,
#         'recommendations': match['recommendedColors']
#     })

# @app.route('/palette', methods=['POST'])
# def palette_selection():
#     data = request.get_json()
#     skin_color = data.get('skinColor')

#     match = next((item for item in dataset if item['skinColor'] == skin_color), dataset[0])

#     return jsonify({
#         'detectedSkin': skin_color,
#         'recommendations': match['recommendedColors']
#     })

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)






























from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
import json

app = Flask(__name__)
CORS(app)

# Load dataset
with open('dataset.json', 'r') as f:
    dataset = json.load(f)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def rgb_string_to_tuple(rgb_string):
    nums = rgb_string.strip('rgb()').split(',')
    return tuple(int(num.strip()) for num in nums)

def find_closest_color(skin_rgb):
    min_dist = float('inf')
    closest_match = None

    for item in dataset:
        dataset_rgb = rgb_string_to_tuple(item['skinColor'])
        dist = np.linalg.norm(np.array(skin_rgb) - np.array(dataset_rgb))

        if dist < min_dist:
            min_dist = dist
            closest_match = item

    return closest_match


def get_average_skin_color(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Take center region for simplicity
    h, w, _ = img.shape
    x, y, size = w//2 - 50, h//2 - 50, 100
    cropped = img_rgb[y:y+size, x:x+size]

    avg_color_per_row = np.average(cropped, axis=0)
    avg_color = np.average(avg_color_per_row, axis=0)

    r, g, b = map(int, avg_color)
    return f"rgb({r}, {g}, {b})"

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'No file provided'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    skin_color_str = get_average_skin_color(filepath)
    if not skin_color_str:
        return jsonify({'error': 'Unable to process image'}), 500

    skin_rgb = rgb_string_to_tuple(skin_color_str)
    match = find_closest_color(skin_rgb)

    return jsonify({
        'detectedSkin': skin_color_str,
        'recommendations': match['recommendedColors']
    })

@app.route('/palette', methods=['POST'])
def palette_selection():
    data = request.get_json()
    skin_color_str = data.get('skinColor')
    skin_rgb = rgb_string_to_tuple(skin_color_str)
    match = find_closest_color(skin_rgb)

    return jsonify({
        'detectedSkin': skin_color_str,
        'recommendations': match['recommendedColors']
    })


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5050)
