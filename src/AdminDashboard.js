import React, { useEffect, useState } from 'react';
import BookingCalendar from './NewBookingCalendar';
import { supabase } from './supabaseClient';

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Pending'); // New state for active tab
  const [manualBooking, setManualBooking] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    numberofguests: 1,
    message: '',
  });

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select('id, name, email, checkin, checkout, numberofguests, message, created_at, status')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setInquiries(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleManualBookingChange = (e) => {
    const { name, value } = e.target;
    setManualBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleManualBookingSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('inquiries')
      .insert([{ ...manualBooking, status: 'Pending' }]);

    if (error) {
      console.error('Error adding manual booking:', error);
      alert('Error adding manual booking: ' + error.message);
    } else {
      fetchInquiries(); // Refresh inquiries after manual submission
      setManualBooking({
        name: '',
        email: '',
        checkin: '',
        checkout: '',
        numberofguests: 1,
        message: '',
      });
      alert('Manual booking added successfully!');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const originalInquiries = [...inquiries];
    const updatedInquiries = inquiries.map(inq => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updatedInquiries);

    const { error } = await supabase
      .from('inquiries')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      alert('Error updating status: ' + error.message);
      setInquiries(originalInquiries); // Revert on error
    } else {
      // alert('Status updated successfully!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const originalInquiries = [...inquiries];
      const updatedInquiries = inquiries.filter(inq => inq.id !== id);
      setInquiries(updatedInquiries);

      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting inquiry from Supabase:', error); // More specific log
        alert('Error deleting inquiry: ' + error.message + '. Check console for details.'); // Inform user to check console
        setInquiries(originalInquiries); // Revert on error
      } else {
        console.log('Inquiry deleted successfully from Supabase.'); // Confirm success
      }
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Check-in", "Check-out", "Guests", "Message", "Submitted At", "Status"];
    const rows = inquiries.map(inquiry => [
      inquiry.id,
      inquiry.name,
      inquiry.email,
      inquiry.checkin,
      inquiry.checkout,
      inquiry.numberofguests,
      inquiry.message,
      new Date(inquiry.created_at).toLocaleString(),
      inquiry.status || 'Pending'
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inquiries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-stone-700">Loading inquiries...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  const filteredInquiries = inquiries.filter(inquiry => inquiry.status === activeTab);

  return (
    <div className="min-h-screen bg-stone-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-stone-800 mb-8 font-serif">CRM Dashboard</h2>
        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Pending' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-stone-700 hover:bg-gray-300'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('Accepted')}
            className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Accepted' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-stone-700 hover:bg-gray-300'}`}
          >
            Accepted
          </button>
          <button
            onClick={() => setActiveTab('Did Not Proceed')}
            className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'Did Not Proceed' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-stone-700 hover:bg-gray-300'}`}
          >
            Did Not Proceed
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-stone-800 mb-4">Manual Booking Input</h3>
            <form onSubmit={handleManualBookingSubmit} className="space-y-4">
              <div>
                <label htmlFor="manualName" className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input type="text" id="manualName" name="name" value={manualBooking.name} onChange={handleManualBookingChange} className="w-full px-3 py-2 border border-stone-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="manualEmail" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input type="email" id="manualEmail" name="email" value={manualBooking.email} onChange={handleManualBookingChange} className="w-full px-3 py-2 border border-stone-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="manualCheckin" className="block text-sm font-medium text-stone-700 mb-1">Check-in</label>
                <input type="date" id="manualCheckin" name="checkin" value={manualBooking.checkin} onChange={handleManualBookingChange} className="w-full px-3 py-2 border border-stone-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="manualCheckout" className="block text-sm font-medium text-stone-700 mb-1">Check-out</label>
                <input type="date" id="manualCheckout" name="checkout" value={manualBooking.checkout} onChange={handleManualBookingChange} className="w-full px-3 py-2 border border-stone-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="manualGuests" className="block text-sm font-medium text-stone-700 mb-1">Number of Guests</label>
                <input type="number" id="manualGuests" name="numberofguests" value={manualBooking.numberofguests} onChange={handleManualBookingChange} className="w-full px-3 py-2 border border-stone-300 rounded-md" min="1" required />
              </div>
              <div>
                <label htmlFor="manualMessage" className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                <textarea id="manualMessage" name="message" value={manualBooking.message} onChange={handleManualBookingChange} rows="3" className="w-full px-3 py-2 border border-stone-300 rounded-md"></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-lg">Add Manual Booking</button>
            </form>
          </div>
          <BookingCalendar allInquiries={inquiries} />
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={exportToCSV}
            className="bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-lg"
          >
            Export to CSV
          </button>
        </div>
        {filteredInquiries.length === 0 ? (
          <p className="text-center text-stone-600">No inquiries found in this section.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-stone-200 rounded-lg">
              <thead>
                <tr className="bg-stone-200 text-stone-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Check-in</th>
                  <th className="py-3 px-6 text-left">Check-out</th>
                  <th className="py-3 px-6 text-left">Guests</th>
                  <th className="py-3 px-6 text-left">Message</th>
                  <th className="py-3 px-6 text-left">Submitted At</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-stone-600 text-sm font-light">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-stone-200 hover:bg-stone-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{inquiry.name}</td>
                    <td className="py-3 px-6 text-left">{inquiry.email}</td>
                    <td className="py-3 px-6 text-left">{inquiry.checkin}</td>
                    <td className="py-3 px-6 text-left">{inquiry.checkout}</td>
                    <td className="py-3 px-6 text-left">{inquiry.numberofguests}</td>
                    <td className="py-3 px-6 text-left">{inquiry.message}</td>
                    <td className="py-3 px-6 text-left">{new Date(inquiry.created_at).toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">
                      <select
                        value={inquiry.status || 'Pending'}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`p-2 border rounded ${
                          inquiry.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                          inquiry.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          inquiry.status === 'Did Not Proceed' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Did Not Proceed">Did Not Proceed</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
