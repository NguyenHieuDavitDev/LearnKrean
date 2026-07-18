import {
  faBookOpen,
  faBriefcase,
  faComments,
  faGraduationCap,
  faLanguage,
  faMicrophone,
  faPenFancy,
  faSpellCheck,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type RoadmapStep = {
  khoaHocId: number
  title: string
  desc: string
}

export type Roadmap = {
  id: string
  title: string
  shortTitle: string
  level: 'basic' | 'advanced'
  description: string
  longDescription: string
  skills: { label: string; icon: IconDefinition }[]
  illustration: {
    gradient: string
    mark: string
    caption: string
  }
  steps: RoadmapStep[]
  duration: string
  outcome: string
}

export const ROADMAPS: Roadmap[] = [
  {
    id: 'basic',
    title: 'Lộ trình học Cơ bản',
    shortTitle: 'Cơ bản',
    level: 'basic',
    description:
      'Dành cho người mới bắt đầu. Học Hangul, ngữ pháp sơ cấp và giao tiếp hàng ngày để tự tin mở lời.',
    longDescription:
      'Lộ trình giúp bạn đi từ số 0: đọc viết Hangul, nắm đuôi câu cơ bản, rồi luyện hội thoại thực tế. Phù hợp học sinh, sinh viên và người đi làm muốn có nền tảng vững trước khi học nâng cao / TOPIK.',
    skills: [
      { label: 'Hangul', icon: faLanguage },
      { label: 'Ngữ pháp', icon: faSpellCheck },
      { label: 'Giao tiếp', icon: faComments },
      { label: 'Từ vựng', icon: faBookOpen },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #ffecd2 0%, #fcb69f 55%, #f05123 120%)',
      mark: '가',
      caption: 'Start',
    },
    duration: '3–4 tháng',
    outcome: 'Đọc Hangul trôi chảy, giao tiếp tình huống cơ bản',
    steps: [
      {
        khoaHocId: 1,
        title: 'Hangul cơ bản',
        desc: 'Học bảng chữ cái, ghép âm tiết và đọc viết từ đơn giản.',
      },
      {
        khoaHocId: 2,
        title: 'Tiếng Hàn sơ cấp 1',
        desc: 'Ngữ pháp nền tảng, đuôi câu lịch sự và mẫu câu thường dùng.',
      },
      {
        khoaHocId: 3,
        title: 'Giao tiếp hàng ngày',
        desc: 'Luyện hội thoại chào hỏi, hỏi đường, gọi món, mua sắm.',
      },
      {
        khoaHocId: 4,
        title: 'Ngữ pháp TOPIK I',
        desc: 'Củng cố ngữ pháp sơ – trung cấp nhẹ, làm quen dạng đề.',
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Lộ trình học Nâng cao',
    shortTitle: 'Nâng cao',
    level: 'advanced',
    description:
      'Dành cho người đã có nền tảng. Chinh phục TOPIK, giao tiếp bản ngữ và tiếng Hàn công sở / dịch thuật.',
    longDescription:
      'Sau khi hoàn thành lộ trình cơ bản, bạn sẽ đi sâu vào chiến lược thi TOPIK, luyện nói với bản ngữ, tiếng Hàn thương mại và hướng biên phiên dịch. Phù hợp mục tiêu đi làm, du học hoặc đạt chứng chỉ cao.',
    skills: [
      { label: 'TOPIK', icon: faGraduationCap },
      { label: 'Speaking', icon: faMicrophone },
      { label: 'Công sở', icon: faBriefcase },
      { label: 'Viết luận', icon: faPenFancy },
    ],
    illustration: {
      gradient: 'linear-gradient(145deg, #7b2ff7 0%, #f107a3 70%, #ff6a00 140%)',
      mark: '漢',
      caption: 'Pro',
    },
    duration: '4–6 tháng',
    outcome: 'Đạt TOPIK 4–6, giao tiếp chuyên nghiệp hơn',
    steps: [
      {
        khoaHocId: 5,
        title: 'TOPIK Pro',
        desc: 'Luyện đề chuyên sâu, chữa viết luận và chiến lược từng kỹ năng.',
      },
      {
        khoaHocId: 7,
        title: 'Luyện nói với bản ngữ',
        desc: 'Phản xạ nói, phát âm và hội thoại thực tế 1-1.',
      },
      {
        khoaHocId: 6,
        title: 'Tiếng Hàn thương mại',
        desc: 'Email, họp, thuyết trình và văn hóa doanh nghiệp Hàn.',
      },
      {
        khoaHocId: 8,
        title: 'Biên phiên dịch Hàn',
        desc: 'Kỹ thuật dịch, thuật ngữ chuyên ngành và dự án thực hành.',
      },
    ],
  },
]

export function getRoadmapById(id: string) {
  return ROADMAPS.find((r) => r.id === id)
}
