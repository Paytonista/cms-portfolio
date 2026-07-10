"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Mail, Star, Archive, Trash2, Reply } from "lucide-react";


interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  message: string;
  starred: boolean;
  unread: boolean;
  time: string;

}


export default function MessagesPage() {
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unread, setUnread] = useState(0);
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/messages?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) =>  {
        setMessages(
        data.messages.map((msg: any) => ({...msg})));
        setUnread(data.unread);
        });
  }, [page]);
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
               {unread} Unread
            </div>
          </div>
  
          <ul className="divide-y divide-gray-300">
            {messages.map((message) => (
              <li key={message.id} onClick={() => setSelectedMsg(message)} className={`flex items-center justify-between p-4 ${message.unread ? "bg-gray-200" : ""}`}>
                
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

        
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedMsg.message}</p>
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

