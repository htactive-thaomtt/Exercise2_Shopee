export const loadState = () => {
  try {
    const list = localStorage.getItem("list");
    if (list === null) return [];
    return JSON.parse(list);
  } catch (error) {
    return [];
  }
};
export const saveState = (state) => {
  try {
    const list = JSON.stringify(state);
    localStorage.setItem("list", list);
  } catch (error) {}
};
