import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_ANNOUNCEMENT = "Mordomo Digital - Alfa Plaza Hotel";

const AnnouncementTicker: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>(DEFAULT_ANNOUNCEMENT);
  const [duration, setDuration] = useState<number>(20);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('hotel_settings')
        .select('*')
        .abortSignal(AbortSignal.timeout(5000));

      if (error) {
        console.warn('Ticker Sync Failed:', error.message);
        return;
      }

      if (data) {
        const announcementSetting = data.find(item => item.key === 'announcement');
        const speedSetting = data.find(item => item.key === 'ticker_speed');

        if (announcementSetting?.value) {
          setAnnouncement(announcementSetting.value);
        }
        
        if (speedSetting?.value) {
          setDuration(Number(speedSetting.value));
        }
      }
    } catch (err) {
       console.warn('Ticker Sync Error.');
    }
  };

  useEffect(() => {
    // Initial load
    fetchSettings();

    // Listen for realtime updates
    const channel = supabase
      .channel('public:hotel_settings')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'hotel_settings',
        },
        (payload) => {
          const { new: newRecord } = payload;
          if (newRecord.key === 'announcement') {
            setAnnouncement(newRecord.value);
          } else if (newRecord.key === 'ticker_speed') {
            setDuration(Number(newRecord.value));
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'hotel_settings',
        },
        (payload) => {
          const { new: newRecord } = payload;
           if (newRecord.key === 'announcement') {
            setAnnouncement(newRecord.value);
          } else if (newRecord.key === 'ticker_speed') {
            setDuration(Number(newRecord.value));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative w-full h-8 bg-black/60 backdrop-blur-md flex items-center overflow-hidden z-40">
      <div 
        className="animate-marquee whitespace-nowrap"
        style={{ animationDuration: `${duration}s` }}
      >
        <span className="text-white font-sans font-bold text-xs uppercase tracking-wide px-4">
          {announcement}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
