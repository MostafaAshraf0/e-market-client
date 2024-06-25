import Cookies from 'js-cookie';

export const isAuthenticated = (): { loggedIn: boolean, userId: string | null } => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    return { loggedIn: !!token && !!userId, userId: userId || null };
  }
  return { loggedIn: false, userId: null };
};