import { Outlet, Link } from "react-router-dom";
import styles from "./layout.module.css";
const AdminLayout = () => {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Адмін панель</h1>
        <ul className={styles.navbar__list}>
          <li>
            <Link to="/admin/panel">Головна</Link>
          </li>
          <li>
            <Link to="/admin/movie/add">Додати фільм</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
