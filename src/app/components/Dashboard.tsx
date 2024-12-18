import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="border p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-6">Your personal tracker.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Workout Planner"
          description="Plan and track your workouts to stay on track with your fitness goals."
          link="/workout-planner"
        />
        <Card
          title="Nutrition Tracker"
          description="Track your meals and calories to maintain a balanced diet."
          link="/nutrition-tracker"
        />
        <Card
          title="Insights"
          description="View your progress, workout statistics, and overall fitness trends."
          link="/insights"
        />
        <Card
          title="Profile"
          description="Update your personal information and view your fitness profile."
          link="/profile"
        />
      </div>
    </div>
  );
};

export default Dashboard;
