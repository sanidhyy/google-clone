import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Results } from "./Results";

// Routers
export const Routers = () => {
  return (
    <div className="p-4">
      {/* Routes */}
      <Routes>
        {["/search", "/images", "/news", "/videos"].map((path) => (
          <Route key="Results" path={path} element={<Results />} />
        ))}

        {/* Redirect on wrong route */}
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </div>
  );
};
