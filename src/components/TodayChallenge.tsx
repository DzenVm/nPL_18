import { cacheLife } from "next/cache";
import { getDailyChallenge } from "@/lib/daily-seed";
import styles from "./TodayChallenge.module.css";

export async function TodayChallenge() {
  "use cache";
  cacheLife("hours");
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
