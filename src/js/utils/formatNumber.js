export default function formatNumber(value, { withSign = false } = {}) {
  return value
    ?.toString()
    ?.replace(/^/, withSign && value > 0 ? '+' : '')
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    ?.replace('.', ',');
}
