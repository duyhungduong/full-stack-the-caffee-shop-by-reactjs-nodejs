const displayVNCurrency = (num) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3,
  });

  return formatter.format(num);
};

export default displayVNCurrency;
