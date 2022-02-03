function formateDate(date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

export default formateDate;
