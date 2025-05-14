import React, { useState } from "react";
import styles from "./fieldArray.module.css";
import Button from "../../Button";

const FieldArray = ({ error, items = [], onAdd, onRemove }) => {
  const [value, setValue] = useState("");

  const handleAddClick = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue("");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "7px" }}>
      {!items.length ? (
        <p style={{ color: "#fff" }}>Немає жанрів</p>
      ) : (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {items.map((genre, index) => (
            <li key={index} style={{ color: "#fff", display: "flex", alignItems: "center", gap: "5px", border: "1px solid #fff", padding: "5px 10px", borderRadius: "7px" }}>
              {genre}
              <button  type="button" onClick={() => onRemove(index)} className={styles.btn}>×</button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Genre"
          className={styles.field__input}
          style={{ flexGrow: 1 }}
        />
        <Button type="button" onClick={handleAddClick} style={{ height: "33px", width: "150px" }}>
          Додати жанр
        </Button>
      </div>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default FieldArray;
