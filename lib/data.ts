export interface MenuItem {
  name: string;
  href: "#benefits" | "#happiness" | "#reviews";
}

export const menuItems: MenuItem[] = [
  { name: "성인자기주도학습관리", href: "#benefits" },
  { name: "자격증공장에 오면 누리는 행복", href: "#happiness" },
  { name: "다녀본 사람들의 생생한 리뷰", href: "#reviews" },
];
