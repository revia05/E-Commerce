'''from flask import Flask, jsonify, request
import pandas as pd
import os
from flask_cors import CORS
from recommender import get_recommendations, get_recommendations_for_multiple

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
df = pd.read_csv("products.csv")
df.fillna({"image": "/img/default.jpg"}, inplace=True)


# ✅ Add this route back
@app.route("/api/recommend")
def recommend():
    product_id = int(request.args.get("product_id", 1))
    recommended_ids = get_recommendations(product_id)
    recommended_products = df[df["id"].isin(recommended_ids)]
    return jsonify(recommended_products.fillna("").to_dict(orient="records"))


@app.route("/api/recommend-multi", methods=["POST"])
def recommend_multi():
    try:
        data = request.get_json()
        product_ids = data.get("product_ids", [])
        if not product_ids:
            return jsonify([])

        recommended_ids = get_recommendations_for_multiple(product_ids)
        recommended_products = df[df["id"].isin(recommended_ids)]
        
        print(recommended_products[["id", "name", "image"]])  # ✅ DEBUG

        return jsonify(recommended_products.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Run server
#if __name__ == "__main__":
    app.run(debug=True)#
#
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's port if available
    app.run(host="0.0.0.0", port=port)

'''
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pandas as pd
from recommender import get_recommendations, get_recommendations_for_multiple

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

df = pd.read_csv("products.csv")
df.fillna({"image": "/img/default.jpg"}, inplace=True)

@app.route("/api/recommend")
def recommend():
    product_id = int(request.args.get("product_id", 1))
    recommended_ids = get_recommendations(product_id)
    recommended_products = df[df["id"].isin(recommended_ids)]
    return jsonify(recommended_products.to_dict(orient="records"))

@app.route("/api/recommend-multi", methods=["POST", "OPTIONS"])
def recommend_multi():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 204

    data = request.get_json()
    product_ids = data.get("product_ids", [])
    recommended_ids = get_recommendations_for_multiple(product_ids)
    recommended_products = df[df["id"].isin(recommended_ids)]
    return jsonify(recommended_products.to_dict(orient="records"))
