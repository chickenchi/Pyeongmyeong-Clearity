export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const secs = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
