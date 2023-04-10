import * as icons from '@/constants/icons';

export function isBaseIconName(name: string): boolean {
  return Object.values(icons)
    .map((iconName: string) => iconName.toLowerCase())
    .includes(name.toLowerCase())
}