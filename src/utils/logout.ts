import Cookies from 'js-cookie'; // Import js-cookie

export const handleLogout = () => {

  Cookies.remove('token', { path: '/' });
  Cookies.remove('userId', { path: '/' });


  window.location.href = '/';
};