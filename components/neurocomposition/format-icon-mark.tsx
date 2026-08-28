import type { FormatIcon } from "@/lib/content/neurocomposition";
import {
  BadgeCheck,
  BookOpen,
  MessageCircle,
  PenLine,
  ScanSearch,
  SquarePen,
  Unlock,
} from "lucide-react";

const icons: Record<FormatIcon, typeof BookOpen> = {
  access: Unlock,
  lessons: BookOpen,
  practice: PenLine,
  review: ScanSearch,
  feedback: MessageCircle,
  final: SquarePen,
  certificate: BadgeCheck,
};

type FormatIconMarkProps = {
  icon: FormatIcon;
};

export function FormatIconMark({ icon }: FormatIconMarkProps) {
  const Icon = icons[icon];
  return <Icon className="h-5 w-5" aria-hidden />;
}
