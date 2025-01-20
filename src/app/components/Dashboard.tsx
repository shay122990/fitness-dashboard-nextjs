import Card from "./Card";
import Image from "next/image";

interface DashboardProps {
  setActiveTab: (tabId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <Image src="/today-logo.png" width="100" height="100" alt="App Logo" className="w-20 mx-auto mb-4 animate-fadeIn rounded-full" />
      
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 break-words">Welcome to Your Fitness Hub!</h1>
        <p className="text-lg">Plan. Track. Achieve. All in one place.</p>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-green-100 rounded-lg shadow-md">
          <h4 className="font-bold text-green-600">Workouts This Week</h4>
          <p className="text-2xl font-semibold text-black">5</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
          <h4 className="font-bold text-yellow-600">Calories Tracked</h4>
          <p className="text-2xl font-semibold text-black">12,000</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Workout Planner"
          description="Plan and track your workouts to stay on track with your fitness goals."
          tabId="planner"
          setActiveTab={setActiveTab}
          textColor="text-black"
        />
        <Card
          title="Nutrition Tracker"
          description="Track your meals and calories to maintain a balanced diet."
          tabId="nutrition"
          setActiveTab={setActiveTab}
          textColor="text-black"
        />
        <Card
          title="Insights"
          description="View your progress, workout statistics, and overall fitness trends."
          tabId="insights"
          setActiveTab={setActiveTab}
          textColor="text-black"
        />
        <Card
          title="Profile"
          description="Update your personal information and view your fitness profile."
          tabId="profile"
          setActiveTab={setActiveTab}
          textColor="text-black"
        />
      </div>
    </div>
  );
};

export default Dashboard;
