import { MONTH_DAYS_ROWS, MONTH_DAYS_COLUMNS } from '../constansts';

export const evalMonthDays = (date) => {
    const endOfPreviousMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
    const endOfNowMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const pastMonthDays = endOfPreviousMonthDate.getDay();
    const currentMonthDays = endOfNowMonthDate.getDate();
    const previousMonthDays = endOfPreviousMonthDate.getDate();

    const days = [...new Array(MONTH_DAYS_COLUMNS * MONTH_DAYS_ROWS)].map((_, index) => {
        if (index >= pastMonthDays && index < currentMonthDays + pastMonthDays) {
            return { day: index - pastMonthDays + 1, active: true };
        } else if (index < pastMonthDays) {
            return { day: previousMonthDays + index - pastMonthDays + 1, active: false };
        } else if ((index) => currentMonthDays + pastMonthDays) {
            return { day: index - currentMonthDays - pastMonthDays + 1, active: false };
        }
        return null;
    });
    return days;
};

const formatTime = (time) => (time <= 9 ? '0' + time : time);

export const formatHours = (hour) => `${formatTime(hour)}.00`;

export const convertInMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return +minutes + (+hours * 60);
}

export const convertInterval = (interval) => {
    const [startTime, endTime] = interval.split('-').map(time => convertInMinutes(time));
    return { endTime, startTime };
}

export const convertToIsoDate = (date) => {
    return date.toISOString().slice(0, 10);
};

export const convertInHours = (time) => {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return `${formatTime(hours)}:${formatTime(minutes)}`;
};

export const groupByDate = function (xs) {
    return xs.reduce((rv, x) => {
        (rv[x['date']] = rv[x['date']] || []).push(x);
        return rv;
    }, {});
};
