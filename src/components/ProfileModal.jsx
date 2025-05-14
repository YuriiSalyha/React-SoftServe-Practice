import React, { useEffect, useState } from "react";
import styles from "../styles/ProfileModal.module.css";

const ProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Помилка при парсингу user з localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // повне оновлення
  };

  const handlePasswordChange = () => {
    if (oldPassword !== user.password) {
      alert("Old password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Password changed successfully.");
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {!isEditing ? (
          <>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="User"
                />
              </div>
              <div>
                <div className={styles.username}>
                  {user?.username || "Guest"}
                </div>
                <div className={styles.role}>
                  User group: {user?.role || "User"}
                </div>
              </div>
            </div>

            <div className={styles.buttonGrid}>
              <button
                className={styles.actionButton}
                onClick={() => setIsEditing(true)}
              >
                ⚙️ Edit profile
              </button>
              <button className={styles.actionButton} onClick={handleLogout}>
                ↩️ Log out
              </button>
              {user?.role === "admin" && (
                <button className={styles.actionButton}>🛠️ Admin panel</button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.editSection}>
              <h3>🔒 Change Password</h3>

              <input
                type="password"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={styles.inputField}
              />

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.inputField}
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.inputField}
              />

              <div className={styles.buttonGrid}>
                <button
                  className={styles.actionButton}
                  onClick={handlePasswordChange}
                >
                  ✅ Confirm
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => setIsEditing(false)}
                >
                  🔙 Back
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
