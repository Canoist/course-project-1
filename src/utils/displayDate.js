export function displayDate(date) {
  const dateDiff = Date.now() - date;
  switch (dateDiff) {
    case dateDiff < 60000:
      return "1 минуту назад";
    case dateDiff < 300000:
      return "5 минут назад";
    case dateDiff < 600000:
      return "10 минут назад";
    case dateDiff < 1800000:
      return "30 минут назад";
    case dateDiff < 3600 * 24 * 1000:
      // 3600 - кол-во сек в часе
      return dateDiff.getHourse() + ":" + dateDiff.getMinutes();
    case dateDiff >= 3600 * 24 * 1000:
      return Date.now().getMonth() > date.getMonth()
        ? `${date.getDay()}.${date.getMonth()}`
        : `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

    default:
      break;
  }
}
