export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${token}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }