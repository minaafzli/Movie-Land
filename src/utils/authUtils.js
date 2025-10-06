
/**
 * ورود کاربر و ذخیره اطلاعات
 */
export const loginUser = (userData) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify({
    username: userData.username || "",
    email: userData.email || "",
  }));
  // ایجاد لیست خالی برای favorites
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }
};

/**
 * خروج کاربر و پاک کردن تمام اطلاعات
 */
export const logoutUser = () => {
  // پاک کردن تمام اطلاعات کاربر
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("favorites");
  localStorage.removeItem("user");
  
  // ارسال event برای اطلاع سایر کامپوننت‌ها
  window.dispatchEvent(new Event("userLoggedOut"));
};

/**
 * بررسی وضعیت login
 */
export const isUserLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

/**
 * دریافت اطلاعات کاربر
 */
export const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return {
    username: user.username || "User",
    email: user.email || "",
    isLoggedIn: isUserLoggedIn(),
    subscription: user.subscription ,
  };
};

/**
 * مدیریت لیست علاقه‌مندی‌ها
 */
export const getFavorites = () => {
  if (!isUserLoggedIn()) return [];
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const addToFavorites = (movie) => {
  if (!isUserLoggedIn()) return false;
  
  const favorites = getFavorites();
  
  // بررسی اینکه فیلم قبلاً اضافه نشده باشد
  if (favorites.some((f) => f.imdbID === movie.imdbID)) {
    return false;
  }
  
  const updatedFavorites = [...favorites, movie];
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event("favoritesChanged"));
  return true;
};

export const removeFromFavorites = (imdbID) => {
  if (!isUserLoggedIn()) return false;
  
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((f) => f.imdbID !== imdbID);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event("favoritesChanged"));
  return true;
};

export const isFavorite = (imdbID) => {
  if (!isUserLoggedIn()) return false;
  const favorites = getFavorites();
  return favorites.some((f) => f.imdbID === imdbID);
};