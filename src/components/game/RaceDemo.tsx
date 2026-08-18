"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./RaceDemo.module.css";

type Ballast = "Lekki" | "Średni" | "Ciężki";
type Phase = "wybor" | "jazda" | "wynik";

interface BallastConfig {
  cycleMs: number;
  zoneWidth: number;
  accel: number;
  lateHeat: number;
  earlyHeat: number;
  successHeat: number;
}

const BALLAST_ORDER: Ballast[] = ["Lekki", "Średni", "Ciężki"];

const BALLAST_CONFIG: Record<Ballast, BallastConfig> = {
  Lekki: { cycleMs: 1500, zoneWidth: 13, accel: 15, lateHeat: 30, earlyHeat: 9, successHeat: 4 },
  Średni: { cycleMs: 1650, zoneWidth: 19, accel: 12, lateHeat: 22, earlyHeat: 6, successHeat: 3 },
  Ciężki: { cycleMs: 1800, zoneWidth: 27, accel: 9, lateHeat: 15, earlyHeat: 4, successHeat: 2 },
};

const BALLAST_BLURB: Record<Ballast, string> = {
  Lekki: "Szybki rozpęd, wąskie okno na zmianę biegu — dla pewnej ręki.",
  Średni: "Rozsądny środek: ani najszybszy, ani najbardziej wybaczający.",
  Ciężki: "Wolniejszy rozpęd, ale szerokie okno wybacza spóźnienia.",
};

const ZONE_CENTERS = [42, 60, 36, 66, 48, 55];
const TOTAL_LAPS = 3;
const PIT_STOP_MS = 2400;
const MIN_CYCLE_MS = 950;
const MAX_GEAR = 6;
const BEST_TIMES_KEY = "nometuwe-best-times";
const BEST_TIMES_EVENT = "nometuwe-best-times-changed";

type BestTimes = Partial<Record<Ballast, number>>;

const EMPTY_BEST_TIMES: BestTimes = {};
let bestTimesCache: BestTimes | null = null;

function readBestTimesFromStorage(): BestTimes {
  try {
    const raw = window.localStorage.getItem(BEST_TIMES_KEY);
    return raw ? (JSON.parse(raw) as BestTimes) : {};
  } catch {
    return {};
  }
}

function getClientBestTimes(): BestTimes {
  if (!bestTimesCache) bestTimesCache = readBestTimesFromStorage();
  return bestTimesCache;
}

function getServerBestTimes(): BestTimes {
  return EMPTY_BEST_TIMES;
}

function subscribeBestTimes(callback: () => void) {
  window.addEventListener(BEST_TIMES_EVENT, callback);
  return () => window.removeEventListener(BEST_TIMES_EVENT, callback);
}

function persistBestTime(ballast: Ballast, ms: number): boolean {
  const current = readBestTimesFromStorage();
  const existing = current[ballast];
  if (existing === undefined || ms < existing) {
    current[ballast] = ms;
    window.localStorage.setItem(BEST_TIMES_KEY, JSON.stringify(current));
    bestTimesCache = current;
    window.dispatchEvent(new CustomEvent(BEST_TIMES_EVENT));
    return true;
  }
  return false;
}

function zoneFor(shiftCount: number, width: number) {
  const center = ZONE_CENTERS[shiftCount % ZONE_CENTERS.length]!;
  const half = width / 2;
  return { start: Math.max(4, center - half), end: Math.min(96, center + half) };
}

function formatTime(ms: number): string {
  const totalCentis = Math.max(0, Math.floor(ms / 10));
  const minutes = Math.floor(totalCentis / 6000);
  const seconds = Math.floor((totalCentis % 6000) / 100);
  const centis = totalCentis % 100;
  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
}

interface RaceState {
  cycleStart: number;
  lastFrame: number;
  shiftCount: number;
  handledThisCycle: boolean;
  raceTimeMs: number;
  pitRemaining: number;
  gear: number;
  heat: number;
  lapsDone: number;
  lapProgress: number;
}

function freshRaceState(now: number): RaceState {
  return {
    cycleStart: now,
    lastFrame: now,
    shiftCount: 0,
    handledThisCycle: false,
    raceTimeMs: 0,
    pitRemaining: 0,
    gear: 1,
    heat: 0,
    lapsDone: 0,
    lapProgress: 0,
  };
}

