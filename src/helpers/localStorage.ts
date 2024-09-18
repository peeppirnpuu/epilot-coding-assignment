type DefaultValue = {
  score: number | undefined;
  username: string;
};

const key: string = "ePilot";
const defaultValue: DefaultValue = { score: undefined, username: "" };

export const getFromLocalStorage = () => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : defaultValue;
};

export const saveToLocalStorage = (value: string) => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem(key);
};
