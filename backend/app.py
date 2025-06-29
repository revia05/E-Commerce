from flask import Flask, jsonify, request
import pandas as pd
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
if __name__ == "__main__":
    app.run(debug=True)
