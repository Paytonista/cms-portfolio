"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Mail, Star, Archive, Trash2, Reply } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  unread: boolean;
}

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
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div>
      <div className="flex">
        <div className="w-1/3 border border-gray-300 ">
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <span className="font-semibold">Inbox</span>
            <div className="flex gap-2 text-xs">
               2 Unread
            </div>
          </div>
  
          <ul className="divide-y divide-gray-300">
            {messages.map((message) => (
              <li key={message.id} onClick={() => setSelectedMsg(message)} className={`flex items-center justify-between p-4 ${message.unread ? "bg-gray-100" : ""}`}>
                
                  <div className="flex flex-col">
                    <span className="font-semibold">{message.sender}</span>
                    <span className="text-sm text-gray-600">{message.subject}</span>
                    
                  </div>

                  <div className="text-gray-500  flex ">
                    <span className="text-xs">{message.time}</span>
                    <Trash2 className="w-4 h-4 ml-2 cursor-pointer hover:text-red-500" />
                  </div>
                
              </li>
            ))}
          </ul>
          
        </div>
        <div className="w-2/3 border border-gray-300 pr-4">
          {selectedMsg ? (
            <div className="p-6">
              
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold">{selectedMsg.subject}</h2>
                <Star className="w-5 h-5" />
              </div>

             
              <div className="text-sm text-slate-600 mb-1">{selectedMsg.sender}</div>
              <div className="text-xs text-slate-400 mb-4">{selectedMsg.email}</div>

              
              <div className="text-xs text-slate-400 mb-6">{selectedMsg.time}</div>

              {/* Divider */}
              <hr className="mb-6" />

              {/* Full message */}
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedMsg.preview}</p>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Select a message to view its contents.
            </div>
          )}
        </div>
      
      </div>
      
    </div>
  );
}

