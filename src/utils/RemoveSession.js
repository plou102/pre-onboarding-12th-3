export const DeleteSession = value => {
  const sessionData = sessionStorage.getItem(`${value}`);

  const item = JSON.parse(sessionData);
  const now = new Date().getTime();

  if (now > item.time) {
    sessionStorage.removeItem(`${value}`);
    return true;
  }

  return false;
};
