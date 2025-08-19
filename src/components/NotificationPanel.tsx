import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, AlertCircle, Info, TrendingUp, Users, Settings, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications: notificationHook } = useAppContext();
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = notificationHook;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-mint-400 bg-mint-500/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'error':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-gray-900/90 backdrop-blur-md border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-mint-500/20 to-blue-500/20 relative">
                    <Bell className="w-5 h-5 text-mint-400" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-black text-xs rounded-full flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Notifications</h2>
                    <p className="text-sm text-gray-400">{unreadCount} unread</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-mint-400/50 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Actions */}
              {unreadCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={markAllAsRead}
                  className="w-full mb-4 p-2 rounded-lg bg-mint-500/20 border border-mint-500/30 text-mint-400 hover:bg-mint-500/30 transition-all duration-300 text-sm font-medium"
                >
                  Mark all as read
                </motion.button>
              )}

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        notification.read
                          ? 'bg-white/5 border-white/10'
                          : 'bg-white/10 border-mint-500/30'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                          <notification.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 rounded hover:bg-white/10 transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="w-3 h-3 text-mint-400" />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 rounded hover:bg-white/10 transition-colors"
                                title="Delete notification"
                              >
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">No notifications</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 border border-pink-500/30 text-white hover:border-pink-400/50 transition-all duration-300"
                >
                  View All Notifications
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;