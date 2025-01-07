import { useDispatch } from 'react-redux';
import { googleSignIn } from '../../firebase/auth';
import { FaGoogle } from "react-icons/fa";


const SignInButton = () => {
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      await googleSignIn(dispatch);
    } catch (error) {
      console.error('Sign-In failed:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform gap-1"
    >
      <FaGoogle/>
      Sign in with Google
    </button>
  );
};

export default SignInButton;
