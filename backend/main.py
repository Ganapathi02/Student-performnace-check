from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model = joblib.load("model.pkl")
except FileNotFoundError:
    model = None

class StudentData(BaseModel):
    study_hours: float
    attendance: float
    previous_score: float
    sleep_hours: float

@app.post("/predict")
async def predict_score(data: StudentData):
    if model is None:
        return {"error": "Model not loaded. Please run train_model.py first to generate model.pkl"}
        
    input_df = pd.DataFrame([{
        "study_hours": data.study_hours,
        "attendance": data.attendance,
        "previous_score": data.previous_score,
        "sleep_hours": data.sleep_hours
    }])
    
    prediction = model.predict(input_df)[0]
    
    # Ensure prediction is between 0 and 100
    prediction = max(0.0, min(100.0, float(prediction)))
    
    return {
        "inputs": data.dict(),
        "predicted_score": round(prediction, 1)
    }
