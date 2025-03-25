import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100)
  const [inputMinutes, setInputMinutes] = useState("25")
  const [inputSeconds, setInputSeconds] = useState("0")

  const totalSeconds = useRef(minutes * 60 + seconds)
  const initialTotalSeconds = useRef(totalSeconds.current)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (totalSeconds.current <= 0) {
          clearInterval(interval as NodeJS.Timeout)
          setIsActive(false)
          setIsPaused(false)
          return
        }

        totalSeconds.current -= 1
        setMinutes(Math.floor(totalSeconds.current / 60))
        setSeconds(totalSeconds.current % 60)
        setProgress((totalSeconds.current / initialTotalSeconds.current) * 100)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused])

  const startTimer = () => {
    if (!isActive) {
      const mins = Number.parseInt(inputMinutes) || 0
      const secs = Number.parseInt(inputSeconds) || 0

      if (mins === 0 && secs === 0) return 

      totalSeconds.current = mins * 60 + secs
      initialTotalSeconds.current = totalSeconds.current
      setMinutes(mins)
      setSeconds(secs)
      setProgress(100)
    }

    setIsActive(true)
    setIsPaused(false)
  }

  const pauseTimer = () => {
    setIsPaused(true)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setInputMinutes("25")
    setInputSeconds("0")
    setMinutes(25)
    setSeconds(0)
    totalSeconds.current = 25 * 60
    initialTotalSeconds.current = totalSeconds.current
    setProgress(100)
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setInputMinutes(value)
    }
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (/^\d+$/.test(value) && Number.parseInt(value) < 60)) {
      setInputSeconds(value)
    }
  }

  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  return (

    <div className="bg-muted w-full h-full grid place-content-center">
    <div className="flex flex-col items-center space-y-8 w-full max-w-md bg-white p-6 rounded-lg">
      <h1 className="text-3xl font-bold">Pomodoro Timer</h1>

      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full bg-muted"></div>

        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            className="text-primary transition-all duration-300 ease-in-out"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">{formatTime(minutes, seconds)}</span>
        </div>
      </div>

      <div className={cn("grid grid-cols-2 gap-4 w-full", isActive && "opacity-50 pointer-events-none")}>
        <div className="flex flex-col gap-3">
          <Label htmlFor="minutes">Minutes</Label>
          <Input
            id="minutes"
            type="text"
            value={inputMinutes}
            onChange={handleMinutesChange}
            className="text-center"
            disabled={isActive}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="seconds">Seconds</Label>
          <Input
            id="seconds"
            type="text"
            value={inputSeconds}
            onChange={handleSecondsChange}
            className="text-center"
            disabled={isActive}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        {!isActive || isPaused ? (
          <Button onClick={startTimer} size="lg" className="w-24">
            <Play className="mr-2 h-4 w-4" />
            {isPaused ? "Resume" : "Start"}
          </Button>
        ) : (
          <Button onClick={pauseTimer} size="lg" variant="outline" className="w-24">
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}
        <Button onClick={resetTimer} size="lg" variant="outline" className="w-24">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
    </div>
  )
}

