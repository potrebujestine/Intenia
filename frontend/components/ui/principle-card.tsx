import React from "react";
import { LucideIcon } from "lucide-react";

interface PrincipleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PrincipleCard({ icon: Icon, title, description }: PrincipleCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors p-8">
      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-brand-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}