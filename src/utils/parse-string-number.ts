const parseStringNumber = (x?: string): number => {
  if(!x || Number.isNaN(x)) 
    return 0;
  return parseInt(x);
}

export default parseStringNumber;
