import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "d231da9a-ca21-4d22-bd14-e944b4dc0947";

const SUCCESS_MESSAGE =
  "תודה! הפרטים התקבלו בהצלחה. הצוות שלנו כבר בוחן את הבקשה ויחזור אליך בהקדם לתיאום שיחת אפיון.";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function isValidPhone(value: string): boolean {
  const d = digitsOnly(value);
  return d.length >= 9;
}

/**
 * טופס יצירת קשר (Web3Forms) — שימוש בפוטר / אזור יצירת קשר.
 */
export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);

  const phoneValid = useMemo(() => isValidPhone(phone), [phone]);

  const showPhoneError = phoneBlurred && !phoneValid;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setPhoneBlurred(true);

    if (!name.trim() || !message.trim() || !isValidPhone(phone)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name.trim(),
          phone: digitsOnly(phone),
          message: message.trim(),
          subject: "Pixel Design — יצירת קשר מהאתר",
        }),
      });

      const data = (await res.json()) as { success?: boolean };

      if (!res.ok || !data.success) {
        setError(true);
        return;
      }

      setSuccess(true);
      setName("");
      setPhone("");
      setMessage("");
      setPhoneBlurred(false);
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="w-full"
    >
      {success ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-0 max-w-lg rounded-2xl border border-[#D4AF37]/45 bg-gradient-to-br from-white via-[#FFFCF7] to-[#F5ECD8]/90 px-6 py-10 text-center shadow-[0_8px_40px_rgba(212,175,55,0.14),0_0_0_1px_rgba(212,175,55,0.08)] md:mx-0 md:max-w-none"
        >
          <p className="body-font text-lg font-medium leading-relaxed text-[#1a1a1a] md:text-xl md:leading-[1.65]">
            {SUCCESS_MESSAGE}
          </p>
        </motion.div>
      ) : (
        <form
          className="mx-auto mt-0 max-w-lg space-y-4 md:mx-0 md:mt-0 md:max-w-none"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} readOnly />

          <motion.input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="שם"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="body-font w-full rounded-lg border border-[#D4AF37]/35 bg-white px-4 py-3 text-[#111111] placeholder:text-slate-400 transition-colors focus:border-[#D4AF37] focus:outline-none disabled:cursor-wait disabled:opacity-100"
            whileFocus={{ boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.2)" }}
          />

          <div className="space-y-1.5">
            <motion.input
              id="contact-phone"
              type="tel"
              name="phone"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              placeholder="מספר טלפון"
              required
              value={phone}
              onChange={(e) => setPhone(digitsOnly(e.target.value))}
              onBlur={() => setPhoneBlurred(true)}
              disabled={isSubmitting}
              aria-invalid={showPhoneError}
              aria-describedby={showPhoneError ? "contact-phone-error" : undefined}
              className={`body-font w-full rounded-lg border bg-white px-4 py-3 text-right placeholder:text-right text-[#111111] placeholder:text-slate-400 transition-colors focus:outline-none disabled:cursor-wait disabled:opacity-100 ${
                showPhoneError
                  ? "border-[#c45c5c]/55 focus:border-[#c45c5c]/80"
                  : "border-[#D4AF37]/35 focus:border-[#D4AF37]"
              }`}
              style={{ direction: "ltr", textAlign: "right", unicodeBidi: "plaintext" }}
              whileFocus={{
                boxShadow: showPhoneError
                  ? "0 0 0 3px rgba(196, 92, 92, 0.18)"
                  : "0 0 0 3px rgba(212, 175, 55, 0.2)",
              }}
            />
            {showPhoneError ? (
              <p
                id="contact-phone-error"
                role="alert"
                className="body-font border-r-2 border-[#c9a227]/40 pr-2 text-right text-xs leading-snug text-[#8f2f2f] md:text-[13px]"
              >
                אנא הזן מספר טלפון תקין.
              </p>
            ) : null}
          </div>

          <motion.textarea
            name="message"
            placeholder="הודעה"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            className="body-font w-full resize-none rounded-lg border border-[#D4AF37]/35 bg-white px-4 py-3 text-[#111111] placeholder:text-slate-400 transition-colors focus:border-[#D4AF37] focus:outline-none disabled:cursor-wait disabled:opacity-100"
            whileFocus={{ boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.2)" }}
          />

          {error ? (
            <p
              role="alert"
              className="body-font text-center text-sm text-slate-600 md:text-right"
            >
              אופס, חלה שגיאה. ניתן לשלוח לנו הודעה ישירה בוואטסאפ.
            </p>
          ) : null}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={
              isSubmitting
                ? undefined
                : { scale: 1.02, boxShadow: "0 8px 28px rgba(212, 175, 55, 0.35)" }
            }
            whileTap={isSubmitting ? undefined : { scale: 0.98 }}
            className="display-font w-full rounded-lg bg-gradient-to-br from-[#e8d49a] via-[#c9a42e] to-[#8f7020] px-6 py-3.5 font-bold text-[#1c1508] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-[filter] duration-300 hover:from-[#f0dfa8] hover:via-[#d4af37] hover:to-[#9a7824] disabled:cursor-wait disabled:opacity-100 disabled:hover:from-[#e8d49a] disabled:hover:via-[#c9a42e] disabled:hover:to-[#8f7020]"
          >
            {isSubmitting ? "שולח..." : "שלח הודעה"}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
