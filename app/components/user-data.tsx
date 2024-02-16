"use client"
import { useState } from 'react';
import Link from 'next/link';
import { incrementDecrementLike } from '../services/api';

const UserData = ( {user}: any ) => {
  const [likes, setLikes] = useState(user.likes);
  const [liked, setLiked] = useState(user.liked);

  const handleLike = () => {
    setLikes((prevLikes : any) => liked ? prevLikes - 1 : prevLikes + 1);
    setLiked((prevLiked : any) => !prevLiked);
    incrementDecrementLike(user.id, liked, likes);
  };

  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
      <p>Likes: {likes}</p>
      <button className="bg-blue-500 text-white px-2 py-1 mt-2"
        onClick={handleLike} >
          {liked ? 'Unlike' : 'Like'}
      </button>
      <Link href={`/user-details/${user.id}`} legacyBehavior>
        <a className="block mt-2 text-blue-500">View Details</a>
      </Link>
    </div>
  );
};

export default UserData;