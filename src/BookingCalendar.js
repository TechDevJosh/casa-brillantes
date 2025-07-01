import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { supabase } from './supabaseClient';

const BookingCalendar = ({ allInquiries, isPublicView = false }) => {
  const [bookedDatesInfo, setBookedDatesInfo] = useState({});

  useEffect(() => {
    const processInquiries = () => {
      const datesMap = {};

      allInquiries.forEach(inquiry => {
        const start = new Date(inquiry.checkin);
        const end = new Date(inquiry.checkout);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateString = d.toDateString();
          if (!datesMap[dateString]) {
            datesMap[dateString] = { pending: 0, accepted: 0 };
          }
          if (inquiry.status === 'Accepted') {
            datesMap[dateString].accepted++;
          } else if (inquiry.status === 'Pending') {
            datesMap[dateString].pending++;
          }
        }
      });
      setBookedDatesInfo(datesMap);
    };

    processInquiries();
  }, [allInquiries]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const info = bookedDatesInfo[dateString];
      if (info) {
        if (info.accepted > 0) {
          return 'bg-green-100'; // Light green for accepted
        } else if (info.pending > 0 && !isPublicView) {
          return 'bg-yellow-100'; // Light yellow for pending (only in admin view)
        }
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const info = bookedDatesInfo[dateString];
      if (info) {
        return (
          <div className="flex flex-col items-center justify-center h-full">
            {info.accepted > 0 && (
              <div className="text-green-600 text-xs font-bold">{info.accepted} Accepted</div>
            )}
            {info.pending > 0 && !isPublicView && (
              <div className="text-yellow-600 text-xs font-bold">{info.pending} Pending</div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-stone-800 mb-4">Booked Dates</h3>
      <Calendar
        tileClassName={tileClassName}
        value={new Date()}
      />
    </div>
  );
};

export default BookingCalendar;
