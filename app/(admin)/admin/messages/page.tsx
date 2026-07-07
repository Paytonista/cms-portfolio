import type { Metadata } from "next";
import { Mail, Star, Archive, Trash2, Reply } from "lucide-react";

export const metadata: Metadata = {
  title: "Messages",
  description: "Manage client messages and inquiries.",
};

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Website Redesign Project",
    preview: "Hi, I'm interested in discussing a complete website redesign for my e-commerce business...",
    time: "2h ago",
    starred: true,
    unread: true,
  },
  {
    id: 2,
    sender: "Michael Chen",
    email: "michael@tech.com",
    subject: "Re: Portfolio Review",
    preview: "Thanks for sharing your portfolio. Your work is impressive and I'd like to discuss potential collaboration...",
    time: "5h ago",
    starred: false,
    unread: true,
  },
  {
    id: 3,
    sender: "Emily Rodriguez",
    email: "emily@creative.io",
    subject: "Freelance Opportunity",
    preview: "We have an exciting opportunity for a freelance developer to join our team for a 3-month project...",
    time: "1d ago",
    starred: true,
    unread: false,
  },
  {
    id: 4,
    sender: "David Park",
    email: "david@startup.co",
    subject: "App Development Quote",
    preview: "Could you provide a quote for developing a mobile app with the following specifications...",
    time: "2d ago",
    starred: false,
    unread: false,
  },
  {
    id: 5,
    sender: "Lisa Thompson",
    email: "lisa@agency.com",
    subject: "Partnership Proposal",
    preview: "We're looking to establish partnerships with talented developers. Would you be interested in exploring this...",
    time: "3d ago",
    starred: false,
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div>
      <div className="flex">
        <div className="w-1/3 border border-gray-300 pr-4">
          <ul className="divide-y divide-gray-300">
            {messages.map((message) => (
              <li key={message.id} className={`flex items-center justify-between p-4 ${message.unread ? "bg-gray-100" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-semibold">{message.sender}</span>
                    <span className="text-sm text-gray-600">{message.subject}</span>
                    <span className="text-xs text-gray-500">{message.preview}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
        </div>
        <div className="w-2/3 border border-gray-300 pr-4">
          s
        </div>
      
      </div>
      
    </div>
  );
} 

        

