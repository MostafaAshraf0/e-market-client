import Cookies from 'js-cookie'; 

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    return !!token && !!userId;
  }
  return false;
};