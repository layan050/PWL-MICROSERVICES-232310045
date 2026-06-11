"use client";

import React, { useState, useEffect } from 'react';

// Custom Simple SVG Icon components to ensure zero dependency build errors
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" />
  </svg>
);

export default function App() {
  // Mounting flag to prevent SSR/Hydration Mismatch
  const [mounted, setMounted] = useState(false);

  // Client state variables
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  
  // Connection state - Swapped localhost with IPv4 127.0.0.1 to prevent Windows DNS resolution errors
  const [useMockData, setUseMockData] = useState(true);
  const [apiUrl, setApiUrl] = useState('http://127.0.0.1:3000/api/buku'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  // Connection Diagnostics State
  const [diagnosticStatus, setDiagnosticStatus] = useState(null);
  const [runningDiagnostics, setRunningDiagnostics] = useState(false);

  // Form values (Mapped to Indonesian database fields used in KUIS 1)
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    penulis: '',
    penerbit: '',
    tahun: 2026,
    isbn: '',
    genre: 'Fiction',
    stok: 5,
    sinopsis: ''
  });

  // Captures transaction outcomes for test export report
  const [testLogs, setTestLogs] = useState([]);

  // Hardcoded Fallback Seed Data matching Indonesian Schema
  const mockBooks = [
    {
      id: "1",
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      penerbit: "Bentang Pustaka",
      tahun: 2005,
      isbn: "979-3062-79-7",
      genre: "Drama",
      stok: 12,
      sinopsis: "A heartfelt story of school children fighting for education in Belitung."
    },
    {
      id: "2",
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      penerbit: "Hasta Mitra",
      tahun: 1980,
      isbn: "979-8659-12-0",
      genre: "Historical Fiction",
      stok: 8,
      sinopsis: "The epic romance and political awakening set in late Dutch colonial Indonesia."
    }
  ];

  // Set mounted state once loaded in the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchBooks();
    }
  }, [mounted, useMockData, apiUrl]);

  // Log tracker helper
  const addLog = (action, status, payload, response) => {
    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      action,
      status,
      payload: JSON.stringify(payload, null, 2),
      response: JSON.stringify(response, null, 2)
    };
    setTestLogs(prev => [newLog, ...prev]);
  };

  const showNotification = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // Run Real-time Network Diagnostics
  const runNetworkDiagnostics = async () => {
    setRunningDiagnostics(true);
    setDiagnosticStatus([]);
    const logs = [];

    const testStep = async (name, url, expectedStatus = 200) => {
      try {
        const start = Date.now();
        const res = await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' });
        const latency = Date.now() - start;
        if (res.ok || res.status === 404) {
          // 404 means server is active but route doesn't exist, which still proves connectivity!
          return { name, success: true, message: `Connected! Response Status: ${res.status} (${latency}ms)` };
        } else {
          return { name, success: false, message: `Server replied with error code: ${res.status}` };
        }
      } catch (err) {
        return { name, success: false, message: `Blocked or Refused (${err.message})` };
      }
    };

    // Test 1: IPv4 direct address
    const t1 = await testStep("IPv4 Loopback (127.0.0.1:3000)", "http://127.0.0.1:3000");
    logs.push(t1);

    // Test 2: Localhost DNS alias
    const t2 = await testStep("Localhost Name (localhost:3000)", "http://localhost:3000");
    logs.push(t2);

    // Test 3: Actual Route check
    const t3 = await testStep(`Target Route (${apiUrl})`, apiUrl);
    logs.push(t3);

    setDiagnosticStatus(logs);
    setRunningDiagnostics(false);
  };

  // 1. Fetch Books (GET /api/buku)
  const fetchBooks = async () => {
    setLoading(true);
    if (useMockData) {
      setTimeout(() => {
        const stored = localStorage.getItem('pwl_books');
        if (stored) {
          setBooks(JSON.parse(stored));
        } else {
          localStorage.setItem('pwl_books', JSON.stringify(mockBooks));
          setBooks(mockBooks);
        }
        setLoading(false);
        addLog('GET /api/buku', 'SUCCESS (MOCK)', null, stored ? JSON.parse(stored) : mockBooks);
      }, 500);
    } else {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP status error: ${response.status}`);
        const data = await response.json();
        setBooks(data);
        addLog('GET /api/buku', 'SUCCESS (LIVE)', null, data);
        showNotification('Connected successfully to your Quiz 1 MongoDB API!', 'success');
      } catch (err) {
        addLog('GET /api/buku', 'FAILED (LIVE)', null, { error: err.message });
        showNotification(`Failed to connect: ${err.message}. Sandbox mode restored. Click "Run Diagnostic Tests" below to troubleshoot.`, 'error');
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    }
  };

  // 2. Write / Modify Books (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.penulis) {
      showNotification('Judul and Penulis fields are required!', 'error');
      return;
    }

    setLoading(true);
    if (useMockData) {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('pwl_books') || '[]');
        let updated;
        if (editingId) {
          updated = stored.map(b => b.id === editingId ? { ...formData, id: editingId } : b);
          addLog(`PUT /api/buku/${editingId}`, 'SUCCESS (MOCK)', formData, { success: true, id: editingId });
          showNotification('Book updated in sandbox local DB!');
        } else {
          const newBook = { ...formData, id: Date.now().toString() };
          updated = [newBook, ...stored];
          addLog('POST /api/buku', 'SUCCESS (MOCK)', formData, newBook);
          showNotification('New book created in sandbox local DB!');
        }
        localStorage.setItem('pwl_books', JSON.stringify(updated));
        setBooks(updated);
        resetForm();
        setLoading(false);
      }, 400);
    } else {
      try {
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error(`Server returned error code: ${response.status}. Verify field validation rules.`);
        const result = await response.json();

        addLog(`${method} ${url}`, 'SUCCESS (LIVE)', formData, result);
        showNotification(editingId ? 'Book successfully updated on MongoDB backend!' : 'Book created on MongoDB backend!');
        fetchBooks();
        resetForm();
      } catch (err) {
        addLog('WRITE / UPDATE ERROR', 'FAILED (LIVE)', formData, { error: err.message });
        showNotification(`Save Failed: ${err.message}`, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  // 3. Delete Book (DELETE /api/buku/:id)
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    setLoading(true);
    if (useMockData) {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('pwl_books') || '[]');
        const updated = stored.filter(b => b.id !== id);
        localStorage.setItem('pwl_books', JSON.stringify(updated));
        setBooks(updated);
        addLog(`DELETE /api/buku/${id}`, 'SUCCESS (MOCK)', { id }, { deleted: true });
        showNotification('Deleted from Sandbox Local Storage.');
        setLoading(false);
      }, 400);
    } else {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
        const result = await response.json();

        addLog(`DELETE /api/buku/${id}`, 'SUCCESS (LIVE)', { id }, result);
        showNotification('Book removed from MongoDB database.');
        fetchBooks();
      } catch (err) {
        addLog(`DELETE /api/buku/${id}`, 'FAILED (LIVE)', { id }, { error: err.message });
        showNotification(`Delete failed: ${err.message}`, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditInit = (book) => {
    setEditingId(book._id || book.id); 
    setFormData({
      judul: book.judul || book.title || '',
      penulis: book.penulis || book.author || '',
      penerbit: book.penerbit || book.publisher || '',
      tahun: book.tahun || book.year || 2026,
      isbn: book.isbn || '',
      genre: book.genre || 'Fiction',
      stok: book.stok || book.stock || 0,
      sinopsis: book.sinopsis || book.summary || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      judul: '',
      penulis: '',
      penerbit: '',
      tahun: 2026,
      isbn: '',
      genre: 'Fiction',
      stok: 5,
      sinopsis: ''
    });
  };

  const filteredBooks = books.filter(b => {
    const titleVal = b.judul || b.title || '';
    const authorVal = b.penulis || b.author || '';
    const isbnVal = b.isbn || '';
    return (
      titleVal.toLowerCase().includes(searchQuery.toLowerCase()) || 
      authorVal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      isbnVal.includes(searchQuery)
    );
  });

  // Dynamically load html2pdf from CDN and generate/save the PDF directly without printing
  const handleExportPDF = () => {
    const element = document.getElementById('printable-report-area');
    if (!element) return;

    setPdfGenerating(true);
    showNotification('Preparing your PDF download...', 'success');

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (window.html2pdf) {
          resolve(window.html2pdf);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(window.html2pdf);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')
      .then((html2pdf) => {
        const opt = {
          margin:       0.4,
          filename:     'testing-report.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Render PDF directly using client-side library
        html2pdf().from(element).set(opt).save().then(() => {
          setPdfGenerating(false);
          showNotification('PDF downloaded successfully!', 'success');
        }).catch((err) => {
          console.error(err);
          setPdfGenerating(false);
          showNotification('PDF rendering failed. Falling back to print...', 'error');
          window.print();
        });
      })
      .catch((err) => {
        console.error(err);
        setPdfGenerating(false);
        showNotification('Failed to load PDF library. Falling back to print...', 'error');
        window.print();
      });
  };

  // Safe Guard to prevent Next.js rendering mismatches until fully loaded in browser DOM
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="text-sm font-mono tracking-wider">Hydrating Application...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Navbar Banner Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 shadow-xl border-b border-emerald-500">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white text-emerald-700 p-2.5 rounded-xl shadow-lg">
              <BookIcon />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">KUIS 2 PWL: book-client-app</h1>
              <p className="text-emerald-100 text-xs sm:text-sm mt-0.5 font-medium">Integration Client • MongoDB Connectivity Ecosystem</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-slate-900/60 text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-mono">
              PORT: 3001
            </span>
            <span className="bg-slate-900/60 text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-mono">
              REPOSITORI: KUIS-2-PWL
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Toggle Panel Mode */}
        <section className="bg-slate-800/80 rounded-2xl p-6 mb-8 border border-slate-700/60 backdrop-blur-sm shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <SettingsIcon /> Environment Switcher
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Validate operations with local sandbox or connect to your Quiz 1 MongoDB microservice.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex">
                <button
                  type="button"
                  onClick={() => setUseMockData(true)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${useMockData ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Sandbox (Mock DB)
                </button>
                <button
                  type="button"
                  onClick={() => setUseMockData(false)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${!useMockData ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Live Backend Connection
                </button>
              </div>
              <button
                type="button"
                onClick={fetchBooks}
                className="bg-slate-700 hover:bg-slate-600 border border-slate-600 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
              >
                <RefreshIcon /> Trigger Fetch
              </button>
            </div>
          </div>

          {!useMockData && (
            <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="text-xs font-bold text-slate-400 w-full md:w-auto shrink-0 uppercase tracking-wider">
                  Quiz 1 REST API Endpoint:
                </label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://127.0.0.1:3000/api/buku"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={runNetworkDiagnostics}
                  disabled={runningDiagnostics}
                  className="bg-teal-700 hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-bold py-2 px-4 rounded-xl transition shrink-0"
                >
                  {runningDiagnostics ? 'Testing...' : 'Run Diagnostic Tests'}
                </button>
              </div>

              {/* Real-time Diagnostics Output Table */}
              {diagnosticStatus && (
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 font-mono text-xs space-y-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Diagnostics Report:</h4>
                  <div className="divide-y divide-slate-800">
                    {diagnosticStatus.map((test, i) => (
                      <div key={i} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-slate-300 font-semibold">{test.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${test.success ? 'bg-teal-950 text-teal-400' : 'bg-rose-950 text-rose-400'}`}>
                            {test.success ? 'PASS' : 'FAIL'}
                          </span>
                          <span className="text-slate-400">{test.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-[10px] text-slate-500 italic">
                    Tip: If "IPv4 Loopback" passes but "Target Route" fails, your node server is online, but your backend routes or MongoDB database connection timed out inside server.js.
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Global Activity Feedback Panel */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between shadow-lg transition-all ${message.type === 'error' ? 'bg-red-950/80 border-red-800 text-red-200' : 'bg-emerald-950/80 border-emerald-800 text-emerald-200'}`}>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Creator/Editor Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700/50 px-6 py-4 border-b border-slate-700">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusIcon /> {editingId ? 'Modify Selected Book' : 'Catalog New Book'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fields match directly with your Mongo Schema: /api/buku
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Book Title (Judul) <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.judul}
                    onChange={(e) => setFormData({...formData, judul: e.target.value})}
                    placeholder="e.g., Bumi Manusia"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Author Name (Penulis) <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.penulis}
                    onChange={(e) => setFormData({...formData, penulis: e.target.value})}
                    placeholder="e.g., Pramoedya Ananta Toer"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Publisher (Penerbit)</label>
                    <input
                      type="text"
                      value={formData.penerbit}
                      onChange={(e) => setFormData({...formData, penerbit: e.target.value})}
                      placeholder="e.g., Hasta Mitra"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Year (Tahun)</label>
                    <input
                      type="number"
                      value={formData.tahun}
                      onChange={(e) => setFormData({...formData, tahun: parseInt(e.target.value) || 2026})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Stock (Stok)</label>
                    <input
                      type="number"
                      value={formData.stok}
                      onChange={(e) => setFormData({...formData, stok: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Genre</label>
                    <select
                      value={formData.genre}
                      onChange={(e) => setFormData({...formData, genre: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option>Fiction</option>
                      <option>Drama</option>
                      <option>Historical Fiction</option>
                      <option>Non-Fiction</option>
                      <option>Biography</option>
                      <option>Sci-Fi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">ISBN Serial</label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                    placeholder="978-X-XXXX-XXXX-X"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Synopsis (Sinopsis)</label>
                  <textarea
                    rows="3"
                    value={formData.sinopsis}
                    onChange={(e) => setFormData({...formData, sinopsis: e.target.value})}
                    placeholder="Enter short story summary..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white py-3 px-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all"
                  >
                    {loading ? 'Processing Operation...' : editingId ? 'Update Record' : 'Create Record'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 px-4 rounded-xl text-sm font-bold transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Book Catalog List view & Report Console */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Database Catalog (/api/buku)</h3>
                  <p className="text-xs text-slate-400">All registered book documents are reflected here.</p>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, isbn..."
                    className="bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-60"
                  />
                </div>
              </div>

              {filteredBooks.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <BookIcon />
                  <p className="mt-2 text-sm text-slate-400">No books present in the queried list.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/60">
                  {filteredBooks.map((book) => {
                    const title = book.judul || book.title || 'Untitled';
                    const author = book.penulis || book.author || 'Unknown Author';
                    const publisher = book.penerbit || book.publisher;
                    const year = book.tahun || book.year;
                    const stock = book.stok !== undefined ? book.stok : book.stock || 0;
                    const summary = book.sinopsis || book.summary;

                    return (
                      <div key={book._id || book.id} className="p-6 hover:bg-slate-700/30 transition flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-lg p-2 font-mono text-xs font-bold shrink-0 shadow-inner">
                              {book.genre?.substring(0, 3).toUpperCase() || 'FICT'}
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-base leading-snug">{title}</h4>
                              <p className="text-slate-300 text-sm font-medium">By {author}</p>
                            </div>
                          </div>

                          {summary && (
                            <p className="text-slate-400 text-xs line-clamp-2 italic font-serif">
                              "{summary}"
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-400">
                            {publisher && (
                              <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
                                Publisher: {publisher}
                              </span>
                            )}
                            {year && (
                              <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
                                Year: {year}
                              </span>
                            )}
                            {book.isbn && (
                              <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700 font-mono">
                                ISBN: {book.isbn}
                              </span>
                            )}
                            <span className={`px-2.5 py-1 rounded-md font-semibold ${stock > 0 ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800' : 'bg-red-950/50 text-red-400 border border-red-800'}`}>
                              Stock: {stock} units
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                          <button
                            type="button"
                            onClick={() => handleEditInit(book)}
                            className="bg-slate-700 hover:bg-slate-600 text-emerald-400 hover:text-emerald-300 p-2.5 rounded-xl border border-slate-600/50 transition-colors"
                          >
                            <EditIcon />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(book._id || book.id)}
                            className="bg-slate-700 hover:bg-slate-600 text-rose-400 hover:text-rose-300 p-2.5 rounded-xl border border-slate-600/50 transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Live Testing Log Console & Dynamic PDF Downloader */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileTextIcon /> System Integration Testing Suite
                  </h3>
                  <p className="text-xs text-slate-400">Captures detailed network payloads and responses. Perfect for direct PDF submission exports.</p>
                </div>
                <button
                  type="button"
                  onClick={handleExportPDF}
                  disabled={pdfGenerating}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-lg transition"
                >
                  {pdfGenerating ? 'Rendering PDF...' : 'Download Testing Report (PDF)'}
                </button>
              </div>

              {/* Explicit PDF Export Target - Automatically Styled for Perfect A4 Light Mode Exports */}
              <div id="printable-report-area" className="p-6 bg-white text-black font-sans space-y-6">
                
                {/* PDF Header Section */}
                <div className="border-b-2 border-slate-900 pb-4">
                  <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Kuis 2 PWL: book-client-app</h1>
                  <p className="text-xs text-slate-600 mt-1">Generated: {mounted ? new Date().toLocaleString() : ''}</p>
                  <p className="text-xs text-slate-700 font-semibold">Project Name: book-client-app | Git Repository: KUIS-2-PWL</p>
                  <p className="text-xs text-slate-700">Course: Pemrograman Web Lanjut (PWL)</p>
                </div>

                {/* Captured Action Tables inside Document */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Captured Network Traces & Payload Logs:</h3>
                  
                  {testLogs.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-slate-300 rounded-xl text-slate-500">
                      <p className="text-sm font-medium">No transactions tracked yet.</p>
                      <p className="text-xs mt-1">Make GET, POST, or PUT transactions to populate live API testing signatures here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testLogs.map((log, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 font-mono text-[11px] leading-relaxed">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-slate-700">
                            <div>
                              <span className="font-bold text-emerald-700 mr-2">{log.action}</span>
                              <span className="text-[10px] text-slate-500">[{log.timestamp}]</span>
                            </div>
                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                              {log.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                              <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Payload / Req Parameters</div>
                              <pre className="bg-white p-2 border border-slate-200 rounded text-[10px] text-slate-800 overflow-x-auto max-h-40">
                                {log.payload !== 'null' ? log.payload : '// No Request Parameter'}
                              </pre>
                            </div>
                            <div>
                              <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Server Response JSON</div>
                              <pre className="bg-white p-2 border border-slate-200 rounded text-[10px] text-slate-800 overflow-x-auto max-h-40">
                                {log.response}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className="mt-16 bg-slate-950 border-t border-slate-855 py-8 text-center text-slate-500 text-xs">
        <p>© 2026 PWL Kuis 2 • book-client-app</p>
        <p className="mt-1 text-slate-600 font-mono">Running Port: 3001 | Target Environment: Node NextJS</p>
      </footer>
    </div>
  );
}