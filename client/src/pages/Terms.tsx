import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { publicUrl } from "@/lib/publicUrl";

const HERO_BG = publicUrl(encodeURIComponent("hero-background (1).png"));

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9F6F0] text-[#111111]">
      {/* רקע טקסטורה — כמו בדפים אחרים בפרויקט */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
          backgroundColor: "#F9F6F0",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 md:py-16">
        <header className="relative mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-font mb-3 text-2xl font-black leading-tight md:mb-4 md:text-3xl"
          >
            תקנון ותנאי שירות – שירותי עיצוב גרפי | Pixel Studio
          </motion.h1>

          <p className="body-font text-sm text-[#666666] md:text-base" dir="rtl">
            עודכן לאחרונה: מרץ 2025
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="body-font space-y-10 leading-relaxed text-[#333333]"
        >
          <p>
            ברוכים הבאים ל-Pixel Studio. תקנון זה נועד להסדיר את התנאים החלים על קבלת שירותי עיצוב גרפי, ומהווה
            הסכם מחייב ביניכם לבין הסטודיו. ביצוע הזמנה ותשלום מקדמה מהווים אישור והסכמה מלאה לתנאים המפורטים
            בתקנון זה.
          </p>

          <section>
            <h2 className="display-font mb-4 text-xl font-bold text-[#111111]">1. הגדרות כלליות</h2>
            <ul className="list-inside list-disc space-y-2 marker:text-[#D4AF37]">
              <li>
                <strong className="text-[#111111]">הסטודיו:</strong> Pixel Studio (עוסק פטור מס&apos; 209884675).
              </li>
              <li>
                <strong className="text-[#111111]">הלקוח:</strong> מזמין עבודת העיצוב.
              </li>
              <li>
                <strong className="text-[#111111]">ימי עסקים:</strong> ימים א&apos;-ה&apos;, לא כולל ימי שישי,
                שבת, ערבי חג וחגים.
              </li>
              <li>
                <strong className="text-[#111111]">התוצר:</strong> שירותי עיצוב גרפי (כגון עיצוב לוגו, מיתוג
                וכו&apos;) המועברים ללקוח כקבצים דיגיטליים.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display-font mb-4 text-xl font-bold text-[#111111]">2. תהליך העבודה ולוחות זמנים</h2>
            <div className="space-y-4">
              <p>
                לאחר תשלום המקדמה וקליטת נתוני העיצוב (בריף), צוות הסטודיו יכין וישלח ללקוח 4 סקיצות ראשוניות
                לבחירה.
              </p>
              <p>זמן האספקה לסקיצות הראשוניות הינו 3 עד 4 ימי עסקים.</p>
              <p>
                על הלקוח לבחון את הסקיצות ולבחור כיוון עיצובי אחד מתוכן, שעליו נמשיך לעבוד ולדייק.
              </p>
            </div>
          </section>

          <section>
            <h2 className="display-font mb-4 text-xl font-bold text-[#111111]">3. סבבי תיקונים ושינויים</h2>
            <p className="mb-4">אנו דוגלים בשקיפות ומקצועיות, ולכן תהליך הדיוק מוגדר מראש:</p>
            <ul className="list-inside list-disc space-y-3 marker:text-[#D4AF37]">
              <li>
                לאחר בחירת הסקיצה המועדפת, הלקוח זכאי לביצוע של עד 3 סבבי תיקונים מרוכזים ללא עלות נוספת.
              </li>
              <li>זמן הביצוע לכל סבב תיקונים הינו עד 3 ימי עסקים.</li>
              <li>
                <strong className="text-[#111111]">חריגה ממכסת התיקונים:</strong> בקשה לסבב תיקונים נוסף מעבר
                ל-3 הסבבים הכלולים בחבילה, תתומחר בעלות סמלית של 50 ש&quot;ח לכל סבב נוסף.
              </li>
              <li>
                <strong className="text-[#111111]">שינוי כיוון מהותי:</strong> במידה ולאחר אישור סקיצה ותחילת
                סבבי התיקונים, הלקוח יבקש לשנות את הכיוון העיצובי לחלוטין (קונספט חדש מאפס), העבודה תתומחר
                כפרויקט חדש או בתוספת תשלום, בהתאם להיקף העבודה שתידרש על ידי המעצבים.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display-font mb-4 text-xl font-bold text-[#111111]">4. תנאי תשלום</h2>
            <ul className="list-inside list-disc space-y-3 marker:text-[#D4AF37]">
              <li>
                Pixel Studio הינו &quot;עוסק פטור&quot; כדין, ולכן מחירי השירותים אינם כוללים מע&quot;מ (ולא
                יתווסף מע&quot;מ במעמד התשלום).
              </li>
              <li>תחילת העבודה מותנית בתשלום מקדמה בגובה 60% מסך העסקה.</li>
              <li>
                המקדמה משמשת לכיסוי שעות עבודת המעצבים בסטודיו ואינה מוחזרת לאחר תחילת העבודה (הפקת הסקיצות).
              </li>
              <li>יתרת התשלום (40%) תשולם מיד עם אישור העיצוב הסופי על ידי הלקוח.</li>
              <li>
                התוצר הסופי (קבצי המקור וקבצי העבודה) יימסר ללקוח רק לאחר קבלת מלוא התשלום.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="display-font mb-4 text-xl font-bold text-[#111111]">5. זמינות הלקוח ורצף עבודה</h2>
            <div className="space-y-4">
              <p>
                על מנת לשמור על רצף עבודה יעיל וזמינות המעצבים שלנו לפרויקט שלכם, נדרש שיתוף פעולה מצד הלקוח
                במתן פידבק.
              </p>
              <p>
                במידה והלקוח לא יגיב לסקיצות או לבקשות אישור שנשלחו אליו במשך 5 ימי עסקים רצופים, הסטודיו
                יראה בכך כאישור של השלב הנוכחי, או לחלופין הפרויקט יוקפא (חזרה לעבודה לאחר הקפאה עשויה לדרוש
                תוספת תשלום).
              </p>
            </div>
          </section>

          <section>
            <h2 className="display-font mb-4 text-xl font-bold text-[#111111]">6. ביטול עסקה</h2>
            <div className="space-y-4">
              <p>
                במידה והלקוח מעוניין לבטל את הזמנתו, עליו להודיע לנו בכתב תוך 3 שעות ממועד ביצוע התשלום. במקרה
                זה יינתן החזר כספי מלא.
              </p>
              <p>
                לאחר פרק זמן זה, ומאחר ומדובר בייצור תוכן דיגיטלי המותאם אישית שצוות המעצבים כבר החל לעבוד
                עליו, לא יינתן החזר על המקדמה (60%), שכן היא משמשת לכיסוי עלויות הסטודיו שכבר בוצעו.
              </p>
              <p className="pt-2">
                אנו מאמינים בעבודה מקצועית, תקשורת פתוחה ושירות איכותי לכל לקוח.
                <br />
                לכל שאלה או הבהרה – אנחנו כאן בשבילכם!
              </p>
            </div>
          </section>
        </motion.div>
      </div>

      <FloatingWhatsAppButton />
    </div>
  );
}
