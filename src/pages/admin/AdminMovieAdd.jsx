import React from "react";
import { useState } from "react";
import { MethodChoose } from "../../components/Admin/AddMovie";

const AdminMovieAdd = () => {
  return (
    <div style={{
      minHeight: "100vh"
    }}>
      <MethodChoose />
    </div>
  );
};

export default AdminMovieAdd;
