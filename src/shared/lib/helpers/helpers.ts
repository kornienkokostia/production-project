import i18next from "i18next";

export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}${i18next.t('M')}`.replace('.', ',');
  }
  else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}${i18next.t('K')}`.replace('.', ',');
  }
  return `${value}`;
}

export const getDateToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = `${today.getMonth() + 1}`;
  let day = `${today.getDate()}`;

  if (+day < 10) day = '0' + day;
  if (+month < 10) month = '0' + month;

  return `${day}.${month}.${year}`;
}