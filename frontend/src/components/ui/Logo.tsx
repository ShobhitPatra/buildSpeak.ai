import { Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
        <Sparkles className="w-8 h-8 text-purple-300" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-lg animate-pulse"></div>
      </div>
    </div>
  );
};
