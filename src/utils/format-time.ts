const formatTime = (timeInSecond: string) => {
  const time = parseInt(timeInSecond);
  const minutes = Math.floor(time / 60);
  return minutes;
};

export default formatTime;
