import { useState } from 'react';

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

type TicketDetailsProps = {
  ticket: Ticket;
  onStatusChange: (id: string, status: 'new' | 'in progress' | 'resolved') => void;
  onResponse: (id: string, message: string) => void;
};

const TicketDetails = ({ ticket, onStatusChange, onResponse }: TicketDetailsProps) => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleResponse = () => {
    if (!responseMessage.trim()) return;
    onResponse(ticket._id, responseMessage);
    setResponseMessage('');
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
      <p className="mb-2">
        <strong>Name:</strong> {ticket.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {ticket.email}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {ticket.description}
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {ticket.status}
      </p>
      <div className="mb-4">
        <button
          onClick={() => onStatusChange(ticket._id, 'new')}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 shadow transition duration-300 ${
            ticket.status === 'new' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={ticket.status === 'new'}
        >
          New
        </button>
        <button
          onClick={() => onStatusChange(ticket._id, 'in progress')}
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 shadow transition duration-300 ${
            ticket.status === 'in progress' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={ticket.status === 'in progress'}
        >
          In Progress
        </button>
        <button
          onClick={() => onStatusChange(ticket._id, 'resolved')}
          className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ${
            ticket.status === 'resolved' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={ticket.status === 'resolved'}
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
          onClick={handleResponse}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
        >
          Send Response
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Responses</h3>
        <ul className="space-y-2">
          {ticket.responses.map((response, index) => (
            <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p>{response.message}</p>
              <p className="text-gray-500 text-sm">
                {new Date(response.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketDetails;
