import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearUser, setUser } from '../../store/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import SignIn from './SignIn';
import Image from 'next/image';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only JPEG or PNG images are allowed.');
        return;
      }
      if (file.size > 1048576) { // 1MB limit
        setError('Image size should not exceed 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfilePicture(reader.result as string);
          if (user) {
            dispatch(setUser({ ...user, photoURL: reader.result as string }));
          }
        }
      };
      reader.readAsDataURL(file);
      setError('');
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
        {profilePicture && (
          <Image
            src={profilePicture || '/default-profile.png'} 
            alt={user.name || 'Profile Picture'}
            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 mb-4"
            width={96}
            height={96}
        />
        
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:border-blue-500 mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
