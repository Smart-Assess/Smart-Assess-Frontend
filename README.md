

![Screenshot from 2025-05-30 21-41-40](https://github.com/user-attachments/assets/d2a43fd3-e90f-4f34-a583-b11b5b04fa57) 


[![React Version](https://img.shields.io/badge/react-%5E18.0.0-blue.svg?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Smart-Assess/Smart-Assess-Frontend.svg?style=social&label=Star&maxAge=2592000)](https://github.com/Smart-Assess/Smart-Assess-Frontend/stargazers/)

## 🌟 Overview

In the current educational landscape, the grading process for academic assignments is often time-consuming, subjective, and inconsistent. This leads to challenges in providing timely and personalized feedback to students. Teachers face difficulties managing large volumes of submissions, which can result in delayed grading and inadequate insights into student performance. This delay not only hampers students' ability to understand their mistakes and improve but also affects their overall learning experience and motivation.

Smart Assess provides an intuitive web interface for an advanced grading platform. The frontend, built with modern web technologies, allows educators and students to interact seamlessly with the AI-powered backend, streamlining the assignment evaluation process.

## ✨ Key Features

### For Teachers
-   **Intuitive Dashboard:** Manage courses, assignments, and student submissions with ease.
-   **Automated Grading Insights:** View detailed, AI-generated scores and feedback.
-   **Customizable Criteria:** (If applicable) Interface to set or view assessment parameters.
-   **Performance Analytics:** Visualize student and class-wide trends.
-   **Efficient Workflow:** Review and approve automated assessments quickly.

### For Students
-   **Easy Submission Portal:** Upload assignments effortlessly.
-   **Instant Feedback:** Receive detailed scores and personalized improvement suggestions.
-   **Transparent Assessment:** Understand how their work is graded with clear breakdowns.
-   **Progress Tracking:** Monitor performance across assignments.

## 🛠️ Technology Stack
-   **React:** For building a dynamic and responsive user interface.
-   **Chakra UI:** (Or your chosen UI library) For a modern and accessible design system.
-   **React Router:** For client-side navigation.
-   **Axios/Fetch:** For making API calls to the Smart Assess Backend.
-   **(State Management):** Redux, Zustand, or Context API for managing application state.

## 🚀 Getting Started

### Prerequisites
-   🟢 Node.js (LTS version recommended)
-   🧶 npm or yarn
-   🐙 Git

### Installation & Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Smart-Assess/Smart-Assess-Frontend.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Smart-Assess-Frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
4.  **Configure Environment Variables:**
    Create a `.env` file in the root of your project. You can copy `.env.example` if it exists:
    ```bash
    cp .env.example .env # If .env.example exists
    ```
    Update the `.env` file with the necessary environment variables. For React applications (especially those created with Create React App), variables must be prefixed with `REACT_APP_`.
    Example:
    ```env
    // filepath: .env
    REACT_APP_API_BASE_URL=http://localhost:8000/api 
    // Add other REACT_APP_ prefixed environment variables as needed
    ```

## 🏃 Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    # or
    # yarn start
    ```
2.  **Open your browser:**
    The application will typically be available at `http://localhost:3000` (or another port if `3000` is in use).

## 👥 User Roles
-   **Super Administrator**: Manages the entire system and university administrators.
-   **University Administrator**: Manages teachers and students within their institution.
-   **Teacher**: Creates courses, assigns work, and reviews automated assessments.
-   **Student**: Submits assignments and receives detailed feedback.

## 🎯 Project Objectives
-   Achieve **85% grading accuracy** compared to human evaluation (via backend).
-   Reduce grading time by at least **50%** (facilitated by the UI).
-   Maintain user satisfaction rates above **75%**.
-   Provide a clear and user-friendly interface for accessing comprehensive, context-aware feedback.

## 🤝 Team Members

This project was made possible by the hard work and dedication of the following team members:

-   Abdul Samad Siddiqui ([@samadpls](https://github.com/samadpls)) - Lead
-   Maira Usman ([@Myrausman](https://github.com/Myrausman))
-   Ahsan Sajid ([@AhsanSajid](https://github.com/AhsanSajid))
-   Rayyan ([@Rayyan](https://github.com/Rayyan))

Thank you to the entire team for their contributions! 🎉

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
