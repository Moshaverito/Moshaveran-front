import { clsx } from "clsx";
import { MessageCircle, Phone, Video } from "lucide-react";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "approved":
      return "text-green-600 bg-green-100";
    case "ongoing":
      return "text-blue-600 bg-blue-100";
    case "completed":
      return "text-purple-600 bg-purple-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    case "ignored":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const getSessionTypeColor = (type) => {
  switch (type) {
    case "video":
      return "text-green-600 bg-green-100";
    case "phone":
      return "text-blue-600 bg-blue-100";
    case "chat":
      return "text-teal-600 bg-teal-100";
    default:
      return "text-teal-600 bg-teal-100";
  }
};

export const getSessionTypeIcon = (type) => {
  switch (type) {
    case "video":
      return React.createElement(Video, { className: "w-4 h-4" });
    case "phone":
      return React.createElement(Phone, { className: "w-4 h-4" });
    case "chat":
      return React.createElement(MessageCircle, { className: "w-4 h-4" });
    default:
      return React.createElement(MessageCircle, { className: "w-4 h-4" });
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "در انتظار";
    case "approved":
      return "تأیید شده";
    case "ongoing":
      return "در حال انجام";
    case "completed":
      return "تکمیل شده";
    case "cancelled":
      return "لغو شده";
    case "ignored":
      return "نادیده گرفته شده";
    default:
      return status;
  }
};

export const formatDate = (dateTimeString) => {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("fa-IR");
};

export const formatTime = (dateTimeString) => {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  return (
    date.toLocaleDateString("fa-IR") +
    " - " +
    date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
  );
};
