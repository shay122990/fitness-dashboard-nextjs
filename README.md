# Today - A Fitness Planner

Today is a fitness planning application that helps users plan their workouts, track their nutrition, and gain insights into their progress. Built with modern web technologies, it provides a seamless user experience for managing fitness goals.
You can add the app to your phone as a PWA, through Safari or Chrome.

## Features

- **Dashboard**: Navigate to your activity, track your water intake, cardio timer, and calculate your tdee and calories.
- **User Authentication**: Firebase Authentication to securely sign up and log in users.
- **Workout Planner**: Create, edit, and delete workouts for specific days of the week.
- **Nutrition Tracker**: Add and track consumed and burned calories for each day.
- **Insights Dashboard**: View weekly stats and progress visualized using Chart.js.
- **State Management**: Powered by Redux Toolkit for efficient and predictable state management.
- **Persistent State**: Redux-Persist ensures the state is saved across sessions.
- **Responsive Design**: Styled with Tailwind CSS for a clean and modern interface.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS, Chart.js
- **Backend**: Firebase Firestore for database and Firebase Authentication for secure login.
- **Deployment**: Vercel for fast and reliable hosting.

## Screenshots

1. **Login Page**: ![Login Screenshot](/public/profile.jpg)
2. **Workout Planner**: ![Workout Planner Screenshot](/public//planner.jpg)
3. **Nutrition Tracker**: ![Nutrition Tracker Screenshot](/public/nutrition.jpg)
4. **Insights Dashboard**: ![Insights Screenshot](/public/insights.jpg)
5. **Mobile View**: ![Mobile Screenshot](/public/mobile.jpg)
6. **Mobile App** ![Mobile App](/public/mobile-app.jpg)

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- Firebase project setup (instructions below)

### Installation

1. Clone the repository:

   ```bash
   git clonehttps://github.com/shay122990/fitness-dashboard-nextjs
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** with the providers you want (e.g., Email/Password), I used Google Pop Up sign in.
   - Enable **Firestore Database** and set the Firestore rules as shown below.
   - Add a **Firebase config file** in your project. Replace `firebaseConfig` in the code with your Firebase project credentials.

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

4. Configure Firestore Rules:
   Set the Firestore security rules to the following:

   ```
   rules_version = '2';
   service cloud.firestore {
    match /databases/{database}/documents {
    // Profiles
    match /profiles/{userId} {
      // Allow read and write if the authenticated user's UID matches the document ID
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Workouts
    match /workouts/{workoutId} {
      // Allow create if the userId in the document matches the authenticated user's UID
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      // Allow read, update, and delete if the userId in the document matches the authenticated user's UID
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // Calories
    match /calories/{calorieId} {
      // Allow create if the userId in the document matches the authenticated user's UID
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      // Allow read, update, and delete if the userId in the document matches the authenticated user's UID
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // Water Intake
    match /waterIntake/{userId} {
      // Allow read and write if the authenticated user's UID matches the document ID
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Nested user-specific collections
    match /users/{userId} {
      // General rule for all user-level data
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Nested collections under /users/{userId}
      match /calories/{calorieId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }

      match /workouts/{workoutId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
   }
   }

   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:3000`.

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy to Vercel:
   - Connect your GitHub repository to Vercel.
   - Follow the Vercel setup instructions to deploy your app.

## Usage

- Sign up or log in using the authentication system.
- Use the **Workout Planner** to create, edit, or remove daily workouts.
- Log your daily calorie intake and calories burned in the **Nutrition Tracker**.
- View your progress for the week on the **Insights Dashboard**.

## Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License.

---

Feel free to reach out if you encounter any issues or have suggestions for improvement!
