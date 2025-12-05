export const formattedDate = (date: Date) => {
  return date.toLocaleDateString('mn-MN', {
    day: '2-digit',
    month: 'short',
  });
};

export const formattedMonth = (date: Date) => {
  return date.toLocaleDateString('mn-MN', {
    month: 'long',
  });
};

export const formattedDay = (date: Date) => {
  return date.toLocaleDateString('mn-MN', {
    day: '2-digit',
  });
};
