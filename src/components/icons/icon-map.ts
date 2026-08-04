/**
 * Lucide → Phosphor name map (verified against @phosphor-icons/react 2.1.10).
 * Centralizes the migration so components only ever reference Lucide-era names.
 */
export const ICON_MAP = {
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUpRight: "ArrowUpRight",
  ExternalLink: "ArrowSquareOut",
  Calendar: "Calendar",
  Briefcase: "Briefcase",
  Award: "Medal",
  BarChart2: "ChartBar",
  Trophy: "Trophy",
  Zap: "Lightning",
  PenLine: "PencilLine",
  Copy: "Copy",
  Check: "Check",
  Phone: "Phone",
  GraduationCap: "GraduationCap",
  TrendingUp: "TrendUp",
  Activity: "Pulse",
  Clipboard: "Clipboard",
  Scale: "Scales",
  Coins: "Coins",
  Stethoscope: "Stethoscope",
  Search: "MagnifyingGlass",
  FileText: "FileText",
  MessageSquare: "ChatCentered",
} as const;

export type LucideIconName = keyof typeof ICON_MAP;
