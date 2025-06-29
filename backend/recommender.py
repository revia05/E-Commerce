import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load product data
df = pd.read_csv("products.csv",dtype={"id": int})

# Combine relevant fields
df["combined"] = df["name"] + " " + df["description"] 

# TF-IDF vectorization
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df["combined"])

# Single product recommendation
def get_recommendations(product_id, top_n=3):
    idx = df.index[df["id"] == product_id].tolist()
    if not idx:
        return []
    idx = idx[0]
    cosine_sim = linear_kernel(tfidf_matrix[idx:idx+1], tfidf_matrix).flatten()
    similar_indices = cosine_sim.argsort()[::-1]
    similar_indices = [i for i in similar_indices if df.iloc[i]["id"] != product_id]
    return df.iloc[similar_indices[:top_n]]["id"].tolist()

# Multi-product recommendation
def get_recommendations_for_multiple(product_ids, top_n=5):
    indices = df[df["id"].isin(product_ids)].index.tolist()
    if not indices:
        return []
    mean_vector = tfidf_matrix[indices].mean(axis=0)
    cosine_sim = linear_kernel(mean_vector.A, tfidf_matrix).flatten()
    similar_indices = cosine_sim.argsort()[::-1]
    similar_indices = [i for i in similar_indices if df.iloc[i]["id"] not in product_ids]
    return df.iloc[similar_indices[:top_n]]["id"].tolist()