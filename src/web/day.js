export function isInThePast(dateAsString) {
  const date = new Date(dateAsString);
  const now = new Date();

  return date < now;
}

export function isToday(dateAsString) {
  const date = new Date(dateAsString);
  const now = new Date();

  return date.setHours(0,0,0,0) == now.setHours(0,0,0,0);
}
