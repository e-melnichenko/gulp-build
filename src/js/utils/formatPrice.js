import formatNumber from "./formatNumber";

export default function formatPrice(num) {
  return formatNumber(+num.toFixed(2)) + ' руб.'
}
