import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Page, SymptomLog } from '../types';
import { Header } from '../components/Header';

const symptomsList = ["Toothache", "Gum Swelling", "Jaw Pain", "Bad Breath", "Bleeding Gums", "Sensitivity"];
const symptomDetails: { [key: string]: { icon: string } } = {
    "Toothache": { icon: "sick" },
    "Gum Swelling": { icon: "local_hospital" },
    "Jaw Pain": { icon: "sentiment_very_dissatisfied" },
    "Bad Breath": { icon: "air" },
    "Bleeding Gums": { icon: "bloodtype" },
    "Sensitivity": { icon: "bolt" },
};

// Helper to format a Date object to 'YYYY-MM-DD' in local time
const toYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const SeveritySelector: React.FC<{ value: number; onChange: (value: number) => void; }> = ({ value, onChange }) => {
    return (
        <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer severity-gradient-slider"
        />
    );
};

const LogFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (log: SymptomLog) => void;
    onDeleteLog: (logId: string) => void;
    logToEdit: SymptomLog | null;
}> = ({ isOpen, onClose, onSave, onDeleteLog, logToEdit }) => {
    const [date, setDate] = useState(toYYYYMMDD(new Date()));
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [severity, setSeverity] = useState(5);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (logToEdit) {
            setDate(logToEdit.date);
            setSelectedSymptoms(logToEdit.symptoms);
            setSeverity(logToEdit.severity);
            setNotes(logToEdit.notes || '');
        } else {
            setDate(toYYYYMMDD(new Date()));
            setSelectedSymptoms([]);
            setSeverity(5);
            setNotes('');
        }
    }, [logToEdit, isOpen]);

    const handleSave = () => {
        if (logToEdit && selectedSymptoms.length === 0) {
            onDeleteLog(logToEdit.id);
            return;
        }

        if (selectedSymptoms.length === 0) {
            alert("Please select at least one symptom.");
            return;
        }
        onSave({
            id: logToEdit ? logToEdit.id : new Date().toISOString(),
            date,
            symptoms: selectedSymptoms,
            severity,
            notes,
        });
    };

    const handleSymptomToggle = (symptom: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-lg bg-background-light dark:bg-background-dark rounded-xl shadow-2xl p-6 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">{logToEdit ? 'Edit Symptom Log' : 'Add New Symptom Log'}</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Symptoms</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {symptomsList.map(symptom => (
                                <button 
                                    key={symptom} 
                                    onClick={() => handleSymptomToggle(symptom)} 
                                    className={`flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 transition-all duration-200
                                        ${selectedSymptoms.includes(symptom) 
                                            ? 'bg-primary/10 border-primary shadow-lg' 
                                            : 'bg-gray-100 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`
                                    }>
                                    <span className={`material-symbols-outlined !text-4xl mb-2 ${selectedSymptoms.includes(symptom) ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {symptomDetails[symptom].icon}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{symptom}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Severity ({severity}/10)</label>
                        <SeveritySelector value={severity} onChange={setSeverity} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-primary focus:border-primary" placeholder="e.g., pain is sharp when drinking cold water"></textarea>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90">Save Log</button>
                </div>
                 <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    );
};

const SymptomFrequencyChart: React.FC<{ logs: SymptomLog[] }> = ({ logs }) => {
    const symptomFrequency = useMemo(() => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoStr = toYYYYMMDD(thirtyDaysAgo);

        const recentLogs = logs.filter(log => log.date >= thirtyDaysAgoStr);

        if (recentLogs.length === 0) {
            return [];
        }

        const frequencyMap = new Map<string, number>();
        for (const log of recentLogs) {
            for (const symptom of log.symptoms) {
                frequencyMap.set(symptom, (frequencyMap.get(symptom) || 0) + 1);
            }
        }

        return Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);

    }, [logs]);

    if (symptomFrequency.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-[150px] bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center text-gray-500 dark:text-gray-400 p-4">
                <p>Log your symptoms to see which ones are most frequent over the last 30 days.</p>
            </div>
        );
    }
    
    const maxFrequency = Math.max(...symptomFrequency.map(([, count]) => count), 1);

    return (
        <div className="space-y-4">
            {symptomFrequency.map(([symptom, count]) => (
                <div key={symptom} className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="col-span-1 flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                        <span className="material-symbols-outlined text-primary !text-xl">{symptomDetails[symptom]?.icon || 'help'}</span>
                        <span>{symptom}</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                            <div 
                                className="bg-primary h-4 rounded-full transition-all duration-500" 
                                style={{ width: `${(count / maxFrequency) * 100}%` }}
                            ></div>
                        </div>
                        <span className="font-semibold w-20 text-right">{count} {count === 1 ? 'time' : 'times'}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};


interface SymptomTrackerPageProps {
  onNavigate: (page: Page) => void;
}

const SymptomTrackerPage: React.FC<SymptomTrackerPageProps> = ({ onNavigate }) => {
    const [logs, setLogs] = useState<SymptomLog[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(toYYYYMMDD(new Date()));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState<SymptomLog | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        try {
            const savedLogs = localStorage.getItem('symptomLogs');
            if (savedLogs) {
                setLogs(JSON.parse(savedLogs));
            }
        } catch (error) {
            console.error("Failed to load symptom logs:", error);
        } finally {
            setIsInitialLoad(false);
        }
    }, []);
    
    useEffect(() => {
        if (!isInitialLoad) {
            try {
                localStorage.setItem('symptomLogs', JSON.stringify(logs));
            } catch (error) {
                console.error("Failed to save symptom logs:", error);
            }
        }
    }, [logs, isInitialLoad]);

    const logsByDate = useMemo(() => {
        return logs.reduce<Record<string, SymptomLog[]>>((acc, log) => {
            (acc[log.date] = acc[log.date] || []).push(log);
            return acc;
        }, {});
    }, [logs]);

    const handleSaveLog = (log: SymptomLog) => {
        setLogs(prevLogs => {
            const otherLogs = prevLogs.filter(l => l.id !== log.id);
            return [...otherLogs, log].sort((a,b) => b.date.localeCompare(a.date));
        });
        setIsModalOpen(false);
        setEditingLog(null);
    };

    const handleDeleteLog = (logId: string) => {
        if(window.confirm("Are you sure you want to delete this log?")) {
            setLogs(prevLogs => prevLogs.filter(l => l.id !== logId));
        }
    };

    const handleDeleteLogFromEdit = (logId: string) => {
        setLogs(prevLogs => prevLogs.filter(l => l.id !== logId));
        setIsModalOpen(false);
        setEditingLog(null);
    };


    const handleOpenModal = (log: SymptomLog | null) => {
        setEditingLog(log);
        setIsModalOpen(true);
    };

    const daysInMonth = useMemo(() => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const days = [];
        while (date.getMonth() === currentDate.getMonth()) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, [currentDate]);

    const firstDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(), [currentDate]);

    const changeMonth = (delta: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
    };
    
    const selectedLogs = logsByDate[selectedDate] || [];
    const getSeverityColor = (level: number) => {
        if (level >= 7) return 'bg-red-500';
        if (level >= 4) return 'bg-yellow-500';
        return 'bg-green-500';
    }


    return (
        <div className="min-h-screen flex flex-col">
            <Header onNavigate={onNavigate} currentPage="tracker" />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                        <div>
                           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Symptom Tracker</h2>
                           <p className="mt-1 text-gray-600 dark:text-gray-400">Your personal oral health dashboard.</p>
                        </div>
                        <button onClick={() => handleOpenModal(null)} className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-primary/90 transition-colors self-start md:self-center">
                            <span className="material-symbols-outlined">add</span>
                            <span>Add New Log</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 bg-white dark:bg-background-dark/80 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                             <div className="flex items-center justify-between mb-4">
                                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><span className="material-symbols-outlined">chevron_left</span></button>
                                <h3 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><span className="material-symbols-outlined">chevron_right</span></button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2">{day}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                                {daysInMonth.map(day => {
                                    const dateString = toYYYYMMDD(day);
                                    const hasLog = !!logsByDate[dateString];
                                    const isSelected = dateString === selectedDate;
                                    const isToday = dateString === toYYYYMMDD(new Date());
                                    return (
                                        <div key={dateString} className="flex justify-center items-center py-1">
                                             <button onClick={() => setSelectedDate(dateString)} className={`w-10 h-10 rounded-full flex flex-col items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} ${isToday && !isSelected ? 'font-bold text-primary' : ''}`}>
                                                {day.getDate()}
                                                {hasLog && <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-primary'}`}></div>}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-lg font-semibold">Logs for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                            {selectedLogs.length > 0 ? (
                                selectedLogs.map(log => (
                                    <div key={log.id} className="bg-white dark:bg-background-dark/80 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(log.severity)}`}></div>
                                                    <span className="font-bold">Severity: {log.severity}/10</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {log.symptoms.map(s => <span key={s} className="text-xs font-medium bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">{s}</span>)}
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                 <button onClick={() => handleOpenModal(log)} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><span className="material-symbols-outlined !text-base">edit</span></button>
                                                 <button onClick={() => handleDeleteLog(log.id)} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-red-500"><span className="material-symbols-outlined !text-base">delete</span></button>
                                            </div>
                                        </div>
                                        {log.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">{log.notes}</p>}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-background-dark/80 rounded-xl border border-gray-200 dark:border-gray-800">
                                    <p>No logs for this day.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-8 bg-white dark:bg-background-dark/80 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-center mb-6">Symptom Frequency (Last 30 Days)</h3>
                        <SymptomFrequencyChart logs={logs} />
                    </div>

                </div>
            </main>
            <LogFormModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onSave={handleSaveLog} 
              onDeleteLog={handleDeleteLogFromEdit}
              logToEdit={editingLog} 
            />
        </div>
    );
};

export default SymptomTrackerPage;