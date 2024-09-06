export function parseToken(token: string) {
  if (!token) return;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  updateFunction: any
): void => {
  const { name, value } = e.target;

  updateFunction((prev: any) => ({ ...prev, [name]: value }));
};
