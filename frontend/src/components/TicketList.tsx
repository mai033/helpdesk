import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/apiConfig'; 

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
  const [responseMessage, setResponseMessage] = useState('');

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
    setResponseMessage('');
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

  const handleResponse = async (id: string) => {
    if (!responseMessage.trim()) return;

    const response = await fetch(`${API_BASE_URL}/tickets/${id}/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: responseMessage }),
    });
    const data = await response.json();
    setSelectedTicket(data);
    setResponseMessage('');
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
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
              <p className="mb-2">
                <strong>Name:</strong> {selectedTicket.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {selectedTicket.email}
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {selectedTicket.description}
              </p>
              <p className="mb-4">
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <div className="mb-4">
                <button
                  onClick={() =>
                    handleStatusChange(selectedTicket._id, 'in progress')
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 shadow transition duration-300"
                >
                  In Progress
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedTicket._id, 'resolved')
                  }
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
                >
                  Resolved
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Respond to Ticket</h3>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Type your response here..."
                ></textarea>
                <button
                  onClick={() => handleResponse(selectedTicket._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
                >
                  Send Response
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Responses</h3>
                <ul className="space-y-2">
                  {selectedTicket.responses &&
                    selectedTicket.responses.map((response, index) => (
                      <li
                        key={index}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <p>{response.message}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(response.date).toLocaleString()}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketList;
