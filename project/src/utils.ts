export function humanizeDuration(duration: number) {
  const date = new Date(0, 0, 0, 0, 0, duration);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}
