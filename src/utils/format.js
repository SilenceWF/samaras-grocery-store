export function formatPrice(value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function clampQuantity(quantity) {
  if (Number.isNaN(Number(quantity))) {
    return 1
  }

  return Math.min(99, Math.max(1, Number(quantity)))
}
