"use client";

import { useState } from "react";

type BoxProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

function Box({ title, icon, children }: BoxProps) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: "16px",
        padding: "18px",
        marginBottom: "16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{
          margin: "0 0 14px",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {icon} {title}
      </h2>

      {children}
    </section>
  );
}

export default function HomePage() {
  const [juz, setJuz] = useState<number | null>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadJuz(number: number) {
    setJuz(number);
    setVerses([]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=${number}`
      );

      const data = await response.json();

      setVerses(data.verses || []);
    } catch {
      setVerses([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* عنوان سایت */}

        <header
          style={{
            textAlign: "center",
            padding: "20px 10px 28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            HamianQuran.com
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#666",
            }}
          >
            قرآن کریم
          </p>
        </header>

        {/* تقویم */}

        <Box title="تقویم" icon="📅">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "10px",
            }}
          >
            <button style={buttonStyle}>
              🇮🇷 تقویم فارسی
            </button>

            <button style={buttonStyle}>
              🌙 تقویم قمری
            </button>

            <button style={buttonStyle}>
              🌍 تقویم میلادی
            </button>
          </div>
        </Box>

        {/* قرآن ۳۰ جزء */}

        <Box title="نسخه کامل ۳۰ جزء قرآن" icon="📖">
          <p style={{ color: "#666" }}>
            انتخاب جزء برای مشاهده متن عربی قرآن
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(80px, 1fr))",
              gap: "8px",
            }}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => loadJuz(number)}
                  style={{
                    ...buttonStyle,
                    background:
                      juz === number ? "#eee" : "#fff",
                    fontWeight:
                      juz === number ? "700" : "400",
                  }}
                >
                  جزء {number}
                </button>
              )
            )}
          </div>

          {loading && (
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              در حال دریافت قرآن...
            </p>
          )}

          {!loading && juz !== null && verses.length > 0 && (
            <div
              style={{
                marginTop: "20px",
                borderTop: "1px solid #eee",
                paddingTop: "15px",
              }}
            >
              <h3>متن عربی جزء {juz}</h3>

              {verses.map((verse) => (
                <div
                  key={verse.id}
                  style={{
                    padding: "16px 4px",
                    borderBottom: "1px solid #eee",
                    fontSize: "23px",
                    lineHeight: "2.2",
                    textAlign: "right",
                  }}
                >
                  {verse.text_uthmani}

                  <span
                    style={{
                      display: "inline-block",
                      marginRight: "8px",
                      fontSize: "14px",
                      color: "#777",
                    }}
                  >
                    ۝ {verse.verse_key}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Box>

        {/* صوت */}

        <Box title="صوت عربی قرآن" icon="🔊">
          <p style={{ color: "#666" }}>
            پخش صوت قرآن
          </p>

          <audio
            controls
            preload="none"
            style={{
              width: "100%",
            }}
          >
            <source
              src="https://verses.quran.com/AbdulBaset/Murattal/mp3/001001.mp3"
              type="audio/mpeg"
            />

            مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
          </audio>

          <p
            style={{
              fontSize: "13px",
              color: "#777",
              marginTop: "10px",
            }}
          >
            این بخش فعلاً برای آزمایش پخش یک آیه است.
          </p>
        </Box>

        {/* ترجمه فارسی */}

        <Box title="ترجمه فارسی قرآن" icon="🌐">
          <p style={{ color: "#666" }}>
            ترجمه فارسی فقط در این بخش نمایش داده می‌شود و
            متن عربی قرآن تغییر نمی‌کند.
          </p>

          <button style={buttonStyle}>
            نمایش ترجمه فارسی
          </button>
        </Box>

        {/* تتر */}

        <Box title="واریز حساب تتر" icon="💰">
          <p>
            برای حمایت از پروژه قرآن می‌توانید تتر واریز کنید.
          </p>

          <div
            style={{
              padding: "14px",
              background: "#f5f5f5",
              borderRadius: "10px",
              direction: "ltr",
              wordBreak: "break-all",
              fontSize: "14px",
            }}
          >
            آدرس کیف پول تتر بعداً اینجا قرار می‌گیرد.
          </div>

          <p
            style={{
              fontSize: "13px",
              color: "#777",
              marginTop: "10px",
            }}
          >
            شبکه تتر نیز باید هنگام اضافه کردن آدرس مشخص شود
            (مثلاً TRC20 یا ERC20).
          </p>
        </Box>

        {/* پایین سایت */}

        <footer
          style={{
            textAlign: "center",
            padding: "25px 10px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          © HamianQuran.com
        </footer>
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: "12px 10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: "15px",
};
