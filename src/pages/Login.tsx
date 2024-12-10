import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { APP_CONFIG } from '../config/app';
import { LogIn } from 'lucide-react';

export function Login() {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const { translations } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img 
              src={APP_CONFIG.branding.defaultLogo} 
              alt="Logo" 
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              {translations.auth.welcomeBack}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {translations.platform.manageAwards}
            </p>
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="mt-4 text-xs text-indigo-600 hover:text-indigo-500"
            >
              {showDemo ? 'Hide demo credentials' : 'Show demo credentials'}
            </button>
            {showDemo && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Email: admin@awards.com</p>
                <p>Password: admin123</p>
              </div>
            )}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {translations.auth.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {translations.auth.passwordLabel}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? translations.auth.signingIn : translations.auth.signIn}
            </button>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block flex-1 bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80")'
      }}>
        <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center p-12">
          <div className="max-w-xl text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              {translations.platform.title}
            </h2>
            <p className="text-lg">
              {translations.platform.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}