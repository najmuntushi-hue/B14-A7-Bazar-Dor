const d = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
export const toBn = (n) => String(n).replace(/\d/g, (x) => d[x]);
export const bnToNum = (s) =>
  Number(String(s).replace(/[০-৯]/g, (x) => d.indexOf(x)).replace(/[,\s]/g, ""));

export const formatPrice = (n) => toBn(Number(n).toLocaleString("en-IN"));