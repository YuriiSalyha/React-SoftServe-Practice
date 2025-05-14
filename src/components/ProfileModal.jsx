import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // 🔁 заміни шлях на свій
import styles from "../styles/ProfileModal.module.css";

const ProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Помилка при отриманні користувача:", error.message);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.removeItem("user");
      onClose();
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const handlePasswordChange = () => {
    if (oldPassword !== user?.user_metadata?.password) {
      alert("Старий пароль невірний.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Нові паролі не співпадають.");
      return;
    }

    const updatedUser = {
      ...user,
      user_metadata: {
        ...user.user_metadata,
        password: newPassword,
      },
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Пароль змінено успішно.");
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
                  {user?.user_metadata?.username || user?.email || "Guest"}
                </div>
                <div className={styles.role}>
                  User group: {user?.user_metadata?.role || "User"}
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
              <button
                className={styles.actionButton}
                onClick={() => {
                  onClose();
                  navigate("/admin/panel");
                }}
              >
                🛠️ Admin panel
              </button>
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
