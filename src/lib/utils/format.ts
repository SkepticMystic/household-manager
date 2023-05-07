const numberFormatter = new Intl.NumberFormat("en", {
  style: "decimal",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const randFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "ZAR",

  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});
const euroFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",

  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en", {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export const Format = {
  number: (amount: number) => numberFormatter.format(amount),
  currency: {
    EUR: (amount: number) => euroFormatter.format(amount),
    ZAR: (amount: number) => randFormatter.format(amount),
  },
  percent: (amount: number) => percentFormatter.format(amount),

  custom: (amount: string | number, options: Intl.NumberFormatOptions) => {
    const { format } = new Intl.NumberFormat("en", options);

    return typeof amount === "string" ? amount : format(amount);
  },
};
