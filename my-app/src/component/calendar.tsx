import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/vi';
import { prototype } from 'events';

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

        // Ngày đầu tiên và cuối cùng của tháng hiện tại
        const startOfMonth = moment(date).startOf('month');
        const endOfMonth = moment(date).endOf('month');

        // Ngày đầu tiên trong tuần của tháng hiện tại
        const startDayOfWeek = startOfMonth.day(); // Chủ nhật là 0, thứ 2 là 1
        const adjustedStartDay = (startDayOfWeek + 6) % 7; // Điều chỉnh để bắt đầu từ thứ 2

        const totalDaysInMonth = date.daysInMonth();

        // Ngày cuối cùng của tháng trước
        const lastDayOfPrevMonth = startOfMonth.clone().subtract(1, 'day').date();

        // Tạo mảng các ngày của tháng trước
        const daysInPrevMonth = Array.from(
            { length: adjustedStartDay },
            (_, index) => lastDayOfPrevMonth - (adjustedStartDay - 1) + index
        );

        // Tạo mảng các ngày của tháng hiện tại
        const daysOfMonth = Array.from(
            { length: totalDaysInMonth },
            (_, index) => index + 1
        );

        // Ngày cuối cùng của tháng sau
        const endDayOfWeek = endOfMonth.day();
        const daysInNextMonth = Array.from(
            { length: (7 - endDayOfWeek) % 7 },
            (_, index) => index + 1
        );

        // Kết hợp các ngày thành một mảng
        const daysArray = [
            ...daysInPrevMonth,
            ...daysOfMonth,
            ...daysInNextMonth,
        ];

        setDaysInMonth(daysArray);
    };

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'month'));
    };
    moment.locale('en');
    const currentDay = moment();
    const formattedDate = currentDay.format('DD MMM YYYY');
    const titleStype: React.CSSProperties ={
        color : '#FF7506',
        fontSize: '16px',
        fontWeight: '700',
        padding: '10px',
        margin: '0',
        lineHeight: '21.82px',
    }
    const headerStyle:React.CSSProperties ={
        borderBottom: '1px solid #DCDDFD',
        borderWidth : '90%',
}
    return (
        <div className='container'>
        <div className="calendar">
            <div className="calendar-header" style={headerStyle}>
                <button className="prev-month" onClick={handlePrevMonth}>
                    &lt;
                </button>
                <span className="month-year" style={titleStype}>{formattedDate}</span>
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
                    {Array(5)
                        .fill(null)
                        .map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {daysInMonth
                                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                                    .map((day, dayIndex) => {
                                        const isToday = day === currentDate.date() && currentDate.month() === moment().month() && currentDate.year() === moment().year();
                                        const cellStyle: React.CSSProperties = {
                                            padding: '10px',
                                            textAlign: 'center' as 'center',
                                            backgroundColor: isToday ? '#FF7506' : day === null ? '#f0f0f0' : 'transparent',
                                            color: isToday ? 'white' : 'black',
                                            fontWeight: isToday ? 'bold' : 'normal',
                                            borderRadius: isToday ? '5px' : '0',
                                        };
                                        return (
                                            <td key={dayIndex} style={cellStyle}>
                                                {day !== null ? day : ''}
                                            </td>
                                        );
                                    })}
                            </tr>
                        ))}
                </tbody>


            </table>
        </div>
        </div>
    );
};

export default Calendar;
