'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const handleLike = (): void => {
    setLiked((prev: boolean) => !prev);
    setCount((prev: number) => prev + (liked ? -1 : 1));
  };

  return (
    <button
      onClick={handleLike}
      className={`rounded-full px-6 py-3 text-lg font-bold transition-all ${
        liked
          ? 'scale-110 bg-red-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {liked ? '❤' : '🤍'} {count} Likes
    </button>
  );
}
