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

  // --- State (Unaltered) ---
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayModal, setDisplayModal] = useState(false); 
  const [users, setUsers] = useState([]);
  const [uiUsers, setUiUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [credentials, setCredentials] = useState({ userName: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // Modals State (Unaltered)
  const [mailModal, setMailModal] = useState({ visible: false, userId: null, email: "", subject: "", message: "", name: "" });
  const [actionModal, setActionModal] = useState({ visible: false, type: "", user: null }); // type: 'toggle' | 'delete'
  const [actionLoading, setActionLoading] = useState(false);
  const [queryModal, setQueryModal] = useState({ visible: false, queries: [] });

  // --- Effects (Unaltered) ---
  useEffect(() => {
    dispatch(updateCurrentSection(""));
    const autoLogin = async () => {
      try {
        const res = await apiConnector("post", apiLinks.automaticLogin);
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

  // --- Actions (Unaltered) ---
  const fetchUsers = async () => {
    setDataLoading(true);
    try {
      const res = await apiConnector("get", apiLinks.getAllUsers);
      if (res.success) {
        setUsers(res.Users); 
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
      if (res.success) {
        setLoggedIn(true);
        setDisplayModal(false);
      } else {
        setAuthError(res.message || "Access Denied");
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

  // 1. LOGIN TERMINAL (Redesigned with Premium Dark Theme)
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 radial-fade pointer-events-none"></div>
        
        <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-sm bg-zinc-950/80 border border-white/5 rounded-2xl shadow-2xl p-8 space-y-6"
        >
            <div className="text-center space-y-2">
                <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl w-fit mx-auto text-white">
                  <FaUserShield size={24} />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight uppercase">Admin Console</h2>
                <p className="text-xs text-zinc-500">Provide admin credentials to access database logs.</p>
            </div>
            
            {authError && (
              <div className="text-[11px] font-mono text-red-400 border border-red-950 bg-red-950/20 p-3 rounded-lg text-center">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-bold text-zinc-400 uppercase tracking-wider">Username</label>
                  <input
                      name="userName"
                      value={credentials.userName}
                      onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})}
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-lg p-3 text-white outline-none focus:border-zinc-500 transition-colors"
                      placeholder="USERNAME"
                      autoComplete="off"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                  <input
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, [e.target.name]: e.target.value})}
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-lg p-3 text-white outline-none focus:border-zinc-500 transition-colors"
                      placeholder="PASSWORD"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={authLoading} 
                  className="w-full py-3.5 bg-white text-black font-bold uppercase tracking-widest rounded-lg cursor-pointer hover:bg-zinc-200 active:scale-[0.98] transition-all mt-6 disabled:opacity-50"
                >
                    {authLoading ? "AUTHENTICATING..." : "ENTER SYSTEM"}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/')} 
                  className="w-full text-center text-zinc-500 hover:text-zinc-300 font-medium pt-2 transition-colors cursor-pointer"
                >
                    &larr; Abort & Exit
                </button>
            </form>
        </motion.div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD (Redesigned with Premium Dark Theme)
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 pt-24 pb-12 px-6">
      {/* Background Grids */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 radial-fade pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Top Header & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-6 border-b border-white/5">
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <FaTerminal className="text-zinc-500" />
                    Admin Control Panel
                </h1>
                <p className="text-xs text-zinc-500 font-mono">SECURE DATABASE GATEWAY // v2.2.0</p>
            </div>
            
            {/* Search Box */}
            <div className="relative w-full sm:w-64 text-xs">
                <FaSearch className="absolute left-3.5 top-3.5 text-zinc-500" />
                <input 
                    type="text" 
                    placeholder="Filter records..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-white/5 py-3 pl-10 pr-4 text-white rounded-lg outline-none focus:border-zinc-500 transition-colors"
                />
            </div>
        </div>

        {/* Data Table Panel */}
        <div className="bg-zinc-950/80 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-zinc-900/40 border-b border-white/5 text-[10px] uppercase font-bold text-zinc-500 py-4 px-6 tracking-widest font-mono">
                <div className="col-span-4 sm:col-span-3">User Identity</div>
                <div className="col-span-5 sm:col-span-4">Email Address</div>
                <div className="col-span-3 sm:col-span-2 text-center">Status</div>
                <div className="hidden sm:block sm:col-span-1 text-center">Queries</div>
                <div className="col-span-3 sm:col-span-2 text-right">Controls</div>
            </div>

            {/* Table Body */}
            {dataLoading ? (
                <div className="p-16 text-center text-zinc-500 animate-pulse text-xs font-mono">LOADING_DATA_STREAMS...</div>
            ) : uiUsers.length === 0 ? (
                <div className="p-16 text-center text-zinc-500 text-xs font-mono">NO_RECORDS_FOUND</div>
            ) : (
                <div className="divide-y divide-white/5">
                    {uiUsers.map((user) => (
                        <div 
                            key={user._id}
                            className="grid grid-cols-12 items-center py-4 px-6 text-xs hover:bg-zinc-900/30 transition-colors group"
                        >
                            {/* User Identity */}
                            <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
                                <div className={`w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 border text-[10px] font-bold ${
                                  user.isActive ? 'border-emerald-500/20 text-emerald-400' : 'border-red-500/20 text-red-400'
                                }`}>
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-zinc-200 font-semibold truncate max-w-[120px]">{user.name}</span>
                            </div>

                            {/* Email */}
                            <div className="col-span-5 sm:col-span-4 text-zinc-400 truncate pr-4">{user.email}</div>

                            {/* Status */}
                            <div className="col-span-3 sm:col-span-2 flex justify-center">
                                <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-mono rounded ${
                                    user.isActive 
                                    ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' 
                                    : 'bg-red-950/20 border-red-500/20 text-red-400'
                                }`}>
                                    {user.isActive ? 'ACTIVE' : 'SUSPENDED'}
                                </span>
                            </div>

                            {/* Queries Count */}
                            <div className="hidden sm:col-span-1 sm:flex justify-center">
                                <button 
                                    onClick={() => setQueryModal({ visible: true, queries: user.queryRaised || [] })}
                                    className="flex items-center gap-1.5 hover:text-white text-zinc-500 transition-colors text-[11px] font-mono cursor-pointer"
                                >
                                    <FaDatabase size={10} />
                                    <span>[{user.queryRaised?.length || 0}]</span>
                                </button>
                            </div>

                            {/* Controls */}
                            <div className="col-span-3 sm:col-span-2 flex justify-end gap-2">
                                <button
                                    onClick={() => setActionModal({ visible: true, type: "toggle", user })}
                                    className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                                      user.isActive 
                                        ? 'border-red-500/10 text-red-400 hover:bg-red-500/10' 
                                        : 'border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10'
                                    }`}
                                    title={user.isActive ? "Deactivate" : "Activate"}
                                >
                                    <FaPowerOff size={11} />
                                </button>
                                <button
                                    onClick={() => setMailModal({ visible: true, userId: user._id, email: user.email, name: user.name, subject: "", message: "" })}
                                    className="p-2 border border-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                                    title="Send Mail"
                                >
                                    <FaEnvelope size={11} />
                                </button>
                                <button
                                    onClick={() => setActionModal({ visible: true, type: "delete", user })}
                                    className="p-2 border border-zinc-800 text-zinc-500 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer"
                                    title="Delete Record"
                                >
                                    <FaTrash size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        {/* Return Button */}
        <div className="pt-2 text-left">
          <button 
            onClick={() => navigate("/")} 
            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors font-medium cursor-pointer"
          >
            <FaArrowLeft size={10} /> Return to homepage
          </button>
        </div>
      </div>

      {/* ------------------- MODALS (Redesigned) ------------------- */}

      {/* 1. ACTION CONFIRMATION MODAL */}
      <AnimatePresence>
        {actionModal.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    className="w-full max-w-sm bg-zinc-950 border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl"
                >
                    <div className="space-y-2">
                        <h3 className={`text-base font-bold uppercase tracking-wider ${actionModal.type === 'delete' ? 'text-red-400' : 'text-zinc-200'}`}>
                            {actionModal.type === 'delete' ? 'Confirm Purge' : 'Access Change'}
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            {actionModal.type === 'delete' 
                                ? `Are you sure you want to permanently purge user [${actionModal.user?.name}]? This action is irreversible.` 
                                : `Do you wish to ${actionModal.user?.isActive ? 'SUSPEND' : 'ACTIVATE'} access permissions for [${actionModal.user?.name}]?`
                            }
                        </p>
                    </div>
                    <div className="flex justify-end gap-3 text-xs">
                        <button 
                            onClick={() => setActionModal({ ...actionModal, visible: false })}
                            className="px-4 py-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                        >
                            CANCEL
                        </button>
                        <button 
                            onClick={actionModal.type === 'delete' ? executeDelete : executeToggleStatus}
                            disabled={actionLoading}
                            className={`px-4 py-2 font-bold text-black rounded-lg cursor-pointer ${
                              actionModal.type === 'delete' ? 'bg-red-500 hover:bg-red-400' : 'bg-white hover:bg-zinc-200'
                            }`}
                        >
                            {actionLoading ? "PROCESSING..." : "CONFIRM"}
                        </button>
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
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 15, opacity: 0 }}
                    className="w-full max-w-md bg-zinc-950 border border-white/5 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="bg-zinc-900/40 px-5 py-4 flex justify-between items-center border-b border-white/5">
                        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <FaDatabase size={10} className="text-zinc-500" /> User Query Logs
                        </span>
                        <button onClick={() => setQueryModal({ visible: false, queries: [] })} className="text-zinc-500 hover:text-white transition-colors cursor-pointer">✕</button>
                    </div>
                    <div className="p-5 max-h-64 overflow-y-auto text-xs font-mono text-zinc-400 space-y-2">
                        {queryModal.queries.length > 0 ? (
                            <ul className="space-y-2">
                                {queryModal.queries.map((q, i) => (
                                    <li key={i} className="bg-zinc-900/30 border border-white/5 p-3 rounded-lg flex items-start gap-3">
                                        <span className="text-zinc-600">0{i+1}</span>
                                        <span className="text-zinc-300 select-all">{q}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-zinc-600 italic py-4">No queries found in log channels.</div>
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
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    className="w-full max-w-md bg-zinc-950 border border-white/5 rounded-2xl p-6 space-y-5 shadow-2xl"
                >
                    <div className="space-y-1">
                        <h3 className="text-zinc-200 font-bold uppercase tracking-wider text-sm">Send User Email</h3>
                        <p className="text-xs text-zinc-500">Transmits message payload directly to client inbox.</p>
                    </div>
                    
                    <div className="space-y-3.5 text-xs">
                        <div className="space-y-1">
                          <label className="block font-bold text-zinc-400 uppercase tracking-wider">To</label>
                          <input 
                              disabled 
                              value={mailModal.email} 
                              className="w-full bg-zinc-900/50 border border-white/5 p-3 rounded-lg text-zinc-500 font-mono outline-none" 
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="block font-bold text-zinc-400 uppercase tracking-wider">Reference Query</label>
                          <select
                              value={mailModal.subject}
                              onChange={(e) => setMailModal({...mailModal, subject: e.target.value})}
                              className="w-full bg-zinc-900/50 border border-white/5 p-3 rounded-lg text-white outline-none focus:border-zinc-500 transition-colors"
                          >
                              <option value="" className="bg-zinc-950 text-zinc-500">-- Select Reference Query --</option>
                              {users.find(u => u._id === mailModal.userId)?.queryRaised?.map((q, i) => (
                                  <option key={i} value={q} className="bg-zinc-950 text-white">{q}</option>
                              ))}
                          </select>
                        </div>
                        
                        <div className="space-y-1">
                          <label className="block font-bold text-zinc-400 uppercase tracking-wider">Message Payload</label>
                          <textarea
                              rows={4}
                              value={mailModal.message}
                              onChange={(e) => setMailModal({...mailModal, message: e.target.value})}
                              className="w-full bg-zinc-900/50 border border-white/5 p-3 rounded-lg text-white outline-none focus:border-zinc-500 transition-colors resize-none leading-relaxed"
                              placeholder="Write message content here..."
                          ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 text-xs">
                        <button 
                            onClick={() => setMailModal({ ...mailModal, visible: false })}
                            className="px-4 py-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                        >
                            ABORT
                        </button>
                        <button 
                            onClick={sendEmail}
                            disabled={actionLoading || !mailModal.subject || !mailModal.message}
                            className="px-4 py-2 bg-white hover:bg-zinc-200 text-black font-bold rounded-lg cursor-pointer disabled:opacity-50"
                        >
                            {actionLoading ? "SENDING..." : "TRANSMIT"}
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminPage;