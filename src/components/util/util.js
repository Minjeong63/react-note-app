const printDateAndTime = (timestamp) => {
  const date = new Date(timestamp);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // 0시를 12시로 변환

  return `${month}/${day}/${year} ${hours}:${minutes} ${period}`;
};

export default printDateAndTime;
