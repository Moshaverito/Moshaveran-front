import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Save, Plus, Trash2, Calendar, CheckCircle, AlertCircle, Loader, User, Settings } from 'lucide-react';

const MoshaverAvailabilityPage = () => {
  const [selectedDuration, setSelectedDuration] = useState(30); // 30, 45, 60 minutes
  const [selectedSlots, setSelectedSlots] = useState({});
  const [existingSlots, setExistingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Jalali calendar data
  const jalaliDays = ['دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'];
  const jalaliDaysShort = ['دوش', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه', 'یک'];
  
  // Generate time slots for a day (9 AM to 9 PM)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 21;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += selectedDuration) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endMinute = minute + selectedDuration;
        const endHour = endMinute >= 60 ? hour + 1 : hour;
        const finalEndMinute = endMinute >= 60 ? endMinute - 60 : endMinute;
        
        if (endHour >= 21) break; // Don't go beyond 9 PM
        
        const endTime = `${endHour.toString().padStart(2, '0')}:${finalEndMinute.toString().padStart(2, '0')}`;
        
        slots.push({
          startTime,
          endTime,
          id: `${startTime}-${endTime}`
        });
      }
    }
    return slots;
  };

  const [timeSlots] = useState(generateTimeSlots());

  // Get current week dates (next 7 days starting from Monday)
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay; // Days until next Monday
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + daysUntilMonday + i);
      dates.push(date);
    }
    return dates;
  };

  const [weekDates] = useState(getCurrentWeekDates());

  // Format date for display
  const formatDate = (date) => {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      jalaliDay: jalaliDaysShort[date.getDay() === 0 ? 6 : date.getDay() - 1]
    };
  };

  // Load existing availability slots
  useEffect(() => {
    const loadExistingSlots = async () => {
      try {
        setLoading(true);
        
        // Simulated existing slots for demo
        const simulatedSlots = [
          { id: 1, day_of_week: 0, start_time: '09:00', end_time: '09:30', is_active: true },
          { id: 2, day_of_week: 0, start_time: '10:00', end_time: '10:30', is_active: true },
          { id: 3, day_of_week: 1, start_time: '14:00', end_time: '14:45', is_active: true },
        ];
        
        setExistingSlots(simulatedSlots);
        
        // Convert existing slots to selectedSlots format
        const selected = {};
        simulatedSlots.forEach(slot => {
          const key = `${slot.day_of_week}-${slot.start_time}-${slot.end_time}`;
          selected[key] = true;
        });
        setSelectedSlots(selected);
        
        /* 
        Real API call would be:
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:8000/api/sessions/availability-slots/my_slots/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setExistingSlots(data);
        */
        
      } catch (err) {
        setError('خطا در بارگذاری زمان‌های موجود');
        console.error('Error loading slots:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExistingSlots();
  }, []);

  // Regenerate time slots when duration changes
  useEffect(() => {
    setSelectedSlots({}); // Clear selections when duration changes
  }, [selectedDuration]);

  // Toggle slot selection
  const toggleSlot = (dayIndex, slot) => {
    const key = `${dayIndex}-${slot.startTime}-${slot.endTime}`;
    setSelectedSlots(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if slot is selected
  const isSlotSelected = (dayIndex, slot) => {
    const key = `${dayIndex}-${slot.startTime}-${slot.endTime}`;
    return selectedSlots[key] || false;
  };

  // Save availability slots
  const saveAvailability = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const slotsToCreate = [];
      
      Object.entries(selectedSlots).forEach(([key, isSelected]) => {
        if (isSelected) {
          const [dayIndex, startTime, endTime] = key.split('-');
          slotsToCreate.push({
            day_of_week: parseInt(dayIndex),
            start_time: startTime,
            end_time: endTime
          });
        }
      });

      // Simulate API calls for demo
      console.log('Slots to create:', slotsToCreate);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      /*
      Real API calls would be:
      const token = localStorage.getItem('access_token');
      
      // First, delete existing slots
      await fetch('http://localhost:8000/api/sessions/availability-slots/', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Then create new ones
      for (const slot of slotsToCreate) {
        await fetch('http://localhost:8000/api/sessions/availability-slots/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(slot)
        });
      }
      */
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      setError('خطا در ذخیره زمان‌های دسترسی');
      console.error('Error saving slots:', err);
    } finally {
      setSaving(false);
    }
  };

  // Get selected slots count
  const getSelectedSlotsCount = () => {
    return Object.values(selectedSlots).filter(Boolean).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800" dir="rtl">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/50 rounded-full transition-all">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  تنظیم زمان‌های دسترسی
                </h1>
                <p className="text-sm text-gray-600">هفته آینده - زمان‌های خود را انتخاب کنید</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>زمان‌های دسترسی با موفقیت ذخیره شد!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">تنظیمات</h3>
              </div>

              {/* Duration Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">مدت زمان هر جلسه:</h4>
                <div className="space-y-2">
                  {[30, 45, 60].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`w-full p-3 rounded-xl border-2 transition-all text-right ${
                        selectedDuration === duration
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{duration} دقیقه</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">خلاصه انتخاب:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">مدت زمان:</span>
                    <span className="font-medium">{selectedDuration} دقیقه</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تعداد بازه:</span>
                    <span className="font-medium">{getSelectedSlotsCount()} بازه</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">مجموع ساعت:</span>
                    <span className="font-medium">
                      {Math.floor((getSelectedSlotsCount() * selectedDuration) / 60)} ساعت و {(getSelectedSlotsCount() * selectedDuration) % 60} دقیقه
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveAvailability}
                disabled={saving || getSelectedSlotsCount() === 0}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>در حال ذخیره...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>ذخیره تغییرات</span>
                  </>
                )}
              </button>

              {getSelectedSlotsCount() === 0 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  حداقل یک بازه زمانی انتخاب کنید
                </p>
              )}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">برنامه هفتگی</h3>
                <span className="text-sm text-gray-500">
                  (کلیک کنید تا انتخاب/لغو انتخاب کنید)
                </span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                {weekDates.map((date, dayIndex) => {
                  const formattedDate = formatDate(date);
                  const daySlots = timeSlots;
                  
                  return (
                    <div key={dayIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                      {/* Day Header */}
                      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-3 text-center">
                        <div className="font-bold text-sm">{jalaliDays[dayIndex]}</div>
                        <div className="text-xs opacity-90">
                          {formattedDate.day}/{formattedDate.month}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                        {daySlots.map((slot) => {
                          const selected = isSlotSelected(dayIndex, slot);
                          
                          return (
                            <button
                              key={slot.id}
                              onClick={() => toggleSlot(dayIndex, slot)}
                              className={`w-full p-2 rounded-lg text-xs font-medium transition-all ${
                                selected
                                  ? 'bg-teal-500 text-white shadow-sm'
                                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                              }`}
                            >
                              {slot.startTime} - {slot.endTime}
                            </button>
                          );
                        })}
                      </div>

                      {/* Day Summary */}
                      <div className="bg-gray-50 p-2 text-center border-t">
                        <div className="text-xs text-gray-600">
                          {daySlots.filter(slot => isSlotSelected(dayIndex, slot)).length} بازه انتخاب شده
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const allSlots = {};
                      weekDates.forEach((_, dayIndex) => {
                        timeSlots.forEach(slot => {
                          const key = `${dayIndex}-${slot.startTime}-${slot.endTime}`;
                          allSlots[key] = true;
                        });
                      });
                      setSelectedSlots(allSlots);
                    }}
                    className="px-4 py-2 bg-teal-100 text-teal-700 rounded-xl text-sm font-medium hover:bg-teal-200 transition-all"
                  >
                    انتخاب همه
                  </button>
                  
                  <button
                    onClick={() => setSelectedSlots({})}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200 transition-all"
                  >
                    پاک کردن همه
                  </button>

                  {/* Quick Morning/Afternoon/Evening selection */}
                  <button
                    onClick={() => {
                      const morningSlots = {};
                      weekDates.forEach((_, dayIndex) => {
                        timeSlots.filter(slot => {
                          const hour = parseInt(slot.startTime.split(':')[0]);
                          return hour >= 9 && hour < 12;
                        }).forEach(slot => {
                          const key = `${dayIndex}-${slot.startTime}-${slot.endTime}`;
                          morningSlots[key] = true;
                        });
                      });
                      setSelectedSlots(morningSlots);
                    }}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl text-sm font-medium hover:bg-yellow-200 transition-all"
                  >
                    صبح‌ها (9-12)
                  </button>

                  <button
                    onClick={() => {
                      const afternoonSlots = {};
                      weekDates.forEach((_, dayIndex) => {
                        timeSlots.filter(slot => {
                          const hour = parseInt(slot.startTime.split(':')[0]);
                          return hour >= 14 && hour < 18;
                        }).forEach(slot => {
                          const key = `${dayIndex}-${slot.startTime}-${slot.endTime}`;
                          afternoonSlots[key] = true;
                        });
                      });
                      setSelectedSlots(afternoonSlots);
                    }}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-all"
                  >
                    عصرها (14-18)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoshaverAvailabilityPage;