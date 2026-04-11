
import { format } from "date-fns";

type DateTime = number | string | Date;

const getTime = (date: DateTime) => new Date(date).getTime();

export const isLive = (since: DateTime, till: DateTime) => {
  const now = getTime(new Date());
  const sinceTime = getTime(since);
  const sinceTill = getTime(till);
  return now >= sinceTime && sinceTill > now;
};

export const getProgress = (since: DateTime, till: DateTime): number => {
  const now = getTime(new Date());
  const sinceTime = getTime(since);
  const tillTime = getTime(till);

  const total = tillTime - sinceTime;
  const elapsed = now - sinceTime;

  if (total <= 0) return 0;

  const progress = (elapsed / total) * 100;

  // clamp entre 0 y 100
  return Math.min(100, Math.max(0, progress));
}

export const formatTime = (
  date: DateTime,
  formatType: string = "yyyy-MM-dd HH:mm:ss"
) => format(new Date(date), formatType).replace(/\s/g, "");;


export const set12HoursTimeFormat = (isBaseTimeFormat?: boolean) => {
  if (isBaseTimeFormat) return "h:mm a";
  return "HH:mm";
};