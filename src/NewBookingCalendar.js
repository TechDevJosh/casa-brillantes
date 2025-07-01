
import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { startOfDay } from 'date-fns';

const NewBookingCalendar = ({ allInquiries, isPublicView = false }) => {
  const acceptedDates = allInquiries
    .filter(inquiry => inquiry.status === 'Accepted')
    .flatMap(inquiry => {
      const start = startOfDay(new Date(inquiry.checkin));
      const end = startOfDay(new Date(inquiry.checkout));
      const dates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    });

  const pendingDates = allInquiries
    .filter(inquiry => inquiry.status === 'Pending')
    .flatMap(inquiry => {
      const start = startOfDay(new Date(inquiry.checkin));
      const end = startOfDay(new Date(inquiry.checkout));
      const dates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    });

  const modifiers = {
    accepted: acceptedDates,
    ...(isPublicView ? {} : { pending: pendingDates }), // Only add pending modifier if not public view
  };

  const modifiersStyles = {
    accepted: {
      color: 'white',
      backgroundColor: '#86efac',
    },
    ...(isPublicView ? {} : { // Only add pending style if not public view
      pending: {
        color: 'white',
        backgroundColor: '#fde047',
      },
    }),
  };

  const footer = (
    <p>
      {isPublicView
        ? 'Booked dates are not available.'
        : 'You can see all the booked dates.'}
    </p>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-stone-800 mb-4">Availability Calendar</h3>
      <DayPicker
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={isPublicView ? acceptedDates : undefined} // Only disable accepted dates for public view
        footer={footer}
      />
    </div>
  );
};

export default NewBookingCalendar;
