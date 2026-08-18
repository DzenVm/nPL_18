"use client";

import { useSyncExternalStore } from "react";

const FALLBACK_YEAR = 2026;

function subscribe() {
  return () => {};
}

function getClientYear() {
  return new Date().getFullYear();
}

function getServerYear() {
  return FALLBACK_YEAR;
}

export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);
  return <>{year}</>;
}
