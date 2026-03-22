/** נתיב לקבצים ב-`public/` — תומך ב-base של Vite (למשל פריסה בתת-תיקייה). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
