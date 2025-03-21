"use client";

import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import Card from "./Card";
import Button from "./Button";

const workBeep = typeof window !== "undefined" ? new Audio("/workBeep.mp3") : null;
const restBeep = typeof window !== "undefined" ? new Audio("/restBeep.mp3") : null;
const transitionBeep = typeof window !== "undefined" ? new Audio("/transitionBeep.mp3") : null;

const IntervalTimer = () => {
  const [workTime, setWorkTime] = useState("30");
  const [restTime, setRestTime] = useState("15");
  const [rounds, setRounds] = useState("5");

  const [timeLeft, setTimeLeft] = useState(Number(workTime));
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isRunning || isTransitioning) return;
  
    if (timeLeft === 0) {
      setIsTransitioning(true); 
      
      setTimeout(() => {
        transitionBeep?.play(); 
        
        setTimeout(() => {
          if (currentRound >= Number(rounds) && !isWorkPhase) {
            setIsRunning(false);
            setIsTransitioning(false);
            return;
          }
  
          setIsWorkPhase((prev) => !prev);
          const nextTime = isWorkPhase ? Number(restTime) : Number(workTime);
          setTimeLeft(nextTime);
  
          setIsTransitioning(false);
        }, 2000); 
      }, 0); 
  
      return;
    }
  
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          if (isWorkPhase) {
            workBeep?.play();
          } else {
            restBeep?.play();
          }
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, currentRound, rounds, workTime, restTime, isTransitioning]);

  const handleStart = () => {
    if (Number(workTime) <= 0 || Number(restTime) <= 0 || Number(rounds) <= 0) return;
    setHasStarted(true);
    setIsRunning(true);
    setTimeLeft(Number(workTime));
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkPhase(true);
    setCurrentRound(1);
    setTimeLeft(Number(workTime));
    setHasStarted(false);
  };

  return (
    <Card
      title="Interval Timer"
      description="Customize your interval training by setting work and rest durations."
      className=" text-center text-sm rounded-lg"
    >
      {!hasStarted ? (
        <div className="grid grid-cols-1 gap-3">
          <InputBox
            label="Work Time (seconds)"
            placeholder="Enter work time"
            value={workTime}
            onChange={setWorkTime}
            type="number"
          />
          <InputBox
            label="Rest Time (seconds)"
            placeholder="Enter rest time"
            value={restTime}
            onChange={setRestTime}
            type="number"
          />
          <InputBox
            label="Rounds"
            placeholder="Enter number of rounds"
            value={rounds}
            onChange={setRounds}
            type="number"
          />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mt-4">{isWorkPhase ? "Work" : "Rest"} Time</h2>
          <p className="text-5xl font-bold my-4">{timeLeft}s</p>
          <p className="text-lg">Round: {currentRound}/{rounds}</p>
        </>
      )}

      <div className="flex justify-center gap-4 mt-6">
        {!hasStarted ? (
          <Button label="Start" onClick={handleStart} className="bg-gradient-to-br from-gray-950  to-gray-800 text-green-400 shadow-md shadow-green-400/50" />
        ) : (
          <>
            <Button
              label={isRunning ? "Pause" : "Resume"}
              onClick={handlePauseResume}
              className="bg-blue-500 text-white"
            />
            <Button label="Reset" onClick={handleReset} className="bg-red-500 text-white" />
          </>
        )}
      </div>
    </Card>
  );
};

export default IntervalTimer;
