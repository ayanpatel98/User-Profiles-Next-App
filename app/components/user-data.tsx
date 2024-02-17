"use client"
import { useState } from 'react';
import Link from 'next/link';
import { User } from '../models/user';

interface Props {
  user: User;
}

const UserData: React.FC<Props> = ({ user }) => {
  const [likes, setLikes] = useState<number>(user.likes);
  const [isLiked, setLiked] = useState<boolean>(user.isLiked);

  const handleLike = async (): Promise<void> => {
    try {
      // Send a POST request to the server API to update like status
      const response = await fetch('/api/server-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          currentLiked: isLiked,
          currentLikes: likes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }
      
      // Update likes and like status locally based on the response
      setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1));
      setLiked(wasLiked => !wasLiked);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return (
    <div className="border rounded p-4 bg-gray-100 hover:shadow-xl
     hover:bg-gray-300 ease-in-out duration-200" title='Go to Details'>
      <Link href={`/user-details/${user.id}`}>
        <div className='cursor-pointer'>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p><span className='font-bold'>Email: </span>{user.email}</p>
          <p><span className='font-bold'>Phone Number:</span> {user.phone}</p>
          <p><span className='font-bold'>User Website:</span> {user.website}</p>
          <p className='font-bold'>Likes: <span className='text-green-600'>{likes}</span></p>
        </div>
      </Link>
      <div className='text-center'>
        {/*  change button color based on isLike boolean */}
        <button className={`${isLiked ? 'bg-red-500' : 'bg-blue-500'} rounded text-white px-2 py-1 mt-2`}
          onClick={handleLike} >
          {isLiked ? 'Dislike' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default UserData;