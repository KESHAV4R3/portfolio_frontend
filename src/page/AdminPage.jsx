import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../redux/slice/applicationSlice";
import apiLinks from "../services/apliLinks";
import apiConnector from "../services/apiConnector";
import toast from "react-hot-toast";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [mailSendLoading, setMailLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [users, setUsers] = useState([]); // Source of truth from API
  const [uiUsers, setUiUsers] = useState([]); // UI-optimized version
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [togglingUserId, setTogglingUserId] = useState(null);
  const [mailModal, setMailModal] = useState({
    visible: false,
    userId: null,
    email: "",
    subject: "",
    message: "",
  });
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    dispatch(updateCurrentSection(""));
    async function automaticLogin() {
      try {
        const response = await apiConnector("post", apiLinks.automaticLogin);
        if (response.success) {
          setLoggedIn(true);
        } else {
          console.log("automatic login failed");
          setDisplayModal(true);
        }
      } catch (error) {
        console.error("Automatic login error:", error);
        setDisplayModal(true);
      }
    }
    automaticLogin();
  }, [dispatch]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setUserLoading(true);
        const response = await apiConnector("get", apiLinks.getAllUsers);
        if (response.success) {
          setUsers(response.Users);
          setUiUsers(response.Users);
        } else {
          setUsers([]);
          setUiUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setUiUsers([]);
      } finally {
        setUserLoading(false);
      }
    }

    if (loggedIn) {
      fetchUserData();
    }
  }, [loggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiConnector("post", apiLinks.userLogin, {
        userName: credentials.userName,
        password: credentials.password,
      });

      if (response.success) {
        setLoggedIn(true);
        setDisplayModal(false);
      } else {
        setError(response.message || "Login failed.");
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || "An error occurred during login.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    setTogglingUserId(userId);

    try {
      // Optimistic UI update
      setUiUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );

      const endpoint = currentStatus
        ? apiLinks.removeUserActive
        : apiLinks.makeUserActive;

      const response = await apiConnector("patch", endpoint, { userId });

      if (response.success) {
        // Update source of truth after successful API call
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isActive: !currentStatus } : user
          )
        );
      } else {
        // Revert UI if API fails
        setUiUsers(users);
        console.error("Failed to update user status");
      }
    } catch (error) {
      // Revert UI on error
      setUiUsers(users);
      console.error("Error toggling user status:", error);
    } finally {
      setTogglingUserId(null);
    }
  };

  const openMailModal = (userId, email, name) => {
    setMailModal({
      visible: true,
      userId,
      email,
      subject: "",
      message: "",
      name,
    });
  };

  const closeMailModal = () => {
    setMailModal({
      visible: false,
      userId: null,
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleMailInputChange = (e) => {
    const { name, value } = e.target;
    setMailModal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = async () => {
    try {
      setMailLoading(true);
      const response = await apiConnector("post", apiLinks.mailToUser, {
        name: mailModal.name,
        email: mailModal.email,
        query: mailModal.subject,
        message: mailModal.message,
      });

      toast.success(`Email sent to ${mailModal.email}`);
      closeMailModal();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.success("Failed to send email");
    } finally {
      setMailLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return; // If user cancels, exit function

    setDeletingUserId(userId);

    try {
      // Optimistic UI update
      setUiUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      // Call API to delete user
      const response = await apiConnector(
        "delete",
        apiLinks.deleteUser + `/${userId}`
      );

      if (!response.success) {
        setUiUsers(users); // rollback UI change
        toast.error("Failed to delete user");
      } else {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setUiUsers(users);
      alert("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  if (!loggedIn) {
    return (
      <div className="bg-gray-900 w-full h-screen flex items-center justify-center pt-30">
        {displayModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-4">
                Admin Login
              </h2>
              {error && (
                <div className="mb-4 p-2 bg-red-500 text-white rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label
                    className="block text-gray-300 mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="userName"
                    value={credentials.userName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-300 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 w-full min-h-screen text-white pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>

          {userLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : uiUsers.length === 0 ? (
            <p className="text-gray-400">No users found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uiUsers.map((user) => (
                <div
                  key={user._id}
                  className={`bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition-shadow ${
                    !user.isActive ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {user.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive
                          ? "bg-green-600 text-black"
                          : "bg-red-600 text-black"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="font-medium">Last Active:</span>{" "}
                    {formatDate(user.lastActive)}
                  </p>

                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Queries:
                    </h4>
                    {user.queryRaised && user.queryRaised.length > 0 ? (
                      <ul className="text-xs text-gray-400 list-disc ml-5">
                        {user.queryRaised.map((query, index) => (
                          <li key={index}>{query}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-400">No queries</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => toggleUserStatus(user._id, user.isActive)}
                      disabled={togglingUserId === user._id}
                      className={`px-3 py-1 text-xs rounded cursor-pointer ${
                        user.isActive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white disabled:opacity-50`}
                    >
                      {togglingUserId === user._id
                        ? "Processing..."
                        : user.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                    <button
                      onClick={() =>
                        openMailModal(user._id, user.email, user.name)
                      }
                      className="px-3 py-1 cursor-pointer text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Send Mail
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      disabled={deletingUserId === user._id}
                      className="px-3 py-1 text-xs bg-red-700 cursor-pointer hover:bg-red-800 text-white rounded disabled:opacity-50"
                    >
                      {deletingUserId === user._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email Modal */}
      {mailModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Send Email to {mailModal.email}
              </h2>
              <button
                onClick={closeMailModal}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="subject">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={mailModal.subject}
                onChange={handleMailInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a query</option>
                {users
                  .find((user) => user._id === mailModal.userId)
                  ?.queryRaised?.map((query, index) => (
                    <option key={index} value={query}>
                      {query}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={mailModal.message}
                onChange={handleMailInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeMailModal}
                className="px-4 py-2 bg-gray-600 cursor-pointer hover:bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                disabled={mailSendLoading}
                onClick={sendEmail}
                className="px-4 disabled:cursor-not-allowed py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                {mailSendLoading ? (
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <div>Sending mail ....</div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-3 cursor-pointer">
                    <div>send mail</div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
