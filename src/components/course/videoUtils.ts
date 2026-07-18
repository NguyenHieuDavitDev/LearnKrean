export function parseDurationLabel(label: string) {
  const parts = label.split(':').map(Number)
  if (parts.length === 2 && parts.every((n) => Number.isFinite(n))) {
    return parts[0] * 60 + parts[1]
  }
  if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  return 90
}

export function formatTime(totalSec: number) {
  const sec = Math.max(0, Math.floor(totalSec))
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export function resolveDemoDuration(label: string) {
  return Math.max(20, Math.min(40, Math.round(parseDurationLabel(label) / 8)))
}
