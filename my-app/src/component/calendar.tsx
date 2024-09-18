import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/vi'; 
const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Moment>(moment());
    const [daysInMonth, setDaysInMonth] = useState<(number | null)[]>([]);

    useEffect(() => {
        updateCalendar(currentDate);
    }, [currentDate]);

    const updateCalendar = (date: Moment) => {
        const year = date.year();
        const month = date.month();

        // Ngày đầu tiên của tháng hiện tại
        const startOfMonth = moment(date).startOf('month');
        const endOfMonth = moment(date).endOf('month');

        // Ngày đầu tiên của tháng và thứ của ngày đầu tiên
        const startDayOfWeek = startOfMonth.day(); // Chủ Nhật là 0, Thứ Hai là 1

        // Điều chỉnh ngày đầu tiên của tháng sao cho lịch bắt đầu từ thứ Hai
        const startDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

        // Số ngày trong tháng hiện tại
        const totalDaysInMonth = date.daysInMonth();

        // Tạo ngày của tháng trước để điền vào các ô trống đầu tháng
        const daysInPrevMonth = Array.from(
            { length: startDay },
            (_, index) => {
                return startOfMonth.clone().subtract(1, 'month').endOf('month').date() - startDay + index + 1;
            }
        );

        // Tạo ngày của tháng hiện tại
        const daysOfMonth = Array.from(
            { length: totalDaysInMonth },
            (_, index) => index + 1
        );

        // Ngày của tháng sau để điền vào các ô trống cuối tháng
        const endDayOfWeek = endOfMonth.day();
        const daysInNextMonth = Array.from(
            { length: (7 - endDayOfWeek) % 7 },
            (_, index) => index + 1
        );

        // Kết hợp ngày của tháng trước, ngày của tháng hiện tại và ngày của tháng sau
        const daysArray = [
            ...daysInPrevMonth,
            ...daysOfMonth,
            ...daysInNextMonth
        ];

        setDaysInMonth(daysArray);
    };

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'month'));
    };

    const monthYear = currentDate.format('MMMM YYYY');

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button className="prev-month" onClick={handlePrevMonth}>
                    &lt;
                </button>
                <span className="month-year">{monthYear}</span>
                <button className="next-month" onClick={handleNextMonth}>
                    &gt;
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        {daysOfWeek.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array(Math.ceil(daysInMonth.length / 7))
                        .fill(null)
                        .map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {daysInMonth
                                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                                    .map((day, dayIndex) => (
                                        <td key={dayIndex} className={day === null ? 'empty' : ''}>
                                            {day !== null ? day : ''}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