export function RaceDemo() {
  const [phase, setPhase] = useState<Phase>("wybor");
  const [ballast, setBallast] = useState<Ballast>("Średni");
  const [message, setMessage] = useState(
    "Wybierz balast, żeby zacząć — wpłynie na to, jak szeroko wybaczamy timing."
  );
  const [display, setDisplay] = useState(() => freshRaceState(0));
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  const bestTimes = useSyncExternalStore(subscribeBestTimes, getClientBestTimes, getServerBestTimes);

  const needleRef = useRef<HTMLDivElement | null>(null);
  const timerElRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const raceRef = useRef<RaceState>(freshRaceState(0));
  const ballastRef = useRef<Ballast>("Średni");

  const finishRace = useCallback((s: RaceState, chosen: Ballast) => {
    const beat = persistBestTime(chosen, s.raceTimeMs);
    setFinalTime(s.raceTimeMs);
    setIsNewBest(beat);
    setPhase("wynik");
  }, []);

  const stepFrame = useCallback(
    function stepFrame(now: number) {
      const s = raceRef.current;
      const config = BALLAST_CONFIG[ballastRef.current];
      const delta = Math.min(64, now - s.lastFrame);
      s.lastFrame = now;
      s.raceTimeMs += delta;
      if (timerElRef.current) timerElRef.current.textContent = formatTime(s.raceTimeMs);

      if (s.pitRemaining > 0) {
        s.pitRemaining -= delta;
        if (needleRef.current) needleRef.current.style.setProperty("--needle-pos", "0%");
        if (s.pitRemaining <= 0) {
          s.pitRemaining = 0;
          s.cycleStart = now;
          s.handledThisCycle = false;
          setMessage("Wracasz na tor — pasek napędu jest znów zimny.");
          setDisplay({ ...s });
        }
        rafRef.current = requestAnimationFrame(stepFrame);
        return;
      }

      const cycleMs = Math.max(MIN_CYCLE_MS, config.cycleMs - s.shiftCount * 30);
      const elapsed = now - s.cycleStart;
      const value = Math.min(100, (elapsed / cycleMs) * 100);

      if (needleRef.current) {
        needleRef.current.style.setProperty("--needle-pos", `${value}%`);
      }

      if (value >= 100 && !s.handledThisCycle) {
        s.handledThisCycle = true;
        s.heat = Math.min(100, s.heat + config.lateHeat);
        s.lapProgress += config.accel * 0.35;
        setMessage("Za późno — nikt nie zmienił biegu, więc pasek się przegrzewa.");
        if (s.heat >= 100) {
          s.heat = 100;
          s.pitRemaining = PIT_STOP_MS;
          setMessage("Pasek napędu przegrzany — krótki postój techniczny.");
        }
        if (s.lapProgress >= 100) {
          s.lapProgress -= 100;
          s.lapsDone += 1;
        }
        setDisplay({ ...s });
        if (s.lapsDone >= TOTAL_LAPS) {
          finishRace(s, ballastRef.current);
          return;
        }
      } else if (value >= 100) {
        s.cycleStart = now;
        s.handledThisCycle = false;
      }

      rafRef.current = requestAnimationFrame(stepFrame);
    },
    [finishRace]
  );

  useEffect(() => {
    if (phase !== "jazda") return;
    rafRef.current = requestAnimationFrame(stepFrame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, stepFrame]);

  const handleShift = useCallback(() => {
    const s = raceRef.current;
    if (phase !== "jazda" || s.pitRemaining > 0 || s.handledThisCycle) return;

    const config = BALLAST_CONFIG[ballastRef.current];
    const now = performance.now();
    const cycleMs = Math.max(MIN_CYCLE_MS, config.cycleMs - s.shiftCount * 30);
    const value = Math.min(100, ((now - s.cycleStart) / cycleMs) * 100);
    const zone = zoneFor(s.shiftCount, config.zoneWidth);

    s.handledThisCycle = true;

    if (value < zone.start) {
      s.gear = Math.max(1, s.gear - 1);
      s.heat = Math.min(100, s.heat + config.earlyHeat);
      setMessage("Za wcześnie — silnik zgasł, tracisz część rozpędu.");
    } else if (value > zone.end) {
      s.heat = Math.min(100, s.heat + config.lateHeat);
      s.lapProgress += config.accel * 0.4;
      setMessage("Za późno — pasek napędu się grzeje.");
    } else {
      s.shiftCount += 1;
      s.gear = Math.min(MAX_GEAR, s.gear + 1);
      s.heat = Math.min(100, s.heat + config.successHeat);
      s.lapProgress += config.accel;
      setMessage("Czysta zmiana biegu.");
    }

    if (s.heat >= 100) {
      s.heat = 100;
      s.pitRemaining = PIT_STOP_MS;
      setMessage("Pasek napędu przegrzany — krótki postój techniczny.");
    }

    if (s.lapProgress >= 100) {
      s.lapProgress -= 100;
      s.lapsDone += 1;
    }

    setDisplay({ ...s });

    if (s.lapsDone >= TOTAL_LAPS) {
      finishRace(s, ballastRef.current);
      return;
    }

    s.cycleStart = now;
    s.handledThisCycle = false;
  }, [phase, finishRace]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleShift();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleShift]);

  const startRace = useCallback((chosen: Ballast) => {
    const now = performance.now();
    ballastRef.current = chosen;
    raceRef.current = freshRaceState(now);
    setBallast(chosen);
    setDisplay(freshRaceState(now));
    setMessage("Jazda! Obserwuj pasek obrotów i łap zielone pole.");
    setFinalTime(null);
    setIsNewBest(false);
    if (needleRef.current) needleRef.current.style.setProperty("--needle-pos", "0%");
    setPhase("jazda");
  }, []);

  const zone = zoneFor(display.shiftCount, BALLAST_CONFIG[ballast].zoneWidth);
  const personalBest = bestTimes[ballast];

  return (
    <div className={styles.wrap}>
      {phase === "wybor" && (
        <div className={styles.pickPanel}>
          <h2 className={styles.pickTitle}>Wybierz balast przed startem</h2>
          <div className={styles.pickGrid}>
            {BALLAST_ORDER.map((b) => (
              <button key={b} type="button" className={styles.pickCard} onClick={() => startRace(b)}>
                <span className={styles.pickName}>{b}</span>
                <span className={styles.pickBlurb}>{BALLAST_BLURB[b]}</span>
                {bestTimes[b] !== undefined && (
                  <span className={`${styles.pickBest} numeric`}>
                    Rekord: {formatTime(bestTimes[b]!)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase !== "wybor" && (
        <div className={styles.race}>
          <div className={styles.hud}>
            <div className={styles.hudItem}>
              <span className={styles.hudLabel}>Bieg</span>
              <span className={`${styles.hudValue} numeric`}>{display.gear}</span>
            </div>
            <div className={styles.hudItem}>
              <span className={styles.hudLabel}>Okrążenie</span>
              <span className={`${styles.hudValue} numeric`}>
                {Math.min(display.lapsDone + 1, TOTAL_LAPS)}/{TOTAL_LAPS}
              </span>
            </div>
            <div className={styles.hudItem}>
              <span className={styles.hudLabel}>Czas</span>
              <span className={`${styles.hudValue} numeric`} ref={timerElRef}>
                0:00.00
              </span>
            </div>
            <div className={styles.hudItem}>
              <span className={styles.hudLabel}>Balast</span>
              <span className={styles.hudValue}>{ballast}</span>
            </div>
          </div>

          <div className={styles.heatRow}>
            <span className={styles.heatLabel}>Pasek napędu</span>
            <div className={styles.heatTrack}>
              <div
                className={styles.heatFill}
                style={{ "--meter-fill": `${display.heat}%` } as React.CSSProperties}
              />
            </div>
            <span className={`${styles.heatValue} numeric`}>{Math.round(display.heat)}%</span>
          </div>

          <div className={styles.lapTrack} aria-hidden="true">
            {Array.from({ length: TOTAL_LAPS }).map((_, i) => (
              <div className={styles.lapSegment} key={i}>
                <div
                  className={styles.lapFill}
                  style={{
                    width:
                      i < display.lapsDone ? "100%" : i === display.lapsDone ? `${display.lapProgress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className={styles.gauge}>
            <div className={styles.gaugeTrack}>
              <div className={styles.gaugeZone} style={{ left: `${zone.start}%`, width: `${zone.end - zone.start}%` }} />
              <div className={styles.gaugeNeedle} ref={needleRef} />
            </div>
            <div className={styles.gaugeScale}>
              <span>Wolne obroty</span>
              <span>Czerwone pole</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.shiftButton}
            onClick={handleShift}
            disabled={phase !== "jazda" || display.pitRemaining > 0}
          >
            {display.pitRemaining > 0 ? "Postój techniczny…" : "Zmień bieg"}
          </button>

          <p className={styles.message} aria-live="polite">
            {message}
          </p>

          {phase === "wynik" && finalTime !== null && (
            <div className={styles.resultPanel}>
              <p className={styles.resultTime}>
                Czas: <span className="numeric">{formatTime(finalTime)}</span>
              </p>
              <p className={styles.resultNote}>
                {isNewBest
                  ? "Nowy najlepszy czas w tej przeglądarce dla tego balastu."
                  : personalBest !== undefined
                    ? `Najlepszy czas w tej przeglądarce: ${formatTime(personalBest)}.`
                    : "Zapisano jako pierwszy czas dla tego balastu w tej przeglądarce."}
              </p>
              <div className={styles.resultActions}>
                <button type="button" className={styles.pickCardSmall} onClick={() => startRace(ballast)}>
                  Jedź jeszcze raz
                </button>
                <button type="button" className={styles.pickCardSmall} onClick={() => setPhase("wybor")}>
                  Zmień balast
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
