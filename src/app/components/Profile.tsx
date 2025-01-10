import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearUser } from '../../store/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import SignIn from './SignIn';
// import Image from 'next/image';

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
    <div className="max-w-sm mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Your Profile
      </h2>
      <div className="text-gray-700">
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <span>upload/change image</span>
       
          {/* <Image
            src={profilePicture || '/default-profile.png'} 
            alt={user.name || 'Profile Picture'}
            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 mb-4"
            width={96}
            height={96}
        /> */}
        
        
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white font-bold py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
