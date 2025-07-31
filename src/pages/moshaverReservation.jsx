import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Save, Calendar, CheckCircle, AlertCircle, Loader, User, Settings, Lock, Eye } from 'lucide-react';

const MoshaverAvailabilityPage = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [existingSlots, setExistingSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Persian calendar data (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
  const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const persianDaysShort = ['شنبه', 'یک', 'دوش', 'سه', 'چهار', 'پنج', 'جمعه'];
  
  // Generate 30-minute time slots for a day (9 AM to 9 PM) - Fixed 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 21;
    const slotDuration = 30; // Fixed 30-minute slots
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endMinute = minute + slotDuration;
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

  // Get current week dates starting from Saturday (Persian week)
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Convert to Persian week (0 = Saturday)
    const persianCurrentDay = currentDay === 6 ? 0 : currentDay + 1;
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      // Calculate days from today to get the next 7 days starting from next Saturday
      const daysToAdd = (7 - persianCurrentDay + i) % 7;
      date.setDate(today.getDate() + daysToAdd);
      dates.push(date);
    }
    return dates;
  };

  const [weekDates] = useState(getCurrentWeekDates());

  // Format date for display
  const formatDate = (date) => {
    const persianDay = date.getDay() === 6 ? 0 : date.getDay() + 1;
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      persianDay: persianDay,
      persianDayName: persianDaysShort[persianDay]
    };
  };

  // Check if a slot is reserved
  const isSlotReserved = (dayOfWeek, startTime, endTime) => {
    return reservedSlots.some(slot => 
      slot.day_of_week === dayOfWeek && 
      slot.start_time === `${startTime}:00` && 
      slot.end_time === `${endTime}:00` && 
      slot.is_reserved
    );
  };

  // Check if a slot is available (from existing slots)
  const isSlotAvailable = (dayOfWeek, startTime, endTime) => {
    return existingSlots.some(slot => 
      slot.day_of_week === dayOfWeek && 
      slot.start_time === `${startTime}:00` && 
      slot.end_time === `${endTime}:00` && 
      slot.is_active
    );
  };

  // Load data from APIs
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('لطفاً ابتدا وارد حساب کاربری خود شوید');
          setLoading(false);
          return;
        }

        // Load existing available slots
        const slotsResponse = await fetch('http://localhost:8000/api/sessions/availabilities/my_slots/', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!slotsResponse.ok) {
          throw new Error(`HTTP error! status: ${slotsResponse.status}`);
        }

        const slotsData = await slotsResponse.json();
        setExistingSlots(slotsData);
        
        // Load reserved slots
        const reservedResponse = await fetch('http://localhost:8000/api/sessions/availabilities/reserved/', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (reservedResponse.ok) {
          const reservedData = await reservedResponse.json();
          setReservedSlots(reservedData);
        }
        
        // Convert existing available slots to selectedSlots format
        const selected = {};
        slotsData.forEach(slot => {
          if (slot.is_active) {
            const key = `${slot.day_of_week}-${slot.start_time.substring(0, 5)}-${slot.end_time.substring(0, 5)}`;
            selected[key] = true;
          }
        });
        setSelectedSlots(selected);
        
      } catch (err) {
        setError('خطا در بارگذاری اطلاعات: ' + err.message);
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Toggle slot selection
  const toggleSlot = (dayIndex, slot) => {
    const dayOfWeek = formatDate(weekDates[dayIndex]).persianDay;
    const key = `${dayOfWeek}-${slot.startTime}-${slot.endTime}`;
    
    // Don't allow toggling reserved slots
    if (isSlotReserved(dayOfWeek, slot.startTime, slot.endTime)) {
      return;
    }
    
    setSelectedSlots(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if slot is selected
  const isSlotSelected = (dayIndex, slot) => {
    const dayOfWeek = formatDate(weekDates[dayIndex]).persianDay;
    const key = `${dayOfWeek}-${slot.startTime}-${slot.endTime}`;
    return selectedSlots[key] || false;
  };

  // Get slot status (available, selected, reserved)
  const getSlotStatus = (dayIndex, slot) => {
    const dayOfWeek = formatDate(weekDates[dayIndex]).persianDay;
    
    if (isSlotReserved(dayOfWeek, slot.startTime, slot.endTime)) {
      return 'reserved';
    }
    if (isSlotSelected(dayIndex, slot)) {
      return 'selected';
    }
    return 'available';
  };

  // Save availability slots using the weekly_time endpoint
  const saveAvailability = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('لطفاً ابتدا وارد حساب کاربری خود شوید');
        setSaving(false);
        return;
      }

      // Organize selected slots by day
      const weekData = {};
      
      Object.entries(selectedSlots).forEach(([key, isSelected]) => {
        if (isSelected) {
          const [dayOfWeek, startTime, endTime] = key.split('-');
          const dayIndex = parseInt(dayOfWeek);
          
          if (!weekData[dayIndex]) {
            weekData[dayIndex] = [];
          }
          
          // Use HH:MM format as required by API
          weekData[dayIndex].push({
            start: startTime,
            end: endTime,
            is_active: true
          });
        }
      });

      // Prepare the request body according to your API format
      const requestBody = {
        replace: true,
        week: weekData
      };

      const response = await fetch('http://localhost:8000/api/sessions/availabilities/weekly_time/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Reload data to reflect changes
      const slotsResponse = await fetch('http://localhost:8000/api/sessions/availabilities/my_slots/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (slotsResponse.ok) {
        const updatedSlots = await slotsResponse.json();
        setExistingSlots(updatedSlots);
      }
      
    } catch (err) {
      setError('خطا در ذخیره زمان‌های دسترسی: ' + err.message);
      console.error('Error saving slots:', err);
    } finally {
      setSaving(false);
    }
  };

  // Get selected slots count
  const getSelectedSlotsCount = () => {
    return Object.values(selectedSlots).filter(Boolean).length;
  };

  // Get total hours
  const getTotalHours = () => {
    const totalMinutes = getSelectedSlotsCount() * 30;
    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  تنظیم زمان‌های دسترسی
                </h1>
                <p className="text-sm text-gray-500">زمان‌هایی که برای مشاوره در دسترس هستید را انتخاب کنید</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>زمان‌های دسترسی با موفقیت ذخیره شد!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">خلاصه</h3>
              </div>

              {/* Legend */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">راهنما:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">انتخاب شده</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                      <Lock className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-gray-600">رزرو شده</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded bg-white"></div>
                    <span className="text-gray-600">در دسترس</span>
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">بازه‌های انتخابی:</span>
                    <span className="font-medium text-gray-900">{getSelectedSlotsCount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">مجموع زمان:</span>
                    <span className="font-medium text-gray-900">
                      {(() => {
                        const { hours, minutes } = getTotalHours();
                        return hours > 0 ? `${hours} ساعت ${minutes > 0 ? `و ${minutes} دقیقه` : ''}` : `${minutes} دقیقه`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note about session duration */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">نکته مهم:</p>
                    <p>هر بازه ۳۰ دقیقه‌ای است. مراجعان می‌توانند جلسات ۳۰، ۴۵ یا ۶۰ دقیقه‌ای رزرو کنند.</p>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveAvailability}
                disabled={saving || getSelectedSlotsCount() === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>در حال ذخیره...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
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
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">برنامه هفتگی</h3>
                  <span className="text-sm text-gray-500 mr-auto">
                    هر بازه ۳۰ دقیقه
                  </span>
                </div>
              </div>

              {/* Days Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                  {weekDates.map((date, dayIndex) => {
                    const formattedDate = formatDate(date);
                    const daySlots = timeSlots;
                    const selectedCount = daySlots.filter(slot => getSlotStatus(dayIndex, slot) === 'selected').length;
                    const reservedCount = daySlots.filter(slot => getSlotStatus(dayIndex, slot) === 'reserved').length;
                    
                    return (
                      <div key={dayIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Day Header */}
                        <div className="bg-gray-50 px-3 py-2 border-b">
                          <div className="text-center">
                            <div className="font-medium text-gray-900 text-sm">
                              {persianDays[formattedDate.persianDay]}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formattedDate.day}/{formattedDate.month}
                            </div>
                          </div>
                        </div>

                        {/* Time Slots */}
                        <div className="p-2 space-y-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                          {daySlots.map((slot) => {
                            const status = getSlotStatus(dayIndex, slot);
                            
                            return (
                              <button
                                key={slot.id}
                                onClick={() => toggleSlot(dayIndex, slot)}
                                disabled={status === 'reserved'}
                                className={`w-full p-2 rounded text-xs font-medium transition-colors ${
                                  status === 'selected'
                                    ? 'bg-blue-500 text-white'
                                    : status === 'reserved'
                                    ? 'bg-red-500 text-white cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                                }`}
                              >
                                <div className="flex items-center justify-center gap-1">
                                  {status === 'reserved' && <Lock className="w-3 h-3" />}
                                  <span>{slot.startTime} - {slot.endTime}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Day Summary */}
                        <div className="bg-gray-50 px-3 py-2 border-t text-center">
                          <div className="text-xs text-gray-600">
                            {selectedCount > 0 && (
                              <span className="text-blue-600 font-medium">
                                {selectedCount} انتخاب شده
                              </span>
                            )}
                            {selectedCount > 0 && reservedCount > 0 && (
                              <span className="mx-1">•</span>
                            )}
                            {reservedCount > 0 && (
                              <span className="text-red-600 font-medium">
                                {reservedCount} رزرو شده
                              </span>
                            )}
                            {selectedCount === 0 && reservedCount === 0 && (
                              <span className="text-gray-400">بدون انتخاب</span>
                            )}
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
                        weekDates.forEach((date, dayIndex) => {
                          const dayOfWeek = formatDate(date).persianDay;
                          timeSlots.forEach(slot => {
                            if (!isSlotReserved(dayOfWeek, slot.startTime, slot.endTime)) {
                              const key = `${dayOfWeek}-${slot.startTime}-${slot.endTime}`;
                              allSlots[key] = true;
                            }
                          });
                        });
                        setSelectedSlots(allSlots);
                      }}
                      className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      انتخاب همه
                    </button>
                    
                    <button
                      onClick={() => setSelectedSlots({})}
                      className="px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      پاک کردن همه
                    </button>

                    <button
                      onClick={() => {
                        const morningSlots = {};
                        weekDates.forEach((date, dayIndex) => {
                          const dayOfWeek = formatDate(date).persianDay;
                          timeSlots.filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour >= 9 && hour < 12;
                          }).forEach(slot => {
                            if (!isSlotReserved(dayOfWeek, slot.startTime, slot.endTime)) {
                              const key = `${dayOfWeek}-${slot.startTime}-${slot.endTime}`;
                              morningSlots[key] = true;
                            }
                          });
                        });
                        setSelectedSlots(morningSlots);
                      }}
                      className="px-4 py-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      صبح‌ها (9-12)
                    </button>

                    <button
                      onClick={() => {
                        const afternoonSlots = {};
                        weekDates.forEach((date, dayIndex) => {
                          const dayOfWeek = formatDate(date).persianDay;
                          timeSlots.filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour >= 14 && hour < 18;
                          }).forEach(slot => {
                            if (!isSlotReserved(dayOfWeek, slot.startTime, slot.endTime)) {
                              const key = `${dayOfWeek}-${slot.startTime}-${slot.endTime}`;
                              afternoonSlots[key] = true;
                            }
                          });
                        });
                        setSelectedSlots(afternoonSlots);
                      }}
                      className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
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
    </div>
  );
};

export default MoshaverAvailabilityPage;