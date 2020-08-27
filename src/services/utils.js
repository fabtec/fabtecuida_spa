import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export const formatDate = (dateString) => {
  return dayjs(dateString).format('DD MMMM YYYY');
};

export const statusBadgesMap = {
  'PENDING': 'primary',
  'INPROGRESS': 'warning',
  'DONE': 'success',
};

