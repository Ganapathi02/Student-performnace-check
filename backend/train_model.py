import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
import joblib

def generate_synthetic_student_data(n_samples=1500):
    np.random.seed(42)
    
    # Generate features
    study_hours = np.random.uniform(0, 40, n_samples)
    attendance = np.random.uniform(50, 100, n_samples)
    previous_score = np.random.uniform(40, 100, n_samples)
    sleep_hours = np.random.uniform(3, 10, n_samples)
    extracurricular_hours = np.random.uniform(0, 20, n_samples)
    stress_level = np.random.uniform(1, 10, n_samples)
    
    # Calculate score based on features + some randomness
    # Max score is 100
    base_score = 20
    
    # Study hours impact (diminishing returns after ~30 hours)
    study_impact = np.where(study_hours < 30, study_hours * 1.2, 36 + (study_hours - 30) * 0.2)
    
    # Attendance impact
    attendance_impact = (attendance - 50) * 0.4
    
    # Previous score correlation
    prev_score_impact = previous_score * 0.3
    
    # Sleep hours (optimal is 7-9 hours)
    sleep_impact = np.where(
        sleep_hours < 5, -10,
        np.where(sleep_hours > 9, -2, sleep_hours * 1)
    )
    
    # Extracurricular impact (optimal is 5-10 hours)
    extra_impact = np.where(extracurricular_hours > 15, -5, extracurricular_hours * 0.5)
    
    # Stress impact (high stress lowers score)
    stress_impact = np.where(stress_level > 7, - (stress_level - 7) * 2, 0)
    
    final_score = base_score + study_impact + attendance_impact + prev_score_impact + sleep_impact + extra_impact + stress_impact
    final_score += np.random.normal(0, 3, n_samples) # random noise
    
    # Clip to 0-100 range
    final_score = np.clip(final_score, 0, 100)
    
    return pd.DataFrame({
        "study_hours": study_hours,
        "attendance": attendance,
        "previous_score": previous_score,
        "sleep_hours": sleep_hours,
        "extracurricular_hours": extracurricular_hours,
        "stress_level": stress_level,
        "final_score": final_score
    })

def train_and_save_model():
    print("Generating synthetic student data...")
    df = generate_synthetic_student_data()
    
    X = df[["study_hours", "attendance", "previous_score", "sleep_hours"]]
    y = df["final_score"]
    
    print("Training Random Forest Regressor...")
    model = make_pipeline(StandardScaler(), RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42))
    model.fit(X, y)
    
    print("Saving model to 'model.pkl'...")
    joblib.dump(model, "model.pkl")
    print("Model successfully trained and saved!")

if __name__ == "__main__":
    train_and_save_model()
