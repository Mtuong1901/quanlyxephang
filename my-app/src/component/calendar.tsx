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

        const startOfMonth = moment(date).startOf('month');
        const endOfMonth = moment(date).endOf('month');

        const startDayOfWeek = startOfMonth.day();
        const adjustedStartDay = (startDayOfWeek + 6) % 7;

        const totalDaysInMonth = date.daysInMonth();

        const lastDayOfPrevMonth = startOfMonth.clone().subtract(1, 'day').date();

        const daysInPrevMonth = Array.from(
            { length: adjustedStartDay },
            (_, index) => lastDayOfPrevMonth - (adjustedStartDay - 1) + index
        );

        const daysOfMonth = Array.from(
            { length: totalDaysInMonth },
            (_, index) => index + 1
        );

        const endDayOfWeek = endOfMonth.day();
        const daysInNextMonth = Array.from(
            { length: (7 - endDayOfWeek) % 7 },
            (_, index) => index + 1
        );

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
    return (
        <div className='calendar-container bg-white w-[353px] h-[256px] mt-[14px] ml-[24px] rounded-xl shadow-lg'>
        <div className="calendar w-[336px] h-[236px] p-[13px]">
            <div className="calendar-header flex items-center border-b-[1px] justify-around border-[#DCDDFD] h-[40px]">
                <button className="prev-month w-[40px] h-[40px] text-[#FF7506] font-bold" onClick={handlePrevMonth}>
                    &lt;
                </button>
                <span className="month-year text-[#FF7506] text-[16px] font-bold">{formattedDate}</span>
                <button className="next-month w-[40px] h-[40px] text-[#FF7506] font-bold" onClick={handleNextMonth}>
                    &gt;
                </button>
            </div>
            <table className='calendar-table w-full'>
                <thead className='text-[#FF9138] font-bold'>
                    <tr>
                        {daysOfWeek.map((day, index) => (
                            <th className='w-[36px] h-[36px]' key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array(5)
                        .fill(null)
                        .map((_, weekIndex) => (
                            <tr className='w-[36px] h-[32px]' key={weekIndex}>
                                {daysInMonth
                                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                                    .map((day, dayIndex) => {
                                        const isToday = day === currentDate.date() && currentDate.month() === moment().month() && currentDate.year() === moment().year();
                                        const cellStyle: React.CSSProperties = {
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
