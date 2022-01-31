import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

export function updateLocaleDayJs() {
  dayjs.extend(updateLocale);
  dayjs.extend(relativeTime);
  dayjs.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: 'a few seconds',
      m: "a minute",
      mm: "%d mins",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    }
  })
}

export function timeSince(date) {
  if (!date) return '';
  return dayjs(date).fromNow();
}

export function formatDate(date, format = 'DD-MM-YYYY') {
  if (!date) return '';
  return dayjs(date).format(format)
}