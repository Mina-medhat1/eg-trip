import React, { useState } from 'react';
import { DayItinerary } from '../types';
import { ChevronRight, ChevronDown, MapPin, Image, Layers } from 'lucide-react';

interface LayersPanelProps {
    itinerary: DayItinerary[];
    onLayerClick: (dayIndex: number, activityIndex?: number) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ itinerary, onLayerClick }) => {
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>(
        itinerary.reduce((acc, day) => ({ ...acc, [day.dayNumber]: true }), {})
    );

    const toggleDay = (dayNumber: number) => {
        setExpandedDays(prev => ({
            ...prev,
            [dayNumber]: !prev[dayNumber]
        }));
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700 h-fit sticky top-24 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-display font-bold text-navy dark:text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-wider opacity-70">
                <Layers className="w-4 h-4" /> Layers
            </h3>

            <div className="space-y-1">
                {itinerary.map((day, dayIndex) => (
                    <div key={day.dayNumber} className="select-none">
                        {/* Day Layer */}
                        <div
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer group transition-colors"
                            onClick={() => toggleDay(day.dayNumber)}
                        >
                            <button
                                className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDay(day.dayNumber);
                                }}
                            >
                                {expandedDays[day.dayNumber] ? (
                                    <ChevronDown className="w-3 h-3" />
                                ) : (
                                    <ChevronRight className="w-3 h-3" />
                                )}
                            </button>
                            <MapPin className="w-3 h-3 text-orange" />
                            <span
                                className="text-xs font-bold text-navy dark:text-gray-200 truncate"
                                onClick={() => onLayerClick(dayIndex)}
                            >
                                Day {day.dayNumber}
                            </span>
                        </div>

                        {/* Activity Layers */}
                        {expandedDays[day.dayNumber] && (
                            <div className="ml-4 pl-2 border-l border-gray-100 dark:border-slate-700 space-y-0.5 mt-1">
                                {day.schedule.map((act, actIndex) => (
                                    <div
                                        key={`${day.dayNumber}-${actIndex}`}
                                        className="flex items-center gap-2 p-1.5 hover:bg-orange/5 dark:hover:bg-orange/10 hover:text-orange rounded-md cursor-pointer transition-colors group"
                                        onClick={() => onLayerClick(dayIndex, actIndex)}
                                    >
                                        <Image className="w-3 h-3 text-gray-400 group-hover:text-orange" />
                                        <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-orange truncate">
                                            {act.activity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
