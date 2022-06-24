import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Results } from "./Results";

export const Routers = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />

        {["/search", "/images", "/news", "/videos"].map((path) => (
          <Route key="Results" path={path} element={<Results />} />
        ))}
      </Routes>
    </div>
  );
};
