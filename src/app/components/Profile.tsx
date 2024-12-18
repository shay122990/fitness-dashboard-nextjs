import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; 
import { clearUser } from '../../store/authSlice'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config'; 
import SignIn from './SignIn';  

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);  

  const handleLogout = async () => {
    try {
      await signOut(auth);  
      dispatch(clearUser());  
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return <SignIn />;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* {user.photoURL && <img src={user.photoURL} alt={user.name} />} */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
