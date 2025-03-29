# Momentum

Momentum is a task management app built with **TypeScript, React, and Redux**, utilizing the **Groq API** for AI-powered assistance. It helps users manage their tasks efficiently with features like task categorization, a Pomodoro timer, and AI-powered task suggestions.

## Features

- **Task Management:** Create, update, delete, and view tasks.
- **Dashboard Overview:** Displays total **pending, completed, in-progress, and high-priority tasks as well a calendar showing tasks on due date**.
- **Task Categorization:**
  - Expiring Deadlines
  - High Priority
  - Completed
  - Expired
- **Task Details Page:**
  - Update, delete, or mark a task as completed.
  - Get AI-powered suggestions for completing tasks.
- **Pomodoro Timer:** Helps in productivity management.

## Built With

- **TypeScript**
- **React**
- **Redux (with Redux Thunk for API calls)**
- **Groq API**
- **Shadcn UI**
- **Tailwind CSS**

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/prakhar5100/Momentum.git
   ```
2. Navigate to the project directory:
   ```sh
   cd momentum
   ```
3. Install dependencies:
   ```sh
   npm install --legacy-peer-deps
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your custom Groq API key:
     ```sh
     VITE_API_KEY=your_api_key_here
     ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## State Management

Momentum uses **Redux** for state management. It manages:
- **Users and Authentication** (dummy auth stored in local storage)
- **Tasks** (CRUD operations and categorization)
- **API Calls** (handled using Redux Thunk for async requests to Groq API)

## License

This project is licensed under the MIT License.

---

Enjoy using **Momentum** to boost your productivity! 🚀

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/prakhar5100/Momentum?utm_source=oss&utm_medium=github&utm_campaign=prakhar5100%2FMomentum&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)


![image](https://github.com/user-attachments/assets/72c590cc-3bc1-4586-b562-764731f031e9)
![image](https://github.com/user-attachments/assets/02388237-fd1a-45e8-b367-0827be85ed5b)
![image](https://github.com/user-attachments/assets/579f63d1-d02d-4c05-ba19-416dd51a4236)

