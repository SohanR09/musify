function convertMillisToMinSec(millis: number): string {
  const minutes = Math.floor(millis / 60000); // Convert to minutes
  const seconds = Math.floor((millis % 60000) / 1000); // Get remaining seconds

  // Pad single-digit seconds with leading zero
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${paddedSeconds}`;
}
export default convertMillisToMinSec;
