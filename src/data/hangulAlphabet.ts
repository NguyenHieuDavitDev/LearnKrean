/**
 * Bảng chữ Hangul theo giáo trình
 * «Tiếng Hàn Tổng Hợp Dành Cho Người Việt Nam» — Cho Hang Rok, Lee Mi Hye (Sơ cấp 1).
 * speakAs: âm tiết dùng để TTS (jamo đơn lẻ thường không phát âm rõ).
 */

export type HangulLetter = {
  char: string
  romanization: string
  meaning: string
  speakAs: string
}

export const BASIC_VOWELS: HangulLetter[] = [
  { char: 'ㅏ', romanization: 'a', meaning: 'Như “a” trong “ba”', speakAs: '아' },
  { char: 'ㅑ', romanization: 'ya', meaning: 'ㅏ + y', speakAs: '야' },
  { char: 'ㅓ', romanization: 'eo', meaning: 'Giống “ơ” mở', speakAs: '어' },
  { char: 'ㅕ', romanization: 'yeo', meaning: 'ㅓ + y', speakAs: '여' },
  { char: 'ㅗ', romanization: 'o', meaning: 'Như “ô”', speakAs: '오' },
  { char: 'ㅛ', romanization: 'yo', meaning: 'ㅗ + y', speakAs: '요' },
  { char: 'ㅜ', romanization: 'u', meaning: 'Như “u”', speakAs: '우' },
  { char: 'ㅠ', romanization: 'yu', meaning: 'ㅜ + y', speakAs: '유' },
  { char: 'ㅡ', romanization: 'eu', meaning: 'Giống “ư”', speakAs: '으' },
  { char: 'ㅣ', romanization: 'i', meaning: 'Như “i”', speakAs: '이' },
]

export const COMPOUND_VOWELS: HangulLetter[] = [
  { char: 'ㅐ', romanization: 'ae', meaning: 'Gần “e” mở', speakAs: '애' },
  { char: 'ㅔ', romanization: 'e', meaning: 'Như “ê”', speakAs: '에' },
  { char: 'ㅒ', romanization: 'yae', meaning: 'ㅐ + y', speakAs: '얘' },
  { char: 'ㅖ', romanization: 'ye', meaning: 'ㅔ + y', speakAs: '예' },
  { char: 'ㅘ', romanization: 'wa', meaning: 'ㅗ + ㅏ', speakAs: '와' },
  { char: 'ㅙ', romanization: 'wae', meaning: 'ㅗ + ㅐ', speakAs: '왜' },
  { char: 'ㅚ', romanization: 'oe', meaning: 'ㅗ + ㅣ (gần “we”)', speakAs: '외' },
  { char: 'ㅝ', romanization: 'wo', meaning: 'ㅜ + ㅓ', speakAs: '워' },
  { char: 'ㅞ', romanization: 'we', meaning: 'ㅜ + ㅔ', speakAs: '웨' },
  { char: 'ㅟ', romanization: 'wi', meaning: 'ㅜ + ㅣ', speakAs: '위' },
  { char: 'ㅢ', romanization: 'ui', meaning: 'ㅡ + ㅣ', speakAs: '의' },
]

export const BASIC_CONSONANTS: HangulLetter[] = [
  { char: 'ㄱ', romanization: 'g/k', meaning: 'Đầu từ gần g; cuối gần k', speakAs: '가' },
  { char: 'ㄴ', romanization: 'n', meaning: 'Phụ âm n', speakAs: '나' },
  { char: 'ㄷ', romanization: 'd/t', meaning: 'Đầu từ gần d; cuối gần t', speakAs: '다' },
  { char: 'ㄹ', romanization: 'r/l', meaning: 'Đầu gần r; cuối gần l', speakAs: '라' },
  { char: 'ㅁ', romanization: 'm', meaning: 'Phụ âm m', speakAs: '마' },
  { char: 'ㅂ', romanization: 'b/p', meaning: 'Đầu gần b; cuối gần p', speakAs: '바' },
  { char: 'ㅅ', romanization: 's', meaning: 'Trước ㅣ gần “sh”', speakAs: '사' },
  { char: 'ㅇ', romanization: '∅ / ng', meaning: 'Đầu: im lặng; cuối: ng', speakAs: '아' },
  { char: 'ㅈ', romanization: 'j', meaning: 'Phụ âm j', speakAs: '자' },
  { char: 'ㅊ', romanization: 'ch', meaning: 'Bật hơi (격음)', speakAs: '차' },
  { char: 'ㅋ', romanization: 'k', meaning: 'Bật hơi mạnh hơn ㄱ', speakAs: '카' },
  { char: 'ㅌ', romanization: 't', meaning: 'Bật hơi mạnh hơn ㄷ', speakAs: '타' },
  { char: 'ㅍ', romanization: 'p', meaning: 'Bật hơi mạnh hơn ㅂ', speakAs: '파' },
  { char: 'ㅎ', romanization: 'h', meaning: 'Phụ âm h', speakAs: '하' },
]

export const DOUBLE_CONSONANTS: HangulLetter[] = [
  { char: 'ㄲ', romanization: 'kk', meaning: '경음 của ㄱ — căng, không bật hơi', speakAs: '까' },
  { char: 'ㄸ', romanization: 'tt', meaning: '경음 của ㄷ', speakAs: '따' },
  { char: 'ㅃ', romanization: 'pp', meaning: '경음 của ㅂ', speakAs: '빠' },
  { char: 'ㅆ', romanization: 'ss', meaning: '경음 của ㅅ', speakAs: '싸' },
  { char: 'ㅉ', romanization: 'jj', meaning: '경음 của ㅈ', speakAs: '짜' },
]

/** 7 âm batchim đại diện theo giáo trình Tổng hợp */
export const BATCHIM_SOUNDS: HangulLetter[] = [
  { char: 'ㄱ', romanization: '-k', meaning: 'Batchim ㄱ/ㅋ/ㄲ → gần “k”', speakAs: '국' },
  { char: 'ㄴ', romanization: '-n', meaning: 'Batchim ㄴ → “n”', speakAs: '산' },
  { char: 'ㄷ', romanization: '-t', meaning: 'Batchim ㄷ/ㅅ/ㅈ/ㅊ/ㅌ/ㅎ → gần “t”', speakAs: '곧' },
  { char: 'ㄹ', romanization: '-l', meaning: 'Batchim ㄹ → “l”', speakAs: '말' },
  { char: 'ㅁ', romanization: '-m', meaning: 'Batchim ㅁ → “m”', speakAs: '밤' },
  { char: 'ㅂ', romanization: '-p', meaning: 'Batchim ㅂ/ㅍ → gần “p”', speakAs: '밥' },
  { char: 'ㅇ', romanization: '-ng', meaning: 'Batchim ㅇ → “ng”', speakAs: '방' },
]

export const pick = (chars: string[], pool: HangulLetter[]): HangulLetter[] =>
  chars.map((c) => pool.find((l) => l.char === c)).filter((l): l is HangulLetter => Boolean(l))
