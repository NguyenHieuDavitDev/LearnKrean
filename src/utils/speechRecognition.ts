type SpeechRecognitionLike = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }> & { isFinal?: boolean }>
}

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function isSpeechRecognitionSupported(): boolean {
  return Boolean(getRecognitionCtor())
}

export type ListenResult = {
  transcript: string
  confidence: number
}

/** Nghe micro trong tối đa `timeoutMs`, trả về transcript tiếng Hàn. */
export function listenKoreanOnce(timeoutMs = 5000): Promise<ListenResult> {
  const Ctor = getRecognitionCtor()
  if (!Ctor) {
    return Promise.reject(new Error('Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge.'))
  }

  return new Promise((resolve, reject) => {
    const recognition = new Ctor()
    recognition.lang = 'ko-KR'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 3

    let settled = false
    const timer = window.setTimeout(() => {
      try {
        recognition.stop()
      } catch {
        /* ignore */
      }
    }, timeoutMs)

    const finish = (fn: () => void) => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      fn()
    }

    recognition.onresult = (event) => {
      const first = event.results[0]?.[0]
      const transcript = first?.transcript?.trim() ?? ''
      const confidence = first?.confidence ?? 0
      finish(() => resolve({ transcript, confidence }))
    }

    recognition.onerror = (event) => {
      finish(() => {
        if (event.error === 'not-allowed') {
          reject(new Error('Bạn cần cho phép truy cập micro để luyện phát âm.'))
        } else if (event.error === 'no-speech') {
          reject(new Error('Không nghe thấy giọng nói. Hãy thử lại và nói rõ hơn.'))
        } else {
          reject(new Error(`Lỗi nhận diện: ${event.error}`))
        }
      })
    }

    recognition.onend = () => {
      finish(() => reject(new Error('Kết thúc thu âm mà chưa có kết quả. Hãy thử lại.')))
    }

    try {
      recognition.start()
    } catch {
      finish(() => reject(new Error('Không thể bắt đầu thu âm. Kiểm tra micro và thử lại.')))
    }
  })
}

export async function recordAudioBlob(durationMs = 4000): Promise<Blob | null> {
  if (!navigator.mediaDevices?.getUserMedia) return null
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : undefined
    const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
    const chunks: BlobPart[] = []
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }

    return await new Promise<Blob | null>((resolve) => {
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        resolve(chunks.length ? new Blob(chunks, { type: mime ?? 'audio/webm' }) : null)
      }
      recorder.start()
      window.setTimeout(() => {
        if (recorder.state !== 'inactive') recorder.stop()
      }, durationMs)
    })
  } catch {
    return null
  }
}
