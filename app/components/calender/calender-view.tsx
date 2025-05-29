"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { useCRM } from "../../debajyoti/tasks/crmProvider";
import { EventForm } from "./event-form";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: "meeting" | "task" | "call" | "other";
  attendees: string[];
  location?: string;
  relatedTo?: {
    type: "client" | "lead" | "task";
    id: string;
    name: string;
  };
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Client Meeting - Innovate Inc",
      description: "Quarterly business review and strategy discussion",
      date: "2025-01-15",
      time: "10:00",
      duration: 60,
      type: "meeting",
      attendees: ["Robert Chen", "Sarah Wilson"],
      location: "Conference Room A",
      relatedTo: { type: "client", id: "1", name: "Innovate Inc" },
    },
    {
      id: "2",
      title: "Task Review Meeting",
      description: "Review Q4 financial reports progress",
      date: "2025-01-16",
      time: "14:00",
      duration: 30,
      type: "meeting",
      attendees: ["John Doe", "Jane Smith"],
      relatedTo: { type: "task", id: "1", name: "Review Q4 Financial Reports" },
    },
  ]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const { tasks, clients, leads } = useCRM();

  const addEvent = (
    event: Omit<CalendarEvent, "id"> | Partial<CalendarEvent>
  ) => {
    // Ensure all required fields are present
    if (
      event &&
      typeof event.title === "string" &&
      typeof event.description === "string" &&
      typeof event.date === "string" &&
      typeof event.time === "string" &&
      typeof event.duration === "number" &&
      typeof event.type === "string" &&
      Array.isArray(event.attendees)
    ) {
      const newEvent: CalendarEvent = {
        ...(event as Omit<CalendarEvent, "id">),
        id: Date.now().toString(),
      };
      setEvents((prev) => [...prev, newEvent]);
    } else {
      // Optionally handle invalid event data here
      console.error("Invalid event data", event);
    }
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateString);
  };

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    const colors = {
      meeting: "bg-blue-100 text-blue-800 border-blue-200",
      task: "bg-green-100 text-green-800 border-green-200",
      call: "bg-yellow-100 text-yellow-800 border-yellow-200",
      other: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[type];
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleFormClose = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-2xl  shadow-sm border border-gray-100 font-helvetica overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-[#D3FF61] px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth("prev")}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth("next")}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1"></div>
            <Button
              onClick={() => setShowEventForm(true)}
              className="bg-[#1B2409] hover:bg-[#C5FF4A] text-[#C5FF4A]"
            >
              <Plus size={16} className="mr-2" />
              Add Event
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentDate).map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isToday =
              date && date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-[60px] p-2 border border-gray-100 rounded-lg ${
                  date ? "bg-white hover:bg-gray-50" : "bg-gray-50"
                } ${isToday ? "ring-2 ring-[#D3FF61]" : ""}`}
              >
                {date && (
                  <>
                    <div
                      className={`text-sm font-medium mb-2 ${
                        isToday ? "text-black" : "text-gray-700"
                      }`}
                    >
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          <div className="font-medium truncate">
                            {event.title}
                          </div>
                          <div className="flex items-center gap-1 text-xs opacity-75">
                            <Clock size={10} />
                            {event.time}
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          event={selectedEvent}
          onClose={handleFormClose}
          onSave={
            selectedEvent
              ? (updates) => updateEvent(selectedEvent.id, updates)
              : addEvent
          }
          onDelete={
            selectedEvent ? () => deleteEvent(selectedEvent.id) : undefined
          }
          clients={clients}
          leads={leads}
          tasks={tasks}
        />
      )}
    </div>
  );
}
