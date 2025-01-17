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
    return <div>Checking authentication...</div>;
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Sign In Required</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onRedirect}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading your progress...</div>;
  }

  return <>{children}</>;
};

export default AuthCheck;
