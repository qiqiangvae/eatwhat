export const TAGS = [
  '川菜', '湘菜', '粤菜', '闽菜', '浙菜', '苏菜', '鲁菜', '徽菜',
  '西北菜', '东北菜',
  '火锅', '烧烤',
  '快餐', '小吃', '面馆', '家常菜', '轻食'
] as const;

export type Tag = typeof TAGS[number];