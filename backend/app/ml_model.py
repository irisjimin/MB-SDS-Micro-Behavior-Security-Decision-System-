import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib

# ====== training data (dummy baseline) ======
# [hover_time, move_count, entropy]

X = np.array([
    [3000, 10, 0.5],   # safe
    [2500, 20, 1.2],   # safe
    [800, 80, 3.5],    # risky
    [600, 90, 4.2],    # risky
    [1500, 40, 2.0],   # borderline
])

y = np.array([
    0,  # safe
    0,
    1,  # risky
    1,
    1
])

model = LogisticRegression()
model.fit(X, y)

def predict_risk(features):
    x = np.array([[
        features["hover_time"],
        features["move_count"],
        features["cursor_entropy"]
    ]])

    prob = model.predict_proba(x)[0][1]

    return {
        "risk_score": float(round(prob, 4)),
        "label": "risky" if prob > 0.5 else "safe"
    }

# optional save/load
def save_model(path="model.pkl"):
    joblib.dump(model, path)

def load_model(path="model.pkl"):
    global model
    model = joblib.load(path)
