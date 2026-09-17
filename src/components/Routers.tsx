import { Routes, Route, Navigate } from "react-router-dom";

import { Results } from "./Results";

export const Routers = () => {
  return (
    <div className="p-4">
      <Routes>
        {["/search", "/images", "/news", "/videos"].map((path) => (
          <Route key={path} path={path} element={<Results />} />
        ))}

        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </div>
  );
};
