/** Phát âm tiếng Hàn qua Web Speech API (ko-KR). */
export function speakKorean(text: string, rate = 0.85): void {
  if (!('speechSynthesis' in window) || !text.trim()) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text.trim())
  utter.lang = 'ko-KR'
  utter.rate = rate
  window.speechSynthesis.speak(utter)
}
