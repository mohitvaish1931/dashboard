import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Camera, 
  Save, 
  X,
  Shield,
  Award,
  Activity,
  CheckCircle
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAppContext } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const { notifications } = useAppContext();
  
  const [profile, setProfile] = useLocalStorage('userProfile', {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    bio: 'Data analyst with 5+ years of experience in business intelligence and dashboard development.',
    role: 'Senior Data Analyst',
    department: 'Analytics Team'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setShowSaveSuccess(true);
    
    notifications.addNotification({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been saved successfully.',
      icon: CheckCircle
    });
    
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      notifications.addNotification({
        type: 'info',
        title: 'Image Upload',
        message: 'Profile picture upload functionality would be implemented here.',
        icon: Camera
      });
    }
  };

  const stats = [
    { label: 'Dashboards Created', value: '24', icon: Activity, color: 'text-mint-400' },
    { label: 'Reports Generated', value: '156', icon: Award, color: 'text-yellow-400' },
    { label: 'Data Points Analyzed', value: '2.3M', icon: Shield, color: 'text-pink-400' }
  ];

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-pink-200 to-mint-200 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-mint-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-300" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => document.getElementById('profile-image-upload')?.click()}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-mint-500 text-white hover:bg-mint-600 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-semibold text-white mt-4">{profile.name}</h2>
                <p className="text-gray-400">{profile.role}</p>
                <p className="text-sm text-gray-500">{profile.department}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5"
                  >
                    <div className={`p-2 rounded-lg bg-white/10 ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 border border-pink-500/30 text-white hover:border-pink-400/50 transition-all duration-300"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </motion.button>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        showSaveSuccess
                          ? 'bg-mint-600 text-white'
                          : 'bg-mint-500 text-white hover:bg-mint-600'
                      }`}
                    >
                      {showSaveSuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-white/5 text-white">{profile.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-white/5 text-white">{profile.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-white/5 text-white">{profile.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-white/5 text-white">{profile.location}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Member Since
                  </label>
                  <div className="p-3 rounded-lg bg-white/5 text-white">{profile.joinDate}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.role}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-white/5 text-white">{profile.role}</div>
                  )}
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50 resize-none"
                  />
                ) : (
                  <div className="p-3 rounded-lg bg-white/5 text-white">{profile.bio}</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;