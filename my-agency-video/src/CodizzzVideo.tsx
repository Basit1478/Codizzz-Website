import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Brand Colors ─────────────────────────────────────────────
const GOLD = "#F5C518";
const GOLD_ORANGE = "#F97316";
const BG_DEEP = "#08080f";
const BG_MID = "#0d0d1a";
const WHITE = "#ffffff";
const GRAY = "#9CA3AF";
const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";

// ─── Stars Background ─────────────────────────────────────────
const Stars: React.FC = () => {
  const frame = useCurrentFrame();
  const stars = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        x: (i * 137.508) % 1920,
        y: (i * 89.318) % 1080,
        r: (i % 3) * 0.45 + 0.3,
        phase: i * 19,
      })),
    []
  );

  return (
    <svg
      style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      viewBox="0 0 1920 1080"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={GOLD}
          opacity={Math.abs(Math.sin((frame + s.phase) * 0.022)) * 0.5}
        />
      ))}
    </svg>
  );
};

// ─── Glow Orb ─────────────────────────────────────────────────
const GlowOrb: React.FC<{ x: string; y: string; size: number; alpha: number }> = ({
  x, y, size, alpha,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, rgba(245,197,24,${alpha}) 0%, transparent 70%)`,
      filter: "blur(90px)",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    }}
  />
);

// ─── Scene fade helper ─────────────────────────────────────────
function useFade(duration: number, fadeInFrames = 15, fadeOutFrames = 15) {
  const frame = useCurrentFrame();
  if (fadeOutFrames <= 0) {
    return interpolate(frame, [0, fadeInFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  return interpolate(
    frame,
    [0, fadeInFrames, duration - fadeOutFrames, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 1 – INTRO (0–100)
// ═══════════════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFade = useFade(100);

  const badgeProgress = spring({ frame, fps, config: { damping: 80, stiffness: 80 } });

  const logoProgress = spring({ frame: frame - 8, fps, config: { damping: 65, stiffness: 55 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.65, 1]);

  const subProgress = spring({ frame: frame - 35, fps, config: { damping: 80, stiffness: 70 } });
  const subY = interpolate(subProgress, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity: sceneFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      {/* Badge */}
      <div
        style={{
          opacity: badgeProgress,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 28px",
          borderRadius: 999,
          border: "1px solid rgba(245,197,24,0.3)",
          background: "rgba(245,197,24,0.08)",
        }}
      >
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: GOLD,
            boxShadow: `0 0 8px ${GOLD}`,
          }}
        />
        <span
          style={{
            color: GOLD,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: FONT,
          }}
        >
          Est. 2025 — AI Solutions Agency
        </span>
      </div>

      {/* CODIZZZ Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${logoScale})`,
          fontSize: 130,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          fontFamily: FONT,
          background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        CODIZZZ
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: subProgress,
          transform: `translateY(${subY}px)`,
          color: GRAY,
          fontSize: 27,
          fontWeight: 400,
          letterSpacing: "0.04em",
          fontFamily: FONT,
        }}
      >
        Intelligent Solutions for Modern Businesses
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2 – HERO (100–220)
// ═══════════════════════════════════════════════════════════════
const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFade = useFade(120);

  const line1 = spring({ frame, fps, config: { damping: 80, stiffness: 65 } });
  const line1Y = interpolate(line1, [0, 1], [65, 0]);

  const line2 = spring({ frame: frame - 12, fps, config: { damping: 80, stiffness: 65 } });
  const line2Y = interpolate(line2, [0, 1], [65, 0]);

  const sub = spring({ frame: frame - 28, fps, config: { damping: 80, stiffness: 65 } });
  const subY = interpolate(sub, [0, 1], [25, 0]);

  const chips = spring({ frame: frame - 45, fps, config: { damping: 80, stiffness: 60 } });

  const techItems = ["Claude AI", "Next.js", "React Native", "Python", "FastAPI", "n8n"];

  return (
    <AbsoluteFill
      style={{
        opacity: sceneFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 38,
        padding: "0 120px",
      }}
    >
      {/* Main heading */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            opacity: line1,
            transform: `translateY(${line1Y}px)`,
            color: WHITE,
            fontSize: 94,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            fontFamily: FONT,
          }}
        >
          We Build the
        </div>
        <div
          style={{
            opacity: line2,
            transform: `translateY(${line2Y}px)`,
            fontSize: 94,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            fontFamily: FONT,
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Future with AI
        </div>
      </div>

      {/* Subtext */}
      <p
        style={{
          opacity: sub,
          transform: `translateY(${subY}px)`,
          color: GRAY,
          fontSize: 27,
          maxWidth: 960,
          textAlign: "center",
          lineHeight: 1.65,
          fontFamily: FONT,
          fontWeight: 400,
          margin: 0,
        }}
      >
        From AI Agents to Full Stack Apps — Codizzz delivers intelligent
        solutions that automate, scale, and transform your business.
      </p>

      {/* Tech chips */}
      <div
        style={{
          opacity: chips,
          transform: `translateY(${interpolate(chips, [0, 1], [20, 0])}px)`,
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {techItems.map((tech) => (
          <div
            key={tech}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: GRAY,
              fontSize: 19,
              fontFamily: FONT,
              fontWeight: 500,
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3 – SERVICES (220–390)
// ═══════════════════════════════════════════════════════════════
const serviceItems = [
  {
    icon: "🤖",
    title: "AI Development",
    desc: "Custom LLM apps, RAG systems, AI chatbots and AI Automation pipelines.",
    color: GOLD,
  },
  {
    icon: "💻",
    title: "Full Stack Dev",
    desc: "Next.js, FastAPI, PostgreSQL — complete web applications end to end.",
    color: "#3B82F6",
  },
  {
    icon: "🧠",
    title: "AI Agents",
    desc: "Autonomous agents that research, reason, and execute tasks 24/7.",
    color: "#10B981",
  },
  {
    icon: "👤",
    title: "AI Digital Employee",
    desc: "AI that handles emails, reports, CRM, and business ops round the clock.",
    color: "#8B5CF6",
  },
];

const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFade = useFade(170);

  const headerProgress = spring({ frame, fps, config: { damping: 80 } });
  const headerY = interpolate(headerProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity: sceneFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 80px",
        gap: 52,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${headerY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 22px",
            borderRadius: 999,
            border: "1px solid rgba(245,197,24,0.3)",
            background: "rgba(245,197,24,0.08)",
            color: GOLD,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 22,
            fontFamily: FONT,
          }}
        >
          What We Do
        </div>
        <div
          style={{
            color: WHITE,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            fontFamily: FONT,
            lineHeight: 1,
          }}
        >
          Our{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Core Services
          </span>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: "flex", gap: 22, width: "100%" }}>
        {serviceItems.map((s, i) => {
          const cardP = spring({
            frame: frame - 20 - i * 14,
            fps,
            config: { damping: 78, stiffness: 58 },
          });
          const cardY = interpolate(cardP, [0, 1], [70, 0]);

          return (
            <div
              key={s.title}
              style={{
                flex: 1,
                opacity: cardP,
                transform: `translateY(${cardY}px)`,
                padding: "38px 32px",
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: 50, marginBottom: 22, lineHeight: 1 }}>{s.icon}</div>

              {/* Title */}
              <div
                style={{
                  color: WHITE,
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 14,
                  fontFamily: FONT,
                }}
              >
                {s.title}
              </div>

              {/* Description */}
              <div
                style={{
                  color: GRAY,
                  fontSize: 17,
                  lineHeight: 1.65,
                  fontFamily: FONT,
                  fontWeight: 400,
                }}
              >
                {s.desc}
              </div>

              {/* Color accent bar */}
              <div
                style={{
                  marginTop: 28,
                  width: 44,
                  height: 3,
                  borderRadius: 2,
                  background: s.color,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4 – STATS (390–510)
// ═══════════════════════════════════════════════════════════════
const statItems = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "", label: "Core Services" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFade = useFade(120);

  const titleP = spring({ frame, fps, config: { damping: 80 } });
  const titleY = interpolate(titleP, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity: sceneFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px",
        gap: 60,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: WHITE,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            fontFamily: FONT,
          }}
        >
          Our{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Numbers
          </span>
        </div>
        <div
          style={{
            color: GRAY,
            fontSize: 22,
            fontFamily: FONT,
            fontWeight: 400,
            marginTop: 14,
          }}
        >
          Results that speak for themselves
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1400,
          border: "1px solid rgba(245,197,24,0.2)",
          borderRadius: 26,
          background: "rgba(245,197,24,0.025)",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(245,197,24,0.05)",
        }}
      >
        {statItems.map((stat, i) => {
          const cardP = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 80 },
          });

          const countVal = Math.round(
            interpolate(frame, [i * 6 + 10, i * 6 + 70], [0, stat.value], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          );

          return (
            <div
              key={stat.label}
              style={{
                flex: 1,
                opacity: cardP,
                padding: "55px 30px",
                textAlign: "center",
                borderRight:
                  i < statItems.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: 78,
                  fontWeight: 900,
                  color: GOLD,
                  fontFamily: FONT,
                  lineHeight: 1,
                  marginBottom: 14,
                  letterSpacing: "-0.02em",
                }}
              >
                {countVal}
                {stat.suffix}
              </div>
              <div
                style={{
                  color: GRAY,
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: FONT,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 5 – CTA (510–600)
// ═══════════════════════════════════════════════════════════════
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFade = useFade(90, 15, 0);

  const mainP = spring({ frame, fps, config: { damping: 75, stiffness: 55 } });
  const mainY = interpolate(mainP, [0, 1], [55, 0]);

  const btnP = spring({ frame: frame - 22, fps, config: { damping: 75, stiffness: 55 } });
  const btnY = interpolate(btnP, [0, 1], [30, 0]);

  const logoP = spring({ frame: frame - 42, fps, config: { damping: 80 } });

  return (
    <AbsoluteFill
      style={{
        opacity: sceneFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
      }}
    >
      {/* Main text */}
      <div
        style={{
          opacity: mainP,
          transform: `translateY(${mainY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: WHITE,
            fontSize: 78,
            fontWeight: 900,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            fontFamily: FONT,
            marginBottom: 22,
          }}
        >
          Ready to Build the
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Future with AI?
          </span>
        </div>
        <div
          style={{
            color: GRAY,
            fontSize: 25,
            fontFamily: FONT,
            fontWeight: 400,
          }}
        >
          Let&apos;s build something extraordinary together.
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          opacity: btnP,
          transform: `translateY(${btnY}px)`,
          display: "flex",
          gap: 22,
        }}
      >
        <div
          style={{
            padding: "20px 54px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
            color: BG_DEEP,
            fontSize: 23,
            fontWeight: 700,
            fontFamily: FONT,
          }}
        >
          Book a Free Call
        </div>
        <div
          style={{
            padding: "20px 54px",
            borderRadius: 999,
            border: `2px solid ${GOLD}`,
            color: GOLD,
            fontSize: 23,
            fontWeight: 700,
            fontFamily: FONT,
          }}
        >
          codizzz.com
        </div>
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: logoP * 0.55,
          fontSize: 30,
          fontWeight: 900,
          letterSpacing: "0.12em",
          fontFamily: FONT,
          background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_ORANGE} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginTop: 8,
        }}
      >
        CODIZZZ
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const CodizzzVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${BG_DEEP} 0%, ${BG_MID} 55%, ${BG_DEEP} 100%)`,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* Always-visible background elements */}
      <Stars />
      <GlowOrb x="26%" y="32%" size={420} alpha={0.07} />
      <GlowOrb x="74%" y="68%" size={340} alpha={0.05} />

      {/* Scenes */}
      <Sequence from={0} durationInFrames={100}>
        <IntroScene />
      </Sequence>

      <Sequence from={100} durationInFrames={120}>
        <HeroScene />
      </Sequence>

      <Sequence from={220} durationInFrames={170}>
        <ServicesScene />
      </Sequence>

      <Sequence from={390} durationInFrames={120}>
        <StatsScene />
      </Sequence>

      <Sequence from={510} durationInFrames={90}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
