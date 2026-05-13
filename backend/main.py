from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import logging
from typing import Dict, Any
# Configure logging for professional monitoring
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("student-ai-backend")

app = FastAPI(
    title="Student Performance AI API",
    description="Professional API for predicting student exam scores based on habits.",
    version="1.2.0"
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Student Performance AI API",
        "documentation": "/docs",
        "health_check": "/health"
    }

# Professional CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model state
MODEL_PATH = "model.pkl"
try:
    model = joblib.load(MODEL_PATH)
    logger.info(f"Successfully loaded model from {MODEL_PATH}")
except FileNotFoundError:
    logger.error(f"Model file not found at {MODEL_PATH}")
    model = None

class StudentData(BaseModel):
    """Data model for student habits with strict range validation."""
    study_hours: float = Field(..., ge=0, le=168, description="Study hours per week")
    attendance: float = Field(..., ge=0, le=100, description="Attendance percentage")
    previous_score: float = Field(..., ge=0, le=100, description="Previous exam score (0-100)")
    sleep_hours: float = Field(..., ge=0, le=24, description="Sleep hours per night")

@app.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "model_loaded": str(model is not None)
    }

@app.post("/predict")
async def predict_score(data: StudentData) -> Dict[str, Any]:
    """
    Receives student habits and returns a predicted exam score.
    Includes error handling and logging.
    """
    if model is None:
        logger.error("Prediction attempted but model is not loaded.")
        raise HTTPException(status_code=503, detail="Machine Learning model not available.")

    try:
        # Prepare data for prediction
        input_df = pd.DataFrame([{
            "study_hours": data.study_hours,
            "attendance": data.attendance,
            "previous_score": data.previous_score,
            "sleep_hours": data.sleep_hours
        }])

        # Perform prediction
        prediction = model.predict(input_df)[0]
        
        # Human-based logic: Bound the results between 0 and 100
        final_score = max(0.0, min(100.0, float(prediction)))
        
        logger.info(f"Prediction generated: {final_score} for inputs: {data.dict()}")

        return {
            "success": True,
            "predicted_score": round(final_score, 1),
            "inputs": data.dict()
        }
    except Exception as e:
        logger.exception("Error during prediction")
        raise HTTPException(status_code=500, detail="Internal server error during analysis.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
