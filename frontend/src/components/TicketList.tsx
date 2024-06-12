import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../utils/apiConfig';
import TicketDetails from './TicketDetails';

type Ticket = {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: 'new' | 'in progress' | 'resolved';
  responses: {
    message: string;
    date: string;
  }[];
};

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const ticketDetailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch(`${API_BASE_URL}/tickets`);
      const data = await response.json();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const handleSelectTicket = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
    const data = await response.json();
    setSelectedTicket(data);
    ticketDetailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStatusChange = async (
    id: string,
    status: 'new' | 'in progress' | 'resolved'
  ) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    setSelectedTicket(data);
    setTickets(tickets.map((ticket) => (ticket._id === id ? data : ticket)));
  };

  const handleResponse = async (id: string, message: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setSelectedTicket(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Support Tickets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-4">
              {tickets.map((ticket) => (
                <li
                  key={ticket._id}
                  onClick={() => handleSelectTicket(ticket._id)}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition duration-300"
                >
                  <p className="text-lg font-semibold">{ticket.name}</p>
                  <p className="text-gray-600">{ticket.email}</p>
                  <p
                    className={`text-sm font-medium ${
                      ticket.status === 'new'
                        ? 'text-blue-500'
                        : ticket.status === 'in progress'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {ticket.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {selectedTicket && (
            <div ref={ticketDetailsRef}>
              <TicketDetails
                ticket={selectedTicket}
                onStatusChange={handleStatusChange}
                onResponse={handleResponse}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketList;
