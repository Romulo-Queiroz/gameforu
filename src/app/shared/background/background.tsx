"use client";

import React from "react";

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-300/30 rounded-full animate-ping"></div>
        
        {/* Medium circles */}
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-blue-500/25 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-purple-500/25 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-2/3 left-1/6 w-16 h-16 bg-blue-400/30 rounded-full animate-ping delay-700"></div>
        
        {/* Small circles */}
        <div className="absolute top-1/6 right-1/6 w-12 h-12 bg-blue-300/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/6 left-1/6 w-10 h-10 bg-purple-300/40 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-1/2 right-1/6 w-8 h-8 bg-blue-500/35 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/2 right-1/2 w-6 h-6 bg-purple-400/35 rounded-full animate-pulse delay-500"></div>
        
        {/* Floating dots */}
        <div className="absolute top-1/5 left-1/5 w-4 h-4 bg-white/20 rounded-full animate-ping delay-200"></div>
        <div className="absolute top-3/5 right-1/5 w-3 h-3 bg-white/25 rounded-full animate-pulse delay-800"></div>
        <div className="absolute bottom-1/5 left-2/5 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-400"></div>
        <div className="absolute top-4/5 right-2/5 w-3 h-3 bg-white/20 rounded-full animate-ping delay-600"></div>
      </div>
    </div>
  );
}
