export const isSmall = () => {
  if (window.innerWidth < 768) {
    return true;
  }

  return false;
};

export const isMedium = () => {
  if (window.innerWidth >= 769 && window.innerWidth <= 1059) {
    return true;
  }

  return false;
};

export const isBig = () => {
  if (window.innerWidth >= 1060) {
    return true;
  }

  return false;
};