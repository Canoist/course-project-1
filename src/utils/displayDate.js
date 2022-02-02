export function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const minsDif = dateNow.getMinutes() - date.getMinutes();
  if (dateNow.getFullYear() > date.getFullYear()) {
    if (date.getDate() < 10) {
      if (date.getMonth() + 1 < 10) {
        return `0${date.getDate()}.0${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
      }
      return `0${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  } else if (dateNow.getMonth() > date.getMonth()) {
    return `${date.getDate()}.${date.getMonth()}`;
  } else if (minsDif >= 30) {
    return `${date.getHours()}:${date.getMinutes()}`;
  } else if (minsDif >= 10 && minsDif < 30) {
    return "10 минут назад";
  } else if (minsDif >= 5 && minsDif < 10) {
    return "5 минут назад";
  } else if (minsDif < 5 && minsDif >= 0) {
    return "1 минуту назад";
  } else {
    console.error("Error in data display function");
  }
}
