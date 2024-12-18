import { useDispatch } from 'react-redux';
import { googleSignIn } from '../../firebase/auth';

const SignInButton = () => {
  const dispatch = useDispatch(); 

  const handleSignIn = async () => {
    try {
      await googleSignIn(dispatch); 
    } catch (error) {
      console.error('Sign-In failed:', error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default SignInButton;
