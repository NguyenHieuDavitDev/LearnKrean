/** Chuẩn hóa chuỗi tiếng Hàn để so khớp phát âm. */
export function normalizeKorean(text: string): string {
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\uac00-\ud7a3ㄱ-ㅎㅏ-ㅣ0-9a-z\s]/gi, '')
    .replace(/\s+/g, '')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const row = new Array<number>(n + 1)
  for (let j = 0; j <= n; j++) row[j] = j
  for (let i = 1; i <= m; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= n; j++) {
      const temp = row[j]
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost)
      prev = temp
    }
  }
  return row[n]
}

export type PronunciationScore = {
  score: number
  recognized: string
  target: string
  label: string
  feedback: string
}

/** Chấm điểm 0–100 dựa trên độ giống transcript ASR với từ mục tiêu. */
export function scorePronunciation(target: string, recognized: string): PronunciationScore {
  const t = normalizeKorean(target)
  const r = normalizeKorean(recognized)
  if (!r) {
    return {
      score: 0,
      recognized: recognized.trim() || '(không nhận được âm thanh)',
      target,
      label: 'Chưa nghe rõ',
      feedback: 'Không nhận diện được giọng nói. Hãy nói to hơn, gần micro và thử lại.',
    }
  }

  const distance = levenshtein(t, r)
  const maxLen = Math.max(t.length, r.length, 1)
  const similarity = 1 - distance / maxLen
  // Thưởng nhẹ nếu chứa đúng chuỗi mục tiêu (ASR đôi khi thêm từ quanh)
  const containsBonus = r.includes(t) || t.includes(r) ? 0.08 : 0
  const raw = Math.min(1, similarity + containsBonus)
  const score = Math.round(raw * 100)

  let label = 'Cần luyện thêm'
  let feedback = 'Phát âm còn lệch so với mẫu. Nghe lại rồi nói chậm, rõ từng âm tiết.'
  if (score >= 90) {
    label = 'Xuất sắc'
    feedback = 'Phát âm rất gần với mẫu. Hãy giữ nhịp này và luyện từ tiếp theo.'
  } else if (score >= 75) {
    label = 'Tốt'
    feedback = 'Khá chính xác. Chỉnh nhẹ độ mở miệng / độ căng phụ âm để đạt điểm cao hơn.'
  } else if (score >= 55) {
    label = 'Khá'
    feedback = 'Đã nhận ra đúng hướng. Nghe mẫu 2 lần rồi shadowing (nói theo ngay).'
  }

  return { score, recognized: recognized.trim(), target, label, feedback }
}
