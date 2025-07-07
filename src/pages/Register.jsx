import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATGzh80LE68I1QjyQ8n89ZzI1NfUzAJ60",
  authDomain: "gamevaultweb-951a0.firebaseapp.com",
  databaseURL: "https://gamevaultweb-951a0-default-rtdb.firebaseio.com",
  projectId: "gamevaultweb-951a0",
  storageBucket: "gamevaultweb-951a0.firebasestorage.app",
  messagingSenderId: "732890053541",
  appId: "1:732890053541:web:ff455a255534d8e46dc64c",
  measurementId: "G-M6STPRHQV1"
};

// Initialize Firebase
let app, auth, db, realtimeDb;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  realtimeDb = getDatabase(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sweetAlertLoaded, setSweetAlertLoaded] = useState(false);
  const navigate = useNavigate();

  const styles = `
    body {
      background-color: #111;
      font-family: 'Inter', sans-serif;
    }

    .bg-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      overflow: hidden;
    }

    .scrolling-row {
      display: flex;
      width: max-content;
      position: absolute;
      opacity: 0.20;
      z-index: 5;
    }

    .bg-image {
      width: 200px;
      height: 120px;
      object-fit: cover;
      margin: 4px;
      border-radius: 12px;
      flex-shrink: 0;
      filter: brightness(0.8) contrast(1.1);
    }

    .form-container {
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .input-field {
      background-color: rgba(30, 30, 30, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.2s ease;
    }
  
    .input-field:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }

    .submit-button {
      background: linear-gradient(to right, #3b82f6, #2563eb);
      transition: all 0.2s ease;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .submit-button:disabled {
      background: linear-gradient(to right, #64748b, #475569);
      cursor: not-allowed;
    }

    @keyframes scrollLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
  `;

  const images = [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
  ];

  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  
  const EyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  useEffect(() => {
    // Add styles
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Add Tailwind if not exists
    if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tailwindScript);
    }

    // Add Inter font
    if (!document.querySelector('link[href*="Inter"]')) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(fontLink);
    }

    // Load SweetAlert2
    const loadSweetAlert = () => {
      if (window.Swal) {
        setSweetAlertLoaded(true);
        return;
      }

      if (!document.querySelector('script[src*="sweetalert2"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        
        script.onload = () => {
          setSweetAlertLoaded(true);
        };
        
        script.onerror = () => {
          setSweetAlertLoaded(true);
        };
        
        document.head.appendChild(script);
      } else {
        setTimeout(() => {
          setSweetAlertLoaded(true);
        }, 500);
      }
    };

    loadSweetAlert();

    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Enhanced alert function
  const showAlert = (type, title, text) => {
    return new Promise((resolve) => {
      if (window.Swal) {
        try {
          if (type === 'success') {
            window.Swal.fire({
              icon: 'success',
              title: title,
              html: `
                <div style="text-align: center; color: #374151;">
                  <p style="margin: 10px 0; font-size: 16px;">
                    Selamat datang di <strong>GameVault</strong>, ${name}!
                  </p>
                  <p style="margin: 10px 0; font-size: 14px; color: #6b7280;">
                    Akun Anda telah berhasil dibuat dan data tersimpan dengan aman.
                  </p>
                </div>
              `,
              background: '#fff',
              iconColor: '#10b981',
              confirmButtonColor: '#10b981',
              confirmButtonText: '🚀 Lanjut ke Login',
              allowOutsideClick: false,
              allowEscapeKey: false,
              timer: 3000,
              timerProgressBar: true
            }).then(() => {
              resolve(true);
            });
          } else {
            window.Swal.fire({
              icon: 'error',
              title: title,
              text: text,
              background: '#1f2937',
              color: '#fff',
              iconColor: '#ef4444',
              confirmButtonColor: '#ef4444',
              confirmButtonText: 'Coba Lagi'
            }).then(() => {
              resolve(false);
            });
          }
          return;
        } catch (error) {
          console.error('SweetAlert error:', error);
        }
      }
      
      // Fallback to native alert
      const message = type === 'success' 
        ? `${title}\n\nSelamat datang di GameVault, ${name}!\nAkun Anda telah berhasil dibuat dan data tersimpan dengan aman.`
        : `${title}\n\n${text}`;
      
      alert(message);
      resolve(type === 'success');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Form submitted, starting registration...');
    
    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      await showAlert('error', 'Data Tidak Lengkap', 'Mohon isi semua field yang diperlukan');
      return;
    }

    if (password.length < 6) {
      await showAlert('error', 'Password Terlalu Pendek', 'Password harus minimal 6 karakter');
      return;
    }

    // Set loading state
    setIsLoading(true);
    console.log('⏳ Loading state set to true');

    try {
      console.log('📝 Creating user account...');
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      console.log('✅ User created:', user.uid);

      // Prepare user data
      const userData = {
        uid: user.uid,
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
        status: 'active'
      };

      console.log('💾 Saving user data to databases...');

      // Save to both databases simultaneously
      const savePromises = [
        set(ref(realtimeDb, 'users/' + user.uid), userData),
        setDoc(doc(db, "users", user.uid), userData)
      ];

      await Promise.all(savePromises);
      console.log('✅ Both databases saved successfully');

      console.log('🎉 Registration successful, showing alert...');

      // Show success alert
      await showAlert('success', 'Pendaftaran Berhasil! 🎉', '');

      // Navigate to login immediately after alert
      console.log('🔄 Navigating to login...');
      navigate('/login', { 
        replace: true,
        state: { 
          message: 'Registrasi berhasil! Silakan login dengan akun baru Anda.',
          email: email.trim(),
          registrationSuccess: true
        }
      });

    } catch (error) {
      console.error('❌ Registration error:', error);
      
      // Handle errors
      let errorMessage = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
      let errorTitle = 'Pendaftaran Gagal!';

      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email ini sudah terdaftar. Silakan gunakan email lain atau login dengan akun yang sudah ada.';
            errorTitle = 'Email Sudah Terdaftar';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Format email tidak valid. Pastikan email Anda benar.';
            errorTitle = 'Email Tidak Valid';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password terlalu lemah. Gunakan minimal 6 karakter dengan kombinasi huruf dan angka.';
            errorTitle = 'Password Terlalu Lemah';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.';
            errorTitle = 'Masalah Koneksi';
            break;
          default:
            errorMessage = `Error: ${error.message}`;
            break;
        }
      }

      await showAlert('error', errorTitle, errorMessage);
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  const renderBackgroundRows = () => {
    const numRows = 6;
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const isEven = i % 2 === 0;
      const rowImages = [];
      
      for (let j = 0; j < 15; j++) {
        rowImages.push(
          <img 
            key={j}
            src={images[j % images.length]} 
            className="bg-image" 
            alt={`Game ${j}`}
          />
        );
      }

      rows.push(
        <div 
          key={i}
          className="scrolling-row"
          style={{
            top: `${i * 15}%`,
            animation: `${isEven ? 'scrollLeft' : 'scrollRight'} ${60 + i * 5}s linear infinite`,
            transform: `rotate(${isEven ? -8 : 8}deg)`
          }}
        >
          {rowImages}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="bg-container">
        <div className="absolute inset-0 bg-black/95 z-1"></div>
        {renderBackgroundRows()}
      </div>

      {/* Register Form */}
      <div className="form-container bg-zinc-900/95 shadow-2xl rounded-2xl p-8 w-full max-w-sm z-20 relative">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Daftar</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Buat akun GameVault baru
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="name">
              Nama Lengkap
            </label>
            <input 
              type="text" 
              id="name"
              className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-white"
              placeholder="Masukkan nama lengkap" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="email">
              Alamat Email
            </label>
            <input 
              type="email" 
              id="email"
              className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-white"
              placeholder="you@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-white pr-10"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength={6}
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1">Minimal 6 karakter</p>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="submit-button w-full py-3 rounded-xl text-white font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mendaftar...
                </div>
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Sudah punya akun?
            <Link 
              to="/login" 
              className="text-blue-400 hover:text-blue-300 ml-1.5 hover:underline font-medium"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;