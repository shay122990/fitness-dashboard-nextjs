"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import InputBox from "../../components/InputBox";
import Card from "../../components/Card";
import Button from "../../components/Button";

type Phase = "work" | "rest" | "complete";

const IntervalTimer = () => {
  const [superRounds, setSuperRounds] = useState("2");
  const [rounds, setRounds] = useState("5");
  const [workTime, setWorkTime] = useState("30");
  const [restTime, setRestTime] = useState("15");

  const [currentPhase, setCurrentPhase] = useState<Phase>("work");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSuperRound, setCurrentSuperRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const workBeep = useRef<HTMLAudioElement | null>(null);
  const restBeep = useRef<HTMLAudioElement | null>(null);
  const transitionBeep = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      workBeep.current = new Audio("/workBeep.mp3");
      restBeep.current = new Audio("/restBeep.mp3");
      transitionBeep.current = new Audio("/transitionBeep.mp3");
    }
  }, []);

  const playCountdownBeep = useCallback(() => {
    if (currentPhase === "work") {
      workBeep.current?.play().catch(() => {});
    } else if (currentPhase === "rest") {
      restBeep.current?.play().catch(() => {});
    }
  }, [currentPhase]);

  const handlePhaseChange = useCallback(() => {
    if (currentPhase === "work") {
      setCurrentPhase("rest");
      setTimeLeft(Number(restTime));
    } else if (currentPhase === "rest") {
      if (currentRound >= Number(rounds)) {
        if (currentSuperRound >= Number(superRounds)) {
          setCurrentPhase("complete");
          setIsRunning(false);
          transitionBeep.current?.play().catch(() => {});
          return;
        } else {
          setCurrentSuperRound((prev) => prev + 1);
          setCurrentRound(1);
        }
      } else {
        setCurrentRound((prev) => prev + 1);
      }
      setCurrentPhase("work");
      setTimeLeft(Number(workTime));
    }
  }, [
    currentPhase,
    currentRound,
    currentSuperRound,
    restTime,
    rounds,
    superRounds,
    workTime,
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          if (prev <= 4) {
            playCountdownBeep();
          }
          return prev - 1;
        } else {
          handlePhaseChange();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentPhase, playCountdownBeep, handlePhaseChange]);

  const unlockAudio = async () => {
    try {
      await workBeep.current?.play();
      workBeep.current?.pause();
      workBeep.current!.currentTime = 0;

      await restBeep.current?.play();
      restBeep.current?.pause();
      restBeep.current!.currentTime = 0;

      await transitionBeep.current?.play();
      transitionBeep.current?.pause();
      transitionBeep.current!.currentTime = 0;
    } catch (err) {
      console.error("Audio unlock failed:", err);
    }
  };

  const handleStart = async () => {
    if (
      Number(workTime) <= 0 ||
      Number(restTime) <= 0 ||
      Number(rounds) <= 0 ||
      Number(superRounds) <= 0
    )
      return;

    await unlockAudio();

    setCurrentPhase("work");
    setTimeLeft(Number(workTime));
    setCurrentRound(1);
    setCurrentSuperRound(1);
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setCurrentRound(1);
    setCurrentSuperRound(1);
    setTimeLeft(0);
    setCurrentPhase("work");
  };

  return (
    <Card
      title="Interval Timer"
      description="Customize your interval training by setting work, rest, rounds, and super rounds."
      className="text-center rounded-lg"
    >
      <div className="min-h-[380px] flex flex-col items-center justify-center">
        {!hasStarted ? (
          <div className="grid grid-cols-1 gap-3 w-full">
            <InputBox
              placeholder="Enter number of super rounds"
              label="Super Rounds"
              value={superRounds}
              onChange={setSuperRounds}
              type="number"
            />
            <InputBox
              placeholder="Enter workout time"
              label="Work Time (seconds)"
              value={workTime}
              onChange={setWorkTime}
              type="number"
            />
            <InputBox
              placeholder="Enter rest time"
              label="Rest Time (seconds)"
              value={restTime}
              onChange={setRestTime}
              type="number"
            />
            <InputBox
              placeholder="Enter number of rounds"
              label="Rounds per Super Round"
              value={rounds}
              onChange={setRounds}
              type="number"
            />
          </div>
        ) : currentPhase !== "complete" ? (
          <>
            <h2 className="text-2xl font-bold mt-4 capitalize">
              {currentPhase} Time
            </h2>
            <p className="text-5xl font-bold my-4">{timeLeft}s</p>
            <p className="text-lg">
              Round {currentRound}/{rounds}
            </p>
            <p className="text-lg">
              Super Round {currentSuperRound}/{superRounds}
            </p>
          </>
        ) : (
          <div className="text-green-500 text-xl font-bold mt-6">
            🎉 Workout complete! Great job!
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {!hasStarted ? (
          <Button
            label="Start"
            onClick={handleStart}
            className="bg-gradient-to-br from-gray-950 to-gray-800 text-green-400 shadow-md shadow-green-400/50"
          />
        ) : (
          <>
            {currentPhase !== "complete" && (
              <Button
                label={isRunning ? "Pause" : "Resume"}
                onClick={handlePauseResume}
                className="bg-blue-500 text-white"
              />
            )}
            <Button
              label="Reset"
              onClick={handleReset}
              className="bg-red-500 text-white"
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default IntervalTimer;
