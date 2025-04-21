import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CogIcon, BellIcon, LockClosedIcon, GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function Settings() {
    // eslint-disable-next-line no-unused-vars
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [language, setLanguage] = useState('en');

    const handleSaveSettings = () => {
        // TODO: Save settings to API
        console.log('Settings saved');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account settings and preferences.</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="space-y-6">
                            {/* Notifications Settings */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <BellIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Notifications</h4>
                                        <p className="text-sm text-gray-500">Receive notifications about your bookings and updates</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className={`${notifications ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                                        onClick={() => setNotifications(!notifications)}
                                    >
                                        <span
                                            className={`${notifications ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Email Updates */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Email Updates</h4>
                                        <p className="text-sm text-gray-500">Receive email updates about new services and promotions</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className={`${emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                                        onClick={() => setEmailUpdates(!emailUpdates)}
                                    >
                                        <span
                                            className={`${emailUpdates ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Language Settings */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Language</h4>
                                        <p className="text-sm text-gray-500">Choose your preferred language</p>
                                    </div>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="ar">Arabic</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleSaveSettings}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings; 