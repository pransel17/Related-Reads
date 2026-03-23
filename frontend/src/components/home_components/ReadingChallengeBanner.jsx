import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import axios from 'axios';

const ReadingChallengePart = () => {
  const { user, loading } = useUserProfile();
  const [ReadingGoal, setNewReadingGoal] = useState(0);

  
  useEffect(() => {
    if (user) {
    
      const dbGoal = Array.isArray(user.ReadingChallengeGoal) 
        ? (user.ReadingChallengeGoal[0] || 0) 
        : (user.ReadingChallengeGoal || 0);
      setNewReadingGoal(dbGoal);
    }
  }, [user]);

  const handleUpdateGoal = async (newGoal) => {
    setNewReadingGoal(newGoal); // Snappy UI update
    
    try {
      
      await axios.post('http://localhost:2001/api/user/EditProfile', { 
        NewReadingChallengeGoal: newGoal 
      }, { withCredentials: true });
      
      console.log("Goal successfully saved!");
    } catch (err) {
      console.error("Failed to save ReadingGoal:", err);
      setNewReadingGoal(user?.ReadingChallengeGoal || 0);
    }
  };

  if (loading) return <div className="card w-72 h-[550px] bg-[#E9E9D4] shadow-xl animate-pulse rounded-3xl" />;

  return (
    <div className="card w-72 h-150 bg-[#E9E9D4] shadow-xl border border-stone-400/20 p-6 ring-1 ring-black/10 rounded-2xl text-[#1A1A1A]">
      <div className='flex flex-col items-center'>
        
        <h2 className="text-lg font-bold uppercase  text-center">
          2026 Reading Challenge
        </h2>
        <p className="text-[13px] text-center mt-2 leading-tight">
          Challenge Yourself to Read More This Year
        </p>

        <div className="relative mt-6 w-60 h-40 bg-[#A7C7E7] rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4">
            <span className='text-[10px] absolute top-2 font-bold opacity-60'>Let's Start</span>
            <h3 className='text-orange-700 font-black text-xl text-center leading-none mt-2'>Reading Challenge</h3>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm font-medium mb-3">I Want to Read</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleUpdateGoal(Math.max(0, ReadingGoal - 1))}
              className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >-</button>
            <span className="text-2xl font-bold">{ReadingGoal}</span>
            <button 
              onClick={() => handleUpdateGoal(ReadingGoal + 1)}
              className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >+</button>
          </div>
          <p className="text-[10px] mt-4 opacity-70 text-center px-4">
            You Can Change Your Goal at Any Time
          </p>
        </div>

        <div className="w-full mt-8 space-y-3">
          <h4 className="text-center font-bold text-sm tracking-widest uppercase mb-4">The Book Shelves</h4>
          
          <div className="flex justify-between text-sm px-2">
            <span>Want to Read</span>
            <span className="font-bold">({user?.ToRead?.length || 0})</span>
          </div>
          
          <div className="flex justify-between text-sm px-2">
            <span>Currently Reading</span>
            <span className="font-bold">({user?.CurrentlyReading?.length || 0})</span>
          </div>

          <div className="flex justify-between text-sm px-2 mb-5">
            <span>Completed</span>
            <span className="font-bold">({user?.Read?.length || 0})</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReadingChallengePart;