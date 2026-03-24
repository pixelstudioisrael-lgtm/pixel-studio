import { motion } from "framer-motion";

/** Single testimonial card - extracted for reuse */
function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E8E5DC] hover:shadow-lg transition-shadow">
        <div className="p-4 border-b border-[#E8E5DC]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1877F2] to-[#0A66C2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">f</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#111111] display-font truncate">{testimonial.name}</p>
              <p className="text-xs text-[#999999] body-font truncate">{testimonial.company}</p>
            </div>
          </div>
          <p className="text-xs text-[#999999] body-font">{testimonial.time}</p>
        </div>
        <div className="p-4">
          <p className="text-[#111111] body-font leading-relaxed text-sm">{testimonial.text}</p>
        </div>
        <div className="px-4 py-3 border-t border-[#E8E5DC] flex items-center justify-between text-xs text-[#999999]">
          <div className="flex gap-2">
            <span>👍 {testimonial.likes}</span>
            <span>❤️ {testimonial.hearts}</span>
          </div>
          <span>{testimonial.comments} תגובות</span>
        </div>
      </div>
    </div>
  );
}

const MONA_LISA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663459270785/T2vXmtCoKPgG35XUxSP9Qu/mona-lisa-faint-bkycUPnmpCCcUq8hTzk8YW.webp";

const testimonials = [
  {
    name: "דוד כהן",
    company: "מסעדה קטנה בחיפה",
    text: "הלוגו והתפריט שלנו — בדיוק כמו שחלמנו. היו סבלניים מאוד עם כל הבלבולים שלי, אין לחץ, והתוצאה הסופית — פשוט מעולה. ממליץ בחום לכל מי שיש עסק קטן ורוצה להיראות מקצועי.",
    likes: 12,
    hearts: 8,
    comments: 3,
    time: "לפני 2 שבועות",
  },
  {
    name: "שרה לוי",
    company: "מכון יופי בגבעתיים",
    text: "המיתוג למשרד שלי — מלוגו ועד כרטיס ביקור — הכל בדיוק בטון שביקשתי. לא היו מרוצים עד שאני הייתי מרוצה, והסבלנות שלהם פה זה משהו שלא רואים אצל כולם.",
    likes: 24,
    hearts: 15,
    comments: 5,
    time: "לפני שבוע",
  },
  {
    name: "מיכל גולן",
    company: "מותג קוסמטיקה ביתית",
    text: "עיצוב אריזות ומוצרי טיפוח — זה ענק. לקוחות שלי שואלים איפה עשינו את זה. היה מעט מבלבל בתחילה עם הכיוונים, אבל הם ענו לכל שאלה וסיפקו את התוצאה שרציתי.",
    likes: 45,
    hearts: 32,
    comments: 7,
    time: "לפני 3 שבועות",
  },
  {
    name: "רוני דהן",
    company: "משרד תיווך נדל\"ן",
    text: "פולדרים ופליירים למשרד — נראה ממש מקצועי. עסק בינוני כמונו צריך לרשום לקוחות מהרגע הראשון, והעיצוב עושה את זה. מרוצים מהתוצאה ומהשירות, לא נעלמו באמצע.",
    likes: 18,
    hearts: 11,
    comments: 4,
    time: "לפני 2 שבועות",
  },
  {
    name: "עו\"ד תמר כץ",
    company: "משרד עורכי דין כץ ושות'",
    text: "לוגו וניירת למשרד — נקי, מכבד, לא \"צעקני\". הלקוחות שלנו מבחינים בשינוי. עבדנו איתם בצורה רגועה, עד שמצאנו את המקום הנכון, ללא לחץ.",
    likes: 31,
    hearts: 19,
    comments: 6,
    time: "לפני חודש",
  },
  {
    name: "יוסי ברק",
    company: "חנות אונליין לבית",
    text: "עיצוב לחנות ולרשתות — הכול היה מובן ומסודר. עסק קטן בלי מחלקת שיווק, והם באמת ליוו אותנו בכל שלב. התוצאה מספקת לגמרי ומעלית לנו את המכירות.",
    likes: 22,
    hearts: 14,
    comments: 3,
    time: "לפני 2 שבועות",
  },
  {
    name: "דני שמעון",
    company: "בית מרקחת בריאות פלוס",
    text: "מיתוג לתכשירי טיפוח — אלגנטי ומבדל. היו סבלניים עם כל התיקונים הקטנים ועד שזה ישב לי בבטן. מרוצה מהתוצאה ומהיחס האנושי.",
    likes: 39,
    hearts: 28,
    comments: 9,
    time: "לפני שבועיים",
  },
  {
    name: "ליאת בן דוד",
    company: "סוכנות נדל\"ן",
    text: "פוסטרים ופליירים לפרויקטים — הכל עקבי ומקצועי. אני לא מבינה בגרפיקה, והם הסבירו בלי להגזים בז'רגון. מרוצה ממאה אחוז מהתוצאה.",
    likes: 15,
    hearts: 9,
    comments: 2,
    time: "לפני שבוע",
  },
  {
    name: "עמית ישראלי",
    company: "סטודיו ליופי",
    text: "לוגו ועיצוב לעמדת הקבלה — כל הלקוחות שלי שואלים מי עשה. היה תהליך נעים, לא מרגישים מבוך או בזבוז זמן, והתוצאה בדיוק מה שחיפשתי.",
    likes: 52,
    hearts: 41,
    comments: 12,
    time: "לפני 3 שבועות",
  },
  {
    name: "נעמי כהן",
    company: "משרד רואי חשבון ברק",
    text: "זהות ויזואלית למשרד שלנו — קלאסית ונקייה. עסק בינוני שצריך לשדר אמינות, והלוגו והניירת עושים את זה. מרוצים מהתוצאה ומהשקט שקיבלנו אצלם.",
    likes: 27,
    hearts: 16,
    comments: 4,
    time: "לפני חודש",
  },
  {
    name: "גיל רוזנברג",
    company: "סטארטאפ טכנולוגיה",
    text: "לוגו ועיצוב ראשוני למותג — הם הבינו מהר מה אנחנו מנסים להגיד. לא היה \"תחזיקו אותי\" — אם משהו לא היה מספיק טוב, תיקנו. אני מרוצה מהתוצאה ומהיחס.",
    likes: 33,
    hearts: 21,
    comments: 8,
    time: "לפני 2 שבועות",
  },
  {
    name: "ורד גבעון",
    company: "סוכנות נדל\"ן",
    text: "פולדרים ופליירים לנכסים — נראה ממש מקצועי. עסק קטן שלנו נראה גדול יותר בזכות המיתוג. הם סבלניים עם כל התיקונים הקטנים ועד שזה יצא מושלם.",
    likes: 41,
    hearts: 29,
    comments: 11,
    time: "לפני שבועיים",
  },
  {
    name: "מיכל אברהם",
    company: "מעצבת אופנה עצמאית",
    text: "קטלוג ומיתוג לקולקציה — כל פרט מחושב. הלקוחות שלי מתפעלים מזה. עבדנו עם הרבה סבלנות כי הייתי משנה דעה, ואני מרוצה מהתוצאה הסופית.",
    likes: 56,
    hearts: 44,
    comments: 14,
    time: "לפני 3 שבועות",
  },
  {
    name: "עו\"ד יונתן לוי",
    company: "משרד לוי ועוז",
    text: "מיתוג למשרד עורכי דין — מסורתי אבל לא מיושן. הלקוחות מרגישים ביטחון מהרגע שנכנסים. הליווי היה רגוע, הם לא הלחיצו אותי לסגור מהר, והתוצאה מדברת בעד עצמה.",
    likes: 19,
    hearts: 12,
    comments: 3,
    time: "לפני חודש",
  },
  {
    name: "דן סלומון",
    company: "בעלים בחנות קמעונאות",
    text: "קמפיין גרפי ופוסטרים לחנות — הלקוחות אומרים שזה נראה \"ממש מקצועי\". עסק בינוני כמונו צריך מראה טוב בלי לשבור את הבנק, וזה בדיוק מה שקיבלנו אצלם.",
    likes: 48,
    hearts: 35,
    comments: 10,
    time: "לפני 2 שבועות",
  },
  {
    name: "שיר מורן",
    company: "ספא יופי טבעי",
    text: "אריזות ומיתוג לקוסמטיקה הטבעית שלנו — טבעי ורגוע, בדיוק כמו המותג. הלקוחות מתפעלים. היו סבלניים עם כל התיקונים הקטנים ועד שזה ישב לי בבטן.",
    likes: 37,
    hearts: 26,
    comments: 7,
    time: "לפני 3 שבועות",
  },
  {
    name: "אלי מזרחי",
    company: "משרד תיווך",
    text: "עיצוב שיווקי לפרויקטים — הכל עקבי ומקצועי. אני לא מבין בגרפיקה, והם הסבירו בלי להגזים בז'רגון. מרוצה מהתוצאה ומהיחס האנושי.",
    likes: 29,
    hearts: 18,
    comments: 5,
    time: "לפני שבועיים",
  },
  {
    name: "רחל גרין",
    company: "קליניקה קטנה",
    text: "לוגו ועיצוב לקליניקה — נקי, רגוע, לא מפחיד. עסק קטן בלי מחלקת שיווק, והם באמת ליוו אותנו בכל שלב. מטופלים אומרים לי שהמקום נראה מקצועי ומסודר, ואני מרוצה מהתוצאה.",
    likes: 16,
    hearts: 10,
    comments: 2,
    time: "לפני שבוע",
  },
  {
    name: "ניצן לוי",
    company: "מותג קפה ומאפה",
    text: "לוגו, אריזות ושלט לחנות — הכול באותו סגנון חם ונעים. היו סבלניים עם כל הגרסאות עד שזה ישב לנו בבטן. לקוחות שואלים אם פתחנו סניף חדש, כי זה נראה כל כך טוב.",
    likes: 23,
    hearts: 15,
    comments: 4,
    time: "לפני 2 שבועות",
  },
  {
    name: "אורי טל",
    company: "בעלים בחנות אלקטרוניקה",
    text: "לוגו ופליירים לחנות — ברור, נקי, לא עמוס. לא הבנתי כלום בקבצים והם הסבירו בשקט עד שהכול היה מוכן להדפסה. התוצאה מעולה, והיחס אנושי — בדיוק מה שחיפשתי.",
    likes: 34,
    hearts: 22,
    comments: 6,
    time: "לפני שבועיים",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="relative w-full py-20 px-4 bg-[#F9F6F0] overflow-hidden"
      style={{
        backgroundImage: `url('${MONA_LISA_BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#F9F6F0]/88 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          dir="rtl"
          className="mb-16 w-full min-w-0 text-center max-md:overflow-x-hidden"
        >
          {/* מובייל: משפט ארוך — גודל גופן לפי רוחב מסך כדי שלא יגלוש; שורה אחת; ממורכז */}
          <h2 className="display-font mb-4 block w-full min-w-0 font-black text-[#722F37] text-5xl md:text-6xl max-md:mx-auto max-md:max-w-full max-md:whitespace-nowrap max-md:px-1 max-md:leading-[1.05] max-md:text-[max(0.75rem,min(2.75rem,calc((100vw-2rem)/15)))]">
            מה אומרים הלקוחות שלנו
          </h2>
          <div className="mx-auto h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Facebook-style Comments Marquee - CSS-based seamless infinite (never empty) */}
        <div className="relative w-full overflow-hidden" dir="ltr">
          <div className="flex animate-marquee w-max">
            {/* First set - exact copy for seamless loop */}
            <div className="flex gap-6 flex-shrink-0 pr-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={`a-${i}`} testimonial={t} />
              ))}
            </div>
            {/* Second set - identical, when first exits view second enters */}
            <div className="flex gap-6 flex-shrink-0 pr-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={`b-${i}`} testimonial={t} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
