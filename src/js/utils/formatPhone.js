export default function formatPhone(string) {
  if(!string) return 'Не указан';

  return `+7 (${string.slice(-10, -7)}) ${string.slice(-7, -4)}-${string.slice(-4, -2)}-${string.slice(-2)}`
}
