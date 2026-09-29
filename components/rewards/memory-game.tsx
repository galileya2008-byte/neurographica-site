"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MemoryMark,
  memoryPairIds,
  memoryPairLabels,
  type MemoryPairId,
} from "@/components/rewards/memory-marks";
import { cn } from "@/lib/utils";

type Card = {
  uid: string;
  pairId: MemoryPairId;
};

type MemoryGameProps = {
  alreadyAwarded: boolean;
  onComplete: () => void;
};

function shuffleCards(): Card[] {
  const doubled = [...memoryPairIds, ...memoryPairIds].map((pairId, index) => ({
    uid: `${pairId}-${index}`,
    pairId,
  }));

  for (let i = doubled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled;
}

export function MemoryGame({ alreadyAwarded, onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<MemoryPairId>>(new Set());
  const [busy, setBusy] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  const remaining = memoryPairIds.length - matched.size;
  const openPair = useMemo(
    () => cards.filter((card) => open.includes(card.uid)),
    [cards, open],
  );

  function restart() {
    setCards(shuffleCards());
    setOpen([]);
    setMatched(new Set());
    setBusy(false);
    setWon(false);
  }

  function flip(card: Card) {
    if (busy || won || matched.has(card.pairId) || open.includes(card.uid)) return;

    const nextOpen = [...open, card.uid];
    setOpen(nextOpen);

    if (nextOpen.length < 2) return;

    const [first, second] = cards.filter((item) => nextOpen.includes(item.uid));
    if (!first || !second) return;

    if (first.pairId === second.pairId) {
      const nextMatched = new Set(matched);
      nextMatched.add(first.pairId);
      setMatched(nextMatched);
      setOpen([]);

      if (nextMatched.size === memoryPairIds.length) {
        setWon(true);
        onComplete();
      }
      return;
    }

    setBusy(true);
    window.setTimeout(() => {
      setOpen([]);
      setBusy(false);
    }, 720);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
            Игра дня
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">Найдите парные знаки сайта</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Откройте две карточки: линия, сопряжение, круг внимания, лист, намерение и
            новая дверь. За полный круг сегодня — {alreadyAwarded ? "бонусы уже начислены" : "10 бонусов"}.
          </p>
        </div>
        <p className="text-sm text-muted">Осталось пар: {remaining}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
        {cards.map((card) => {
          const isMatched = matched.has(card.pairId);
          const isOpen = isMatched || open.includes(card.uid);
          const isMismatchHighlight =
            openPair.length === 2 &&
            open.includes(card.uid) &&
            openPair[0]?.pairId !== openPair[1]?.pairId;

          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => flip(card)}
              disabled={busy || isMatched || won}
              aria-label={
                isOpen
                  ? memoryPairLabels[card.pairId]
                  : "Закрытая карточка"
              }
              className={cn(
                "relative aspect-square rounded-[1.15rem] border text-left transition duration-500",
                isOpen
                  ? "border-gold/40 bg-card shadow-soft"
                  : "border-chocolate/15 bg-[linear-gradient(160deg,_rgb(31_58_50)_0%,_rgb(92_64_51)_100%)] shadow-card hover:-translate-y-0.5",
                isMismatchHighlight && "border-chocolate/50",
              )}
            >
              {isOpen ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex flex-col items-center gap-1">
                    <MemoryMark id={card.pairId} />
                    <span className="px-1 text-center text-[10px] uppercase tracking-[0.12em] text-muted">
                      {memoryPairLabels[card.pairId]}
                    </span>
                  </span>
                </span>
              ) : (
                <span
                  className="absolute inset-0 flex items-center justify-center font-display text-2xl text-gold/80"
                  aria-hidden
                >
                  ◯
                </span>
              )}
            </button>
          );
        })}
      </div>

      {won ? (
        <div className="mt-6 rounded-[1.25rem] border border-gold/25 bg-warm/50 px-5 py-4 text-sm leading-relaxed text-foreground">
          {alreadyAwarded
            ? "Круг собран. Сегодняшние бонусы уже у вас — возвращайтесь завтра."
            : "Круг собран. 10 бонусов добавлены на колесо."}
          <div className="mt-3">
            <Button type="button" variant="secondary" size="sm" onClick={restart}>
              Сыграть ещё раз
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
