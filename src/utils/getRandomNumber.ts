export const getRandomNumber = (rangeTo = 1000): number => {
  return Math.floor(Math.random() * rangeTo);
};
