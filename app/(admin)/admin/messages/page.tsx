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
    <div>

        
    </div>
    
  );
}
