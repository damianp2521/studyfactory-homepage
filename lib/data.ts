import { LucideIcon, Coffee, BookOpen, Wifi, ShieldCheck, Zap, Smile } from "lucide-react";

export interface Benefit {
  title: string;
  description: string;
  icon: any;
}

export interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
  role: string;
  summary?: string;
  isSpecial?: boolean; // For the "See More" card
}

export const menuItems = [
  { name: "시설 안내", href: "#benefits" },
  { name: "이용 후기", href: "#reviews" },
  { name: "가맹 문의", href: "#franchise" },
  { name: "오시는 길", href: "#footer" },
];

export const benefits: Benefit[] = [
  {
    title: "",
    description: "",
    icon: Smile,
  },
  {
    title: "",
    description: "",
    icon: Smile,
  },
  {
    title: "",
    description: "",
    icon: Smile,
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    name: "b3****",
    role: "공무원 합격 & 서비스 만족",
    summary: "사장님의 상주 관리와 아침마다 배달되는 미숫가루 덕분에 합격했습니다.",
    content: "자격증공장의 최대 장점은 사장님의 상주입니다. 흐트러질 틈 없는 긴장감 속에서 공부할 수 있었고, 중간중간 해주시는 멘탈 케어가 큰 힘이 되었습니다. 특히 아침마다 자리에 가져다주시는 미숫가루와 커피, 꽉 채워진 간식 덕분에 오직 공부에만 집중할 수 있는 환경입니다.",
    rating: 5,
  },
  {
    id: 2,
    name: "ssws****",
    role: "자세 교정 & 관리 시스템",
    summary: "허리 통증까지 케어해주시는 사장님, 휴대폰 반납으로 순공 시간 확보했습니다.",
    content: "공부에 방해되는 휴대폰 관리는 물론, 허리와 목이 아플 때 의자 추천과 케어 방법까지 알려주셔서 감동했습니다. 단순한 관리가 아니라 원생 한 명 한 명을 사랑으로 대해주십니다. 합격을 원하신다면 고민하지 말고 일단 다녀보세요.",
    rating: 5,
  },
  {
    id: 3,
    name: "joj****",
    role: "전문직 & 지방 수험생 추천",
    summary: "서울 갈 돈 아껴서 자격증공장 등록하세요. 그게 합격의 지름길입니다.",
    content: "1차부터 2차 최종 합격까지 여기서 했습니다. 서울 갈 필요 없습니다. 인강 듣고 주말 GS 커리큘럼이면 충분합니다. 점심, 저녁, 조는 시간까지 아껴주는 환경에서 폭발적으로 실력을 늘리세요. 수험생의 시간과 돈을 아껴주는 곳이라 확신합니다.",
    rating: 5,
  },
  {
    id: 4,
    name: "vyw****",
    role: "단기 자격증 다관왕",
    summary: "미루기 달인이었던 제가 2개월 만에 기사, 토익, 컴활 등 5개를 해치웠습니다.",
    content: "책상 근처에도 안 가던 제가 등록 3일 만에 기사 필기 합격하고, 2개월 연장 후 토익스피킹 AL, 지텔프 등 자격증 5개를 땄습니다. 다 같이 열심히 하는 분위기와 사장님의 열렬한 관심 덕분에 여기가 진짜 자격증을 찍어내는 '공장'임을 실감했습니다.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lp****",
    role: "공기업 필기 합격",
    summary: "소리에 예민한 저도 만족했습니다. 밥, 빵, 불닭까지 있는 독서실은 처음입니다.",
    content: "소음에 예민한 편인데 불편 사항은 즉시 조치해 주셔서 좋았습니다. 스탠딩석, 노트북석 등 시설이 최적화되어 있고, 과일, 시리얼, 심지어 밥이랑 불닭볶음면까지 있어서 몸만 가면 됩니다. 덕분에 원하던 기업 필기에 한 번에 합격했습니다.",
    rating: 5,
  },
  {
    id: 6,
    name: "둥****",
    role: "전문직 생동차 합격",
    summary: "억만장자도 못 사는 '시간', 자격증공장에서는 살 수 있습니다.",
    content: "딴짓 1등, 수면 1등이었던 저를 사장님의 맞춤형 관리(휴대폰 의무 제출 등)가 사람으로 만들었습니다. 하루 2만 원도 안 되는 돈으로 1년 이상의 수험 기간을 아낄 수 있다면 사시겠습니까? 고민은 합격을 늦출 뿐입니다.",
    rating: 5,
  },
  {
    id: 7,
    name: "더 보기",
    role: "",
    summary: "",
    content: "",
    rating: 0,
    isSpecial: true,
  }
];
