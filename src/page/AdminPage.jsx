import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../redux/slice/applicationSlice";
import apiLinks from "../services/apliLinks";
import apiConnector from "../services/apiConnector";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaUserShield, FaTerminal, FaEnvelope, FaTrash, FaPowerOff, 
    FaArrowLeft, FaSearch, FaDatabase, FaCheck, FaTimes, FaEye 
} from "react-icons/fa";

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- State ---
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayModal, setDisplayModal] = useState(false); 
  const [users, setUsers] = useState([]);
  const [uiUsers, setUiUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [credentials, setCredentials] = useState({ userName: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // Modals State
  const [mailModal, setMailModal] = useState({ visible: false, userId: null, email: "", subject: "", message: "", name: "" });
  const [actionModal, setActionModal] = useState({ visible: false, type: "", user: null }); // type: 'toggle' | 'delete'
  const [actionLoading, setActionLoading] = useState(false);
  const [queryModal, setQueryModal] = useState({ visible: false, queries: [] });

  // --- Effects ---
  useEffect(() => {
    dispatch(updateCurrentSection(""));
    const autoLogin = async () => {
      try {
        const res = await apiConnector("post", apiLinks.automaticLogin);
        // FIX: Access .success directly
        if (res.success) setLoggedIn(true);
        else setDisplayModal(true);
      } catch (e) { setDisplayModal(true); }
    };
    autoLogin();
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn) fetchUsers();
  }, [loggedIn]);

  useEffect(() => {
    if (!searchQuery) setUiUsers(users);
    else {
      const lower = searchQuery.toLowerCase();
      setUiUsers(users.filter(u => 
        u.name?.toLowerCase().includes(lower) || 
        u.email?.toLowerCase().includes(lower)
      ));
    }
  }, [searchQuery, users]);

  // --- Actions ---
  const fetchUsers = async () => {
    setDataLoading(true);
    try {
      const res = await apiConnector("get", apiLinks.getAllUsers);
      // FIX: Access .success directly
      if (res.success) {
        setUsers(res.Users); // FIX: Access .Users directly
        setUiUsers(res.Users);
      }
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await apiConnector("post", apiLinks.userLogin, credentials);
      // FIX: Access .success directly
      if (res.success) {
        setLoggedIn(true);
        setDisplayModal(false);
      } else {
        setAuthError(res.message || "Access Denied"); // FIX: Access .message directly
      }
    } catch (e) { 
        setAuthError(e.response?.data?.message || "Connection Failed"); 
    }
    finally { setAuthLoading(false); }
  };

  const executeToggleStatus = async () => {
    if (!actionModal.user) return;
    setActionLoading(true);
    try {
      const { _id, isActive } = actionModal.user;
      const endpoint = isActive ? apiLinks.removeUserActive : apiLinks.makeUserActive;
      const res = await apiConnector("patch", endpoint, { userId: _id });
      
      // FIX: Access .success directly
      if (res.success) {
        const updated = users.map(u => u._id === _id ? { ...u, isActive: !isActive } : u);
        setUsers(updated);
        toast.success(`Protocol ${isActive ? 'Suspended' : 'Authorized'}`);
        setActionModal({ visible: false, type: "", user: null });
      }
    } catch (e) { toast.error("Command Failed"); }
    finally { setActionLoading(false); }
  };

  const executeDelete = async () => {
    if (!actionModal.user) return;
    setActionLoading(true);
    try {
      const res = await apiConnector("delete", `${apiLinks.deleteUser}/${actionModal.user._id}`);
      // FIX: Access .success directly
      if (res.success) {
        const filtered = users.filter(u => u._id !== actionModal.user._id);
        setUsers(filtered);
        toast.success("Record Expunged");
        setActionModal({ visible: false, type: "", user: null });
      }
    } catch (e) { toast.error("Purge Failed"); }
    finally { setActionLoading(false); }
  };

  const sendEmail = async () => {
    setActionLoading(true);
    try {
      await apiConnector("post", apiLinks.mailToUser, {
        name: mailModal.name,
        email: mailModal.email,
        query: mailModal.subject,
        message: mailModal.message,
      });
      toast.success("Transmission Complete");
      setMailModal({ ...mailModal, visible: false });
    } catch (e) { toast.error("Transmission Error"); }
    finally { setActionLoading(false); }
  };

  // --- Renders ---

  // 1. LOGIN TERMINAL
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-mono overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-green-900/50 rounded shadow-[0_0_50px_rgba(0,255,0,0.05)]"
        >
            <div className="bg-[#0f0f0f] px-4 py-2 border-b border-green-900/30 flex justify-between items-center">
                <span className="text-green-600/80 text-xs tracking-widest font-bold">ROOT_ACCESS</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
            </div>
            <div className="p-8">
                <div className="text-center mb-8 text-green-500">
                    <FaUserShield size={40} className="mx-auto mb-4" />
                    <h2 className="text-xl uppercase tracking-widest font-bold">Admin Login</h2>
                </div>
                
                {authError && <div className="mb-4 text-red-500 text-xs text-center border border-red-900/50 bg-red-900/10 p-2">{authError}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        name="userName"
                        value={credentials.userName}
                        onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})}
                        className="w-full bg-black border border-gray-800 p-3 text-green-400 text-sm focus:border-green-600 focus:outline-none"
                        placeholder="USERNAME"
                        autoComplete="off"
                    />
                    <input
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})}
                        className="w-full bg-black border border-gray-800 p-3 text-green-400 text-sm focus:border-green-600 focus:outline-none"
                        placeholder="PASSWORD"
                    />
                    <button type="submit" disabled={authLoading} className="w-full py-3 bg-green-700 hover:bg-green-600 text-black font-bold text-xs uppercase tracking-widest mt-4">
                        {authLoading ? "AUTHENTICATING..." : "ENTER SYSTEM"}
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="w-full text-xs text-gray-600 hover:text-green-500 mt-2">
                        {"<"} ABORT
                    </button>
                </form>
            </div>
        </motion.div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD (TABLE VIEW)
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 pt-24 pb-12 px-4 md:px-8 font-mono">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 w-full h-[1px] bg-blue-900/20"></div>
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,50,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,50,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-2xl text-white font-bold uppercase tracking-widest flex items-center gap-2">
                    <FaTerminal className="text-blue-500" />
                    Database_Admin
                </h1>
                <p className="text-xs text-gray-500 mt-1">v4.0.2 // SECURE_CONNECTION</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-600" />
                <input 
                    type="text" 
                    placeholder="FILTER_RECORDS..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#0a0a0a] border border-gray-800 py-2 pl-9 pr-4 text-xs text-blue-400 focus:border-blue-600 focus:outline-none w-64"
                />
            </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0a0a0a] border border-gray-800 overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#111] border-b border-gray-800 text-[10px] uppercase font-bold text-gray-500 py-3 px-4 tracking-wider">
                <div className="col-span-3">User Identity</div>
                <div className="col-span-3">Email Address</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Queries</div>
                <div className="col-span-2 text-right">Controls</div>
            </div>

            {/* Table Body */}
            {dataLoading ? (
                <div className="p-12 text-center text-blue-500 animate-pulse text-xs">LOADING_DATA_STREAMS...</div>
            ) : uiUsers.length === 0 ? (
                <div className="p-12 text-center text-gray-600 text-xs">NO_RECORDS_FOUND</div>
            ) : (
                <div className="divide-y divide-gray-900">
                    {uiUsers.map((user) => (
                        <motion.div 
                            key={user._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-12 items-center py-3 px-4 text-xs hover:bg-white/5 transition-colors group"
                        >
                            {/* User Identity */}
                            <div className="col-span-3 flex items-center gap-3">
                                <div className={`w-6 h-6 flex items-center justify-center bg-gray-900 border border-gray-700 text-[10px] font-bold ${user.isActive ? 'text-blue-400' : 'text-red-500'}`}>
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-gray-300 font-bold">{user.name}</span>
                            </div>

                            {/* Email */}
                            <div className="col-span-3 text-gray-500 truncate pr-4">{user.email}</div>

                            {/* Status */}
                            <div className="col-span-2 flex justify-center">
                                <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider ${
                                    user.isActive 
                                    ? 'bg-blue-900/10 border-blue-500/30 text-blue-400' 
                                    : 'bg-red-900/10 border-red-500/30 text-red-500'
                                }`}>
                                    {user.isActive ? 'ACTIVE' : 'SUSPENDED'}
                                </span>
                            </div>

                            {/* Queries */}
                            <div className="col-span-2 flex justify-center">
                                <button 
                                    onClick={() => setQueryModal({ visible: true, queries: user.queryRaised || [] })}
                                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                                >
                                    <FaDatabase size={10} />
                                    <span>[{user.queryRaised?.length || 0}]</span>
                                </button>
                            </div>

                            {/* Controls */}
                            <div className="col-span-2 flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setActionModal({ visible: true, type: "toggle", user })}
                                    className={`p-1.5 border rounded-sm hover:text-white transition-colors ${user.isActive ? 'border-red-900/50 text-red-500 hover:bg-red-900/50' : 'border-green-900/50 text-green-500 hover:bg-green-900/50'}`}
                                    title={user.isActive ? "Deactivate" : "Activate"}
                                >
                                    <FaPowerOff />
                                </button>
                                <button
                                    onClick={() => setMailModal({ visible: true, userId: user._id, email: user.email, name: user.name, subject: "", message: "" })}
                                    className="p-1.5 border border-blue-900/50 text-blue-500 rounded-sm hover:bg-blue-900/50 hover:text-white transition-colors"
                                    title="Send Mail"
                                >
                                    <FaEnvelope />
                                </button>
                                <button
                                    onClick={() => setActionModal({ visible: true, type: "delete", user })}
                                    className="p-1.5 border border-gray-800 text-gray-500 rounded-sm hover:border-red-500 hover:text-red-500 transition-colors"
                                    title="Delete Record"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* ------------------- MODALS ------------------- */}

      {/* 1. ACTION CONFIRMATION MODAL */}
      <AnimatePresence>
        {actionModal.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-sm bg-[#0c0c0c] border border-gray-800 shadow-2xl p-1"
                >
                    <div className={`p-6 border ${actionModal.type === 'delete' ? 'border-red-900/30' : 'border-blue-900/30'}`}>
                        <h3 className={`text-lg font-bold uppercase mb-2 ${actionModal.type === 'delete' ? 'text-red-500' : 'text-blue-500'}`}>
                            {actionModal.type === 'delete' ? 'Confirm Purge' : 'Status Change'}
                        </h3>
                        <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                            {actionModal.type === 'delete' 
                                ? `Are you sure you want to permanently delete user [${actionModal.user?.name}]? This action cannot be undone.` 
                                : `Requesting to ${actionModal.user?.isActive ? 'SUSPEND' : 'ACTIVATE'} access for [${actionModal.user?.name}]. Proceed?`
                            }
                        </p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setActionModal({ ...actionModal, visible: false })}
                                className="px-4 py-2 border border-gray-800 text-gray-500 text-xs hover:text-white"
                            >
                                CANCEL
                            </button>
                            <button 
                                onClick={actionModal.type === 'delete' ? executeDelete : executeToggleStatus}
                                disabled={actionLoading}
                                className={`px-4 py-2 text-xs font-bold text-black ${actionModal.type === 'delete' ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                            >
                                {actionLoading ? "PROCESSING..." : "CONFIRM"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* 2. QUERY LOG MODAL */}
      <AnimatePresence>
        {queryModal.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="w-full max-w-md bg-[#0a0a0a] border border-gray-700 shadow-2xl"
                >
                    <div className="bg-[#111] px-4 py-2 flex justify-between items-center border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400 uppercase">System Logs / Queries</span>
                        <button onClick={() => setQueryModal({ visible: false, queries: [] })} className="text-gray-500 hover:text-white">✕</button>
                    </div>
                    <div className="p-4 max-h-64 overflow-y-auto">
                        {queryModal.queries.length > 0 ? (
                            <ul className="space-y-2">
                                {queryModal.queries.map((q, i) => (
                                    <li key={i} className="bg-black border border-gray-800 p-2 text-xs text-gray-300 font-mono">
                                        <span className="text-blue-500 mr-2">[{i+1}]</span>
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-gray-600 text-xs italic py-4">No queries found in log.</div>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* 3. MAIL MODAL */}
      <AnimatePresence>
        {mailModal.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-lg bg-[#0c0c0c] border border-blue-900/30 p-1 shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                >
                    <div className="bg-[#0f0f0f] p-6 border border-gray-800">
                        <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Secure Transmission</h3>
                        
                        <div className="space-y-3">
                            <input 
                                disabled 
                                value={mailModal.email} 
                                className="w-full bg-black border border-gray-800 p-2 text-gray-500 text-xs font-mono" 
                            />
                            <select
                                value={mailModal.subject}
                                onChange={(e) => setMailModal({...mailModal, subject: e.target.value})}
                                className="w-full bg-black border border-gray-800 p-2 text-white text-xs focus:border-blue-600 outline-none"
                            >
                                <option value="">-- Select Query Ref --</option>
                                {users.find(u => u._id === mailModal.userId)?.queryRaised?.map((q, i) => (
                                    <option key={i} value={q}>{q}</option>
                                ))}
                            </select>
                            <textarea
                                rows={4}
                                value={mailModal.message}
                                onChange={(e) => setMailModal({...mailModal, message: e.target.value})}
                                className="w-full bg-black border border-gray-800 p-2 text-white text-xs focus:border-blue-600 outline-none resize-none"
                                placeholder="ENTER_MESSAGE_PAYLOAD..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button 
                                onClick={() => setMailModal({ ...mailModal, visible: false })}
                                className="px-4 py-2 text-gray-500 text-xs hover:text-white"
                            >
                                ABORT
                            </button>
                            <button 
                                onClick={sendEmail}
                                disabled={actionLoading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                            >
                                {actionLoading ? "SENDING..." : "TRANSMIT"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminPage;