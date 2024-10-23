import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setRole } from "../redux/slices/authSlice";

const RoleSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { role } = useSelector((state: RootState) => state.auth);

  const isAdmin = role === "admin";

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    dispatch(setRole(value === 1 ? "admin" : "user"));
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Slider */}
      <div className="relative w-8 h-4">
        {!isAdmin && <span className="text-sm text-white">User</span>}
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          value={isAdmin ? 1 : 0}
          onChange={handleSliderChange}
          className="w-full h-full appearance-none focus:outline-none slider-thumb"
        />
        {isAdmin && <span className="text-sm text-white">Admin</span>}
      </div>
    </div>
  );
};

export default RoleSlider;
