"use client";

import { useState, useEffect } from "react";

const IntervalTimer = () => {
  const [workTime, setWorkTime] = useState(30); 
  const [restTime, setRestTime] = useState(15); 
  const [rounds, setRounds] = useState(5);

  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [hasStarted, setHasStarted] = useState(false); 

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      if (currentRound >= rounds && !isWorkPhase) {
        setIsRunning(false); 
        return;
      }

      setIsWorkPhase((prev) => !prev);
      setTimeLeft(isWorkPhase ? restTime : workTime);

      if (!isWorkPhase) setCurrentRound((prev) => prev + 1);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, currentRound, rounds, workTime, restTime]);

  const handleStart = () => {
    setHasStarted(true);
    setIsRunning(true);
    setTimeLeft(workTime);
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkPhase(true);
    setCurrentRound(1);
    setTimeLeft(workTime);
    setHasStarted(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Interval Timer</h2>

      {!hasStarted && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm">Work Time (s)</label>
            <input
              type="number"
              value={workTime}
              min={1}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              className="p-2 rounded text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Rest Time (s)</label>
            <input
              type="number"
              value={restTime}
              min={1}
              onChange={(e) => setRestTime(Number(e.target.value))}
              className="p-2 rounded text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Rounds</label>
            <input
              type="number"
              value={rounds}
              min={1}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="p-2 rounded text-black"
            />
          </div>
        </div>
      )}

      {hasStarted && (
        <>
          <h2 className="text-xl font-bold">{isWorkPhase ? "Work" : "Rest"} Time</h2>
          <p className="text-4xl font-bold my-4">{timeLeft}s</p>
          <p className="text-lg">Round: {currentRound}/{rounds}</p>
        </>
      )}

      <div className="flex gap-4 mt-4">
        {!hasStarted ? (
          <button onClick={handleStart} className="px-4 py-2 bg-green-500 rounded">Start</button>
        ) : (
          <>
            <button onClick={handlePauseResume} className="px-4 py-2 bg-blue-500 rounded">
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button onClick={handleReset} className="px-4 py-2 bg-red-500 rounded">Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default IntervalTimer;
