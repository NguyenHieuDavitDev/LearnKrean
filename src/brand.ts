export const BRAND = {
  name: 'Cô Huyền Tiếng Hàn',
  shortName: 'Cô Huyền',
  slogan: 'Học tiếng Hàn cùng cô Huyền',
  mark: '현',
  company: 'Công ty TNHH Cổng Chiến Thắng',
  address: '33/79 Phùng Lưu, phường Thanh Thuỷ, TP Huế',
  phones: ['0945 201599', '0913 801 599'] as const,
  phoneDisplay: '0945 201599 – 0913 801 599',
} as const

export type SocialPlatformId = 'youtube' | 'tiktok' | 'facebook'

export const SOCIAL = {
  cta: 'Bạn quan tâm hãy nhấn đăng ký, like, thích và tham gia nhóm học tiếng Hàn cùng Cô Huyền.',
  intro:
    'Ngoài lớp học tại Huế, Cô Huyền chia sẻ bài giảng, mẹo học và cập nhật lớp học trên YouTube, TikTok và nhóm Facebook — giúp bạn học tiếng Hàn mọi lúc, mọi nơi.',
  links: [
    {
      id: 'youtube' as const,
      label: 'YouTube',
      handle: '@cohuyentienghan6329',
      action: 'Đăng ký kênh YouTube',
      href: 'https://www.youtube.com/@cohuyentienghan6329',
      description:
        'Kênh video bài giảng tiếng Hàn, luyện nghe TOPIK và kiến thức văn hóa Hàn Quốc — phù hợp ôn tập sau buổi học hoặc tự học tại nhà.',
      highlights: ['Bài giảng theo giáo trình', 'Luyện nghe & phát âm', 'Kiến thức văn hóa Hàn'],
    },
    {
      id: 'tiktok' as const,
      label: 'TikTok',
      handle: '@cohuyentienghan',
      action: 'Theo dõi TikTok',
      href: 'https://www.tiktok.com/@cohuyentienghan',
      description:
        'Video ngắn dễ xem: mẹo học Hangul, luyện nghe EPS-TOPIK, hoạt động lớp học và kinh nghiệm giảng dạy 17 năm của ThS. Trần Thị Huyền — Giảng viên ĐH Ngoại ngữ Huế.',
      highlights: ['Video ngắn dễ hiểu', 'Luyện nghe EPS-TOPIK', 'Cập nhật lớp học tại Huế'],
    },
    {
      id: 'facebook' as const,
      label: 'Facebook',
      handle: 'Học tiếng Hàn cùng Cô Huyền',
      action: 'Tham gia nhóm Facebook',
      href: 'https://www.facebook.com/61575821611935/about/',
      description:
        'Trang và nhóm cộng đồng học viên: hỏi đáp bài tập, chia sẻ kinh nghiệm thi TOPIK, tư vấn du học Hàn Quốc và thông báo lịch khai giảng tại trung tâm.',
      highlights: ['Hỏi đáp bài tập', 'Cộng đồng học viên', 'Tư vấn du học & TOPIK'],
    },
  ],
} as const
