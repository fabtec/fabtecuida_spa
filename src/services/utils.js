import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Cookies from 'js-cookie'

dayjs.locale('es');

export const formatDate = (dateString) => {
  return dayjs(dateString).format('DD MMMM YYYY');
};

export const statusBadgesMap = {
  'PENDING': 'primary',
  'INPROGRESS': 'warning',
  'DONE': 'success',
};

export const writeCookie = (key, value, days) =>{
  var date = new Date();

  // Default at 365 days.
  days = days || 365;

  // Get unix milliseconds at current time plus number of days
  date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000

  window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";

  return value;
}

export const getAuthHeaders = () => {

    return {
      Authorization: `Bearer ${Cookies.get('jwt_access_token')}`
    }

}


export const signOut = () => {
  Cookies.remove('jwt_access_token')
  Cookies.remove('jwt_refresh_token')
}


