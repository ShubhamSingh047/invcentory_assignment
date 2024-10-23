import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="card">
    <div className="text-3xl text-white">{icon}</div>
    <div>
      <h4 className="text-lg text-gray-300">{label}</h4>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default StatCard;
