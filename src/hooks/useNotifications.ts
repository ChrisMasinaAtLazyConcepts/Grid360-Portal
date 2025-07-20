import { useEffect } from 'react';

export const useNotifications = () => {
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        ...options
      });
    }
  };

  return { showNotification };
};