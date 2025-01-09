---
### **Today Fitness Planner**

Today Fitness Planner is a fitness dashboard application built with **Next.js**. It allows users to plan and track their workouts, helping them stay organized and achieve their fitness goals.
---

### **Features**

- **Workout Slices:** Manage workout plans using Redux Toolkit slices.
- **State Management:** Centralized state handling for a seamless user experience.
- **Next.js Framework:** Optimized performance with server-side rendering and routing.

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/shay122990/fitness-dashboard-nextjs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd today-fitness-planner
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

### **Folder Structure**

```
src/
├── store/
│   ├── index.ts          # Redux store configuration
│   ├── workoutsSlice.ts  # Slice for managing workouts
├── components/           # Reusable components
```

---

### **Firestore rules**

```
service cloud.firestore {
  match /databases/{database}/documents {
    // Profiles
    match /profiles/{userId} {
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

    // Allow nested collections for user-specific data
    match /users/{userId}/calories/{calorieId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### **Tech Stack**

- **Next.js**
- **Redux Toolkit**
- **TypeScript**

---

### **Contributing**

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

### **License**

This project is licensed under the [MIT License](LICENSE).

---
