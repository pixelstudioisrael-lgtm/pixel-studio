/** כותרת ותיאור ברירת מחדל (תואמים ל־index.html) */
export const HOME_PAGE_TITLE = "Pixel Design | עיצוב גרפי, מיתוג ולוגואים.";
export const HOME_PAGE_DESCRIPTION =
  "Pixel Design: סטודיו לעיצוב גרפי, מיתוג ובניית לוגואים. מומחים בעיצוב כרטיסי ביקור, שלטים וחתימות למייל. מעצבים גרפיים שיוצרים חזון ויזואלי לעסק שלכם. צפו בתיק העבודות.";

export const PORTFOLIO_PAGE_TITLE = "גלריה | Pixel Design";
export const PORTFOLIO_PAGE_DESCRIPTION =
  "גלריית עבודות Pixel Design — עיצוב גרפי, מיתוג ולוגואים לעסקים מגוונים.";

export const TERMS_PAGE_TITLE = "תקנון ותנאי שירות | Pixel Design";
export const TERMS_PAGE_DESCRIPTION =
  "תקנון ותנאי שירות לשירותי עיצוב גרפי ב-Pixel Design.";

export const NOT_FOUND_PAGE_TITLE = "הדף לא נמצא | Pixel Design";
export const NOT_FOUND_PAGE_DESCRIPTION =
  "הדף שביקשתם לא קיים או הועבר. Pixel Design — עיצוב גרפי, מיתוג ולוגואים.";

export function setPageMeta(title: string, description: string) {
  if (typeof document === "undefined") return;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
}
