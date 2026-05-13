# 🎓 Student Performance AI: Empowering Academic Excellence

![GitHub](https://img.shields.io/badge/Project-Student--Performance--AI-blue?style=for-the-badge&logo=github)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind--CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

Helping students understand their potential through the power of Data Science and Modern Web Engineering.

---

## 🧠 The Vision

Education isn't just about grades; it's about understanding the habits that lead to success. **Student Performance AI** is a bridge between raw data and actionable academic insights. By analyzing study patterns, attendance, and health factors, this tool provides students with a data-driven prediction of their future performance, encouraging better habits and informed decision-making.

---

## ✨ Premium Features

*   **🤖 AI-Powered Engine**: Utilizes a sophisticated Scikit-Learn regression model to analyze complex academic relationships.
*   **💎 Modern Aesthetics**: A premium glassmorphic UI built with **Next.js** and **Tailwind CSS**, offering a seamless user experience with real-time feedback.
*   **⚡ Instantaneous Logic**: Backend powered by **FastAPI** ensures that predictions are delivered in milliseconds.
*   **📊 Comprehensive Input**: Considers the "Whole Student" by looking at:
    *   📖 **Deep Focus**: Weekly study hours.
    *   🏫 **Consistency**: Attendance records.
    *   📈 **History**: Previous academic achievements.
    *   💤 **Wellness**: Essential sleep hours.
*   **🛡️ Production Ready**: Includes CORS security, professional logging, and strict data validation via Pydantic.

---

## 🛠️ The Tech Ecosystem

### **The Intelligence (Backend)**
*   **FastAPI**: For high-performance, asynchronous API delivery.
*   **Scikit-Learn**: The machine learning brain behind the predictions.
*   **Joblib**: For efficient model serialization and lightning-fast loading.
*   **Pandas**: For robust data manipulation and preparation.

### **The Interface (Frontend)**
*   **Next.js 16**: Utilizing the latest App Router for optimal performance.
*   **React 19**: Leveraging the newest features of the world's most popular UI library.
*   **TypeScript**: Ensuring type-safety and developer productivity.
*   **Tailwind CSS**: Modern utility-first styling for a sleek, responsive design.

---

## 📂 Project Blueprint

```text
student-performance/
├── 🚀 backend/             # The AI Engine (FastAPI)
│   ├── main.py             # API entry & prediction logic
│   ├── model.pkl           # The trained intelligence
│   └── requirements.txt    # Python environment
├── 💻 frontend/            # The User Experience (Next.js)
│   ├── src/app/            # Next.js pages and components
│   └── public/             # Static assets and images
└── 📄 README.md            # You are here!
```

---

## 🚀 How to Run Locally

*Note: Open your terminal or Command Prompt (CMD) and follow these steps to get the project up and running.*

### **1. 🐍 Running the Backend (API)**
1. **Enter the engine room**:
   ```bash
   cd backend
   ```
2. **Create your environment**:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```
3. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Ignition**:
   ```bash
   python main.py
   ```

### **2. ⚛️ Running the Frontend (UI)**
1. **Move to the dashboard**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Launch the interface**:
   ```bash
   npm run dev
   ```

### **3. 💻 Using VS Code Terminal**
If you are using **VS Code**, you can open the integrated terminal (`Ctrl + ` `) and split the screen to run both the Backend and Frontend at the same time:
1. **Terminal 1**: Follow the Backend steps.
2. **Terminal 2**: Follow the Frontend steps.

---

## 🌍 Live Deployment (Render)

To host the backend AI on **Render**, use the following configuration:

| Setting | Value |
| :--- | :--- |
| **Runtime** | `Python 3` |
| **Root Directory** | `backend` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn -k uvicorn.workers.UvicornWorker main:app` |

*Note: Ensure the Machine Learning model (`model.pkl`) is pushed to your repository for the API to function.*

---

---

## 🛣️ Future Roadmap

- [ ] 📈 **Data Visualization**: Adding interactive charts for performance trends.
- [ ] 🔐 **User Accounts**: Allow students to track their progress over time.
- [ ] 📧 **Automated Reports**: Send AI-generated study tips to email.
- [ ] 📱 **Mobile App**: Native experience for iOS and Android.

---

## 🤝 Contributing

We love builders! If you have ideas to make this tool better:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact & Support

**Project Lead**: Ganapathi V
**Email**: ganapathivg02@gmail.com
**GitHub**: [@Ganapathi02](https://github.com/Ganapathi02)

*Crafted with precision to help students achieve their dreams. 🌟*
