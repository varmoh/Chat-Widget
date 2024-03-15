const formatTime = (timeInSecond: string) => {
  const time = parseInt(timeInSecond);
  const minutes = Math.floor(time / 60);
  if(isNaN(minutes)) return 0;
  return minutes;
};

export default formatTime;
