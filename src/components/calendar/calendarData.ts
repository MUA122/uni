import iusatLogo from "/imgs/iusat.png";
import unescoLogo from "/imgs/unesco.png";
import academyLogo from "/imgs/iaau.png";

export type CalendarImageItem = {
  src: string;
  alt?: string;
};

export type CalendarDayData = {
  date: string;
  category?: "event" | "important";
  descriptionKey?: string;
  images?: CalendarImageItem[];
};

export const calendarEvents: CalendarDayData[] = [
  {
    date: "2026-01-20",
    category: "event",
    descriptionKey: "events.iaauDay",
    images: [{ src: academyLogo, alt: "IAAU" }],
  },
  {
    date: "2026-01-30",
    category: "event",
    descriptionKey: "events.iusatDay",
    images: [{ src: iusatLogo, alt: "IUSAT" }],
  },
  {
    date: "2026-01-12",
    category: "important",
    descriptionKey: "events.unescoDay",
    images: [{ src: unescoLogo, alt: "UNESCO" }],
  },
  {
    date: "2026-03-30",
    category: "event",
    descriptionKey: "events.micro",
    images: [{ src: iusatLogo, alt: "IUSAT" }],
  },
  {
    date: "2026-03-31",
    category: "event",
    descriptionKey: "events.micro",
    images: [{ src: iusatLogo, alt: "IUSAT" }],
  },
];
