import { connection } from "next/server";
import { getDailyChallenge } from "@/lib/daily-seed";
import styles from "./TodayChallenge.module.css";

export async function TodayChallenge() {
  await connection();
  const challenge = getDailyChallenge(new Date());

  return (
    <div className={styles.card}>
      <div className={styles.dateBlock}>
        <span className={styles.dateLabel}>Dziś</span>
        <span className={styles.dateValue}>{challenge.dateLabel}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.note}>{challenge.note}</p>
      </div>
      <div className={styles.ballast}>
        <span className={styles.ballastLabel}>Sugerowany balast</span>
        <span className={styles.ballastValue}>{challenge.ballast}</span>
      </div>
    </div>
  );
}

export function TodayChallengeSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.dateBlock}>
        <span className={styles.dateLabel}>Dziś</span>
        <div className={styles.skeletonBar} style={{ width: "9ch" }} />
      </div>
      <div className={styles.body}>
        <div className={styles.skeletonBar} style={{ width: "70%" }} />
      </div>
      <div className={styles.ballast}>
        <span className={styles.ballastLabel}>Sugerowany balast</span>
        <div className={styles.skeletonBar} style={{ width: "6ch" }} />
      </div>
    </div>
  );
}
