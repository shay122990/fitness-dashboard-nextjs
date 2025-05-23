import Button from "../components/Button";
import { LoadingSpinner } from "./LoadingSpinner";

interface AuthCheckProps {
  authLoading: boolean;
  userId: string | null;
  loading: boolean;
  onRedirect: () => void;
  message?: string;
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  authLoading,
  userId,
  loading,
  onRedirect,
  message,
  children,
}) => {
  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Checking authentication...</div>
  }

  if (!userId) {
    return (
      <div className="flex justify-center w-full h-full px-6 pb-4 pt-20 bg-black bg-opacity-30 rounded">
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 text-center justify-center w-96 h-60">
          <h2 className="text-2xl font-bold mb-4 text-blue-950">Sign In Required</h2>
          <p className="text-blue-950 mb-6">{message}</p>
          <Button label="Go to Profile" onClick={onRedirect} className="bg-green-500" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
       <LoadingSpinner/>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;
