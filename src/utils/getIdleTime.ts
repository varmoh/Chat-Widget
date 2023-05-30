function getIdleTime(lastActive: string): number {
  const inputDate = new Date(lastActive);
  const currentTime = new Date();
  const differenceInSeconds = Math.floor((currentTime.getTime() - inputDate.getTime()) / 1000);
  return differenceInSeconds;
}

export default getIdleTime;