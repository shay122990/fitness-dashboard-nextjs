"use client";

import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import Card from "./Card";
import Button from "./Button";

const beepSound = typeof window !== "undefined" ? new Audio("/beep.mp3") : null;

const IntervalTimer = () => {
  const [workTime, setWorkTime] = useState("30");
  const [restTime, setRestTime] = useState("15");
  const [rounds, setRounds] = useState("5");

  const [timeLeft, setTimeLeft] = useState(Number(workTime));
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      if (currentRound >= Number(rounds) && !isWorkPhase) {
        setIsRunning(false);
        return;
      }

      setIsWorkPhase((prev) => !prev);
      setTimeLeft(isWorkPhase ? Number(restTime) : Number(workTime));

      if (!isWorkPhase) setCurrentRound((prev) => prev + 1);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          beepSound?.play(); 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, currentRound, rounds, workTime, restTime]);

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
      className="p-6 w-full max-w-md text-center"
    >
      {!hasStarted ? (
        <div className="grid grid-cols-1 gap-4">
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
          <Button label="Start" onClick={handleStart} className="bg-green-500 text-white" />
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
