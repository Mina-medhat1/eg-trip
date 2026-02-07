import React, { useState, useEffect } from "react";
import { TripPlan, DayItinerary } from "../types";
import { Clock, MapPin, Trash2, Edit2, Plus, Download, Share2, Calendar, DollarSign, ArrowRight, Plane, GripVertical } from "lucide-react";
import jsPDF from "jspdf";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { LayersPanel } from "../components/LayersPanel";

interface TripResultProps {
  plan: TripPlan;
}

export const TripResult: React.FC<TripResultProps> = ({ plan }) => {
  const [itinerary, setItinerary] = useState<DayItinerary[]>(plan.days);
  const [tasks, setTasks] = useState<string[]>(plan.todoList || []);
  const [newTask, setNewTask] = useState("");

  // Sync state if prop changes (e.g. new plan generated)
  useEffect(() => {
    setItinerary(plan.days);
    setTasks(plan.todoList || []);
  }, [plan]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(plan.tripTitle, 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Cost: ${plan.totalEstimatedCost}`, 20, 30);
    doc.text(plan.summary, 20, 40, { maxWidth: 170 });

    let yPos = 60;
    itinerary.forEach((day) => {
      if (yPos > 250) { doc.addPage(); yPos = 20; }
      doc.setFont("helvetica", "bold");
      doc.text(`Day ${day.dayNumber}`, 20, yPos);
      yPos += 10;

      day.schedule.forEach(activity => {
        if (yPos > 270) { doc.addPage(); yPos = 20; }
        doc.setFont("helvetica", "bold");
        doc.text(`${activity.time} - ${activity.activity}`, 25, yPos);
        yPos += 7;
        doc.setFont("helvetica", "normal");
        doc.text(activity.description, 25, yPos, { maxWidth: 160 });
        yPos += 15;
      });
      yPos += 10;
    });

    doc.save("EGTrip-Itinerary.pdf");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceDayIndex = parseInt(source.droppableId);
    const destDayIndex = parseInt(destination.droppableId);

    // Reordering within the same day
    if (sourceDayIndex === destDayIndex) {
      const day = itinerary[sourceDayIndex];
      const newSchedule = Array.from(day.schedule);
      const [reorderedItem] = newSchedule.splice(source.index, 1);
      newSchedule.splice(destination.index, 0, reorderedItem);

      const newItinerary = [...itinerary];
      newItinerary[sourceDayIndex] = { ...day, schedule: newSchedule };
      setItinerary(newItinerary);
    } else {
      // Moving between days
      const sourceDay = itinerary[sourceDayIndex];
      const destDay = itinerary[destDayIndex];

      const sourceSchedule = Array.from(sourceDay.schedule);
      const destSchedule = Array.from(destDay.schedule);

      const [movedItem] = sourceSchedule.splice(source.index, 1);
      destSchedule.splice(destination.index, 0, movedItem);

      const newItinerary = [...itinerary];
      newItinerary[sourceDayIndex] = { ...sourceDay, schedule: sourceSchedule };
      newItinerary[destDayIndex] = { ...destDay, schedule: destSchedule };
      setItinerary(newItinerary);
    }
  };

  const handleLayerClick = (dayIndex: number, activityIndex?: number) => {
    if (activityIndex !== undefined) {
      const element = document.getElementById(`activity-${dayIndex}-${activityIndex}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const element = document.getElementById(`day-${dayIndex}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-navy min-h-screen font-sans pb-20 transition-colors duration-300">

      {/* 1. HERO SECTION */}
      <div className="relative h-[50vh] w-full group overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1920&q=80"
          alt="Egypt Hero"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <span className="bg-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-lg">Your Personal Itinerary</span>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-4 leading-tight shadow-sm">{plan.tripTitle}</h1>
            <p className="text-white/80 text-lg max-w-2xl mb-6 font-light">{plan.summary}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium opacity-90">
              <span className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                <Clock className="w-4 h-4 mr-2 text-orange" /> {itinerary.length} Days
              </span>
              <span className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                <DollarSign className="w-4 h-4 mr-2 text-orange" /> {plan.totalEstimatedCost}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* 2. LEFT COLUMN: Layers Panel */}
        <div className="lg:col-span-1 hidden lg:block">
          <LayersPanel itinerary={itinerary} onLayerClick={handleLayerClick} />
        </div>

        {/* 3. CENTER COLUMN: Itinerary Timeline */}
        <div className="lg:col-span-2 space-y-8">
          <DragDropContext onDragEnd={onDragEnd}>
            {itinerary.map((day, dayIndex) => (
              <div
                key={day.dayNumber}
                id={`day-${dayIndex}`}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700 scroll-mt-24"
              >
                {/* Day Header */}
                <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 dark:border-slate-700 pb-6">
                  <span className="text-4xl font-display font-black text-orange drop-shadow-sm">Day {day.dayNumber}</span>
                  <span className="text-gray-400 font-medium text-lg">Exploration & Discovery</span>
                </div>

                {/* Timeline Items */}
                <Droppable droppableId={`${dayIndex}`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-10 relative pl-8 border-l-2 border-dashed border-gray-200 dark:border-slate-700 ml-3 min-h-[100px]"
                    >
                      {day.schedule.map((act, i) => (
                        <Draggable key={`${day.dayNumber}-${i}`} draggableId={`${day.dayNumber}-${i}`} index={i}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              id={`activity-${dayIndex}-${i}`}
                              className={`relative group ${snapshot.isDragging ? 'z-50' : ''} scroll-mt-32`}
                              style={provided.draggableProps.style}
                            >
                              {/* Timeline Dot */}
                              <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 bg-orange shadow-md group-hover:scale-125 transition-transform"></div>

                              {/* Activity Card */}
                              <div className={`bg-white dark:bg-slate-700/50 hover:bg-orange/5 dark:hover:bg-orange/5 transition-all rounded-2xl p-4 border border-gray-100 dark:border-slate-600 hover:border-orange/20 dark:hover:border-orange/20 shadow-sm hover:shadow-md group ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-orange rotate-2 scale-105' : ''}`}>
                                <div className="flex flex-col sm:flex-row gap-5">
                                  {/* Drag Handle */}
                                  <div {...provided.dragHandleProps} className="absolute right-2 top-2 p-2 text-gray-300 hover:text-orange cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-5 h-5" />
                                  </div>

                                  {/* Image */}
                                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                    <img
                                      src={`https://source.unsplash.com/400x300/?${act.imageKeyword || act.activity.split(' ')[0]},egypt`}
                                      alt={act.activity}
                                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568289870104-51c6c039364b?w=400&q=80';
                                      }}
                                    />
                                  </div>

                                  {/* Details */}
                                  <div className="flex-1 pr-8">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-navy dark:text-white text-xl leading-tight">{act.activity}</h4>
                                      <div className="flex gap-2">
                                        <button className="text-gray-400 hover:text-orange transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-3">
                                      <span className="text-xs font-bold text-orange bg-orange/10 dark:bg-orange/20 px-2 py-0.5 rounded border border-orange/10 dark:border-orange/20">{act.time}</span>
                                      <span className="text-xs font-medium text-gray-400 dark:text-gray-400">{act.cost}</span>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{act.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {/* Day Footer Tips */}
                <div className="mt-8 bg-beige dark:bg-slate-900 rounded-xl p-4 flex gap-3 border border-orange/10 dark:border-slate-700">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-full h-fit shadow-sm">
                    <MapPin className="w-4 h-4 text-orange" />
                  </div>
                  <div className="text-sm text-navy/80 dark:text-gray-300 italic">
                    <span className="font-bold">Travel Tip:</span> {day.tips}
                  </div>
                </div>
              </div>
            ))}
          </DragDropContext>
        </div>

        {/* 4. RIGHT COLUMN: Sidebar (Journal Style) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Summary / Actions Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700 sticky top-24">
            <h3 className="font-display font-bold text-navy dark:text-white text-xl mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-orange" /> Trip Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleExportPDF}
                className="w-full bg-navy dark:bg-slate-900 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-navy/90 dark:hover:bg-slate-950 transition-all shadow-lg shadow-navy/20"
              >
                <Download className="w-4 h-4" /> Download Itinerary PDF
              </button>
              <button className="w-full bg-orange/10 dark:bg-orange/20 text-orange py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange hover:text-white transition-all">
                <Share2 className="w-4 h-4" /> Share with Friends
              </button>
            </div>

            <hr className="my-6 border-gray-100 dark:border-slate-700" />

            <h3 className="font-display font-bold text-navy dark:text-white text-xl mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange" /> Packing & Tasks
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add item..."
                className="flex-1 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange dark:text-white transition-colors"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <button onClick={handleAddTask} className="bg-orange text-white rounded-lg p-2 hover:bg-orange-hover shadow-md shadow-orange/20">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-700/50">
                <p className="text-gray-400 text-sm">Your list is empty.</p>
              </div>
            ) : (
              <ul className="space-y-2 mb-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task, i) => (
                  <li key={i} className="flex items-center gap-3 group p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-orange rounded border-gray-300 focus:ring-orange cursor-pointer" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{task}</span>
                    <button onClick={() => setTasks(tasks.filter((_, idx) => idx !== i))} className="ml-auto opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="text-xs text-center text-gray-400 mt-4">
              Don't forget your passport! 🛂
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};