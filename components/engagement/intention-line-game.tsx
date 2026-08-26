"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Sparkles } from "lucide-react";
import { engagementConfig, type IntentionId } from "@/config/engagement";
import {
  getGameCompletion,
  isPromoAlreadyClaimed,
  isPromoLockedWithoutData,
  saveGameCompletion,
  type GameCompletion,
} from "@/lib/engagement/storage";
import { siteConfig } from "@/config/site";
import { BookmarkPrompt } from "@/components/engagement/bookmark-prompt";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = "intention" | "draw" | "anchor" | "reward" | "already-claimed";

type Point = { x: number; y: number };

function buildPath(points: Point[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

function PromoReveal({
  completion,
  onCopy,
  copied,
}: {
  completion: GameCompletion;
  onCopy: () => void;
  copied: boolean;
}) {
  const { course } = engagementConfig;
  const intention = engagementConfig.intentions.find(
    (item) => item.id === completion.intentionId,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-accent">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="text-3xl md:text-4xl">Ваша композиция готова</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted leading-relaxed">
          Вы собрали линию намерения — «{intention?.label}» с якорем «
          {completion.anchorWord}». Подарок за практику:
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-[1.75rem] border border-gold/30 bg-card p-8 text-center shadow-card">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          Промокод на {course.name}
        </p>
        <p className="mt-2 text-sm text-muted">Скидка {course.discountLabel} при оплате курса</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <code className="font-display text-3xl tracking-wider text-accent">
            {completion.promoCode}
          </code>
          <button
            type="button"
            onClick={onCopy}
            aria-label="Скопировать промокод"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-chocolate/15 bg-warm/70 text-muted transition-colors hover:border-gold/40 hover:text-foreground"
          >
            {copied ? <Check className="h-5 w-5 text-accent" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
        <p className="mt-4 text-xs text-muted">
          Промокод выдаётся один раз. Сохраните его — повторно пройти практику для нового кода
          нельзя.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href={course.getcourseUrl} size="lg">
          Записаться на {course.name}
        </Button>
        <Button href="/programs" variant="secondary" size="lg">
          Программы
        </Button>
      </div>

      <BookmarkPrompt />
    </motion.div>
  );
}

function AlreadyClaimedScreen() {
  const { course } = engagementConfig;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg space-y-6 text-center"
    >
      <h2 className="text-3xl">Промокод уже был получен</h2>
      <p className="text-muted leading-relaxed">
        На этом устройстве практика уже пройдена — повторная выдача промокода недоступна. Если вы
        не сохранили код, напишите в Telegram{" "}
        <a
          href={siteConfig.social.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {siteConfig.social.telegramHandle}
        </a>
        .
      </p>
      <Button href={course.getcourseUrl} size="lg">
        Записаться на {course.name}
      </Button>
    </motion.div>
  );
}

export function IntentionLineGame() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<Step>("intention");
  const [intentionId, setIntentionId] = useState<IntentionId | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [anchorWord, setAnchorWord] = useState("");
  const [customAnchor, setCustomAnchor] = useState("");
  const [completion, setCompletion] = useState<GameCompletion | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewBox, setViewBox] = useState({ w: 400, h: 320 });

  const { game, intentions, anchorWords } = engagementConfig;
  const maxPoints = game.maxPoints;
  const minPoints = game.minPoints;

  useEffect(() => {
    const saved = getGameCompletion();
    if (saved) {
      setCompletion(saved);
      setStep("reward");
    } else if (isPromoLockedWithoutData()) {
      setStep("already-claimed");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    function measure() {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      if (rect.width > 0) {
        setViewBox({ w: rect.width, h: Math.max(280, rect.width * 0.72) });
      }
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [step]);

  const pathD = useMemo(() => buildPath(points), [points]);
  const canFinishDraw = points.length >= minPoints;

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (step !== "draw" || points.length >= maxPoints) return;

      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * viewBox.w;
      const y = ((event.clientY - rect.top) / rect.height) * viewBox.h;

      setPoints((prev) => [...prev, { x, y }]);
    },
    [step, points.length, maxPoints, viewBox.w, viewBox.h],
  );

  function finishDrawing() {
    if (canFinishDraw) setStep("anchor");
  }

  function resetDrawing() {
    setPoints([]);
  }

  function completeGame() {
    if (isPromoAlreadyClaimed()) {
      const saved = getGameCompletion();
      if (saved) {
        setCompletion(saved);
        setStep("reward");
      } else {
        setStep("already-claimed");
      }
      return;
    }

    const word = (customAnchor.trim() || anchorWord).trim();
    if (!intentionId || !word) return;

    const payload = {
      completedAt: new Date().toISOString(),
      intentionId,
      anchorWord: word,
    };

    const saved = saveGameCompletion(payload);
    if (!saved) {
      setStep("already-claimed");
      return;
    }

    setCompletion({
      completed: true,
      promoCode: engagementConfig.course.promoCode,
      ...payload,
    });
    setStep("reward");
  }

  async function copyPromo() {
    if (!completion) return;
    try {
      await navigator.clipboard.writeText(completion.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  if (!ready) {
    return <p className="text-center text-muted">Загрузка практики…</p>;
  }

  if (step === "reward" && completion) {
    return <PromoReveal completion={completion} onCopy={copyPromo} copied={copied} />;
  }

  if (step === "already-claimed") {
    return <AlreadyClaimedScreen />;
  }

  const stepIndex = step === "intention" ? 1 : step === "draw" ? 2 : 3;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 flex items-center justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              n === stepIndex ? "w-10 bg-accent" : n < stepIndex ? "w-6 bg-gold/60" : "w-6 bg-border",
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "intention" ? (
          <motion.div
            key="intention"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl">Шаг 1. Ваш запрос</h2>
              <p className="mt-3 text-muted">Что сейчас важнее всего?</p>
              <p className="mt-2 text-xs text-muted">
                Промокод можно получить только один раз — после прохождения всех шагов.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {intentions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIntentionId(item.id)}
                  className={cn(
                    "rounded-[1.25rem] border p-5 text-left transition-all duration-300",
                    intentionId === item.id
                      ? "border-gold/50 bg-accent-light shadow-soft"
                      : "border-chocolate/10 bg-card/80 hover:border-gold/30",
                  )}
                >
                  <p className="font-display text-xl">{item.label}</p>
                  <p className="mt-1 text-sm text-muted">{item.hint}</p>
                </button>
              ))}
            </div>
            <div className="text-center">
              <Button
                type="button"
                size="lg"
                disabled={!intentionId}
                onClick={() => setStep("draw")}
              >
                Дальше — к линии
              </Button>
            </div>
          </motion.div>
        ) : null}

        {step === "draw" ? (
          <motion.div
            key="draw"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl">Шаг 2. Соберите узор</h2>
              <p className="mt-3 text-muted">
                Нажимайте на поле {minPoints}–{maxPoints} раз — линии соединятся сами, как в
                нейрографике.
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-card shadow-soft">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
                className="aspect-[5/4] w-full cursor-crosshair touch-none"
                onClick={handleCanvasClick}
                role="img"
                aria-label="Интерактивное поле для рисования линии намерения"
              >
                <rect width={viewBox.w} height={viewBox.h} fill="rgb(252 250 246)" />
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgb(228 238 232)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="rgb(252 250 246)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse
                  cx={viewBox.w / 2}
                  cy={viewBox.h / 2}
                  rx={viewBox.w * 0.35}
                  ry={viewBox.h * 0.35}
                  fill="url(#glow)"
                />

                {pathD ? (
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="rgb(31 58 50)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ) : null}

                {points.map((point, index) => (
                  <motion.circle
                    key={`${point.x}-${point.y}-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r={6}
                    fill="rgb(154 123 85)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  />
                ))}
              </svg>
            </div>

            <p className="text-center text-sm text-muted">
              Точек: {points.length} / {maxPoints}
              {points.length < minPoints ? ` (ещё ${minPoints - points.length})` : null}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep("intention")}>
                Назад
              </Button>
              <Button type="button" variant="secondary" onClick={resetDrawing} disabled={!points.length}>
                Сбросить
              </Button>
              <Button type="button" size="lg" disabled={!canFinishDraw} onClick={finishDrawing}>
                Готово
              </Button>
            </div>
          </motion.div>
        ) : null}

        {step === "anchor" ? (
          <motion.div
            key="anchor"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl">Шаг 3. Якорь</h2>
              <p className="mt-3 text-muted">
                Одно слово, которое поддержит ваше намерение — выберите или напишите своё.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {anchorWords.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => {
                    setAnchorWord(word);
                    setCustomAnchor("");
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    anchorWord === word && !customAnchor
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-chocolate/15 bg-card hover:border-gold/40",
                  )}
                >
                  {word}
                </button>
              ))}
            </div>

            <label className="block">
              <span className="text-sm font-medium text-muted">Или своё слово</span>
              <input
                type="text"
                value={customAnchor}
                onChange={(e) => {
                  setCustomAnchor(e.target.value);
                  setAnchorWord("");
                }}
                maxLength={24}
                placeholder="Например: Лёгкость"
                className="mt-2 h-12 w-full rounded-full border border-border bg-background px-5 text-base"
              />
            </label>

            <div className="flex flex-wrap justify-center gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep("draw")}>
                Назад
              </Button>
              <Button
                type="button"
                size="lg"
                disabled={!customAnchor.trim() && !anchorWord}
                onClick={completeGame}
              >
                Получить промокод
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
