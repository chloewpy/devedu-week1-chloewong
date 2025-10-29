"use client";

import { AIFeatures } from '@/components/AIFeatures';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

export default function AIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button 
              variant="outline" 
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Golden's Profile
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <AIFeatures />
          </div>
        </div>
      </div>
    </div>
  );
}
