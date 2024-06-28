import Cookies from 'js-cookie';

export const isAuthenticated = (): { loggedIn: boolean, userId: string | null, role: string | null } => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    const role = Cookies.get('role');
    console.log('Role:', role);
    return { loggedIn: !!token && !!userId, userId: userId || null , role: role || null, };
  }
  return { loggedIn: false, userId: null ,role: null };
};