import { ArrowRight, BarChart2, Globe, MousePointer2, Plus, Share2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Welcome back, <span className="text-[#FF5733]">Creator</span>
          </h1>
          <p className="text-lg text-slate-400">Here's what's happening with your LinkHub today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <Share2 className="w-4 h-4" /> Share LinkHub
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Views', value: '12.5K', change: '+12%', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Link Clicks', value: '8,240', change: '+5%', icon: MousePointer2, color: 'text-[#FF5733]', bg: 'bg-[#FF5733]/10' },
          { label: 'Avg. CTR', value: '65%', change: '+2.4%', icon: BarChart2, color: 'text-[#FFC300]', bg: 'bg-[#FFC300]/10' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Action Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Links */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-semibold text-white">Your Top Links</h2>
             <button className="text-[#FF5733] text-sm font-medium hover:text-[#FFC300] transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
             {[
               { title: "Latest YouTube Video", url: "youtube.com/watch?v=...", clicks: 1240, active: true },
               { title: "My Portfolio", url: "portfolio.design", clicks: 856, active: true },
               { title: "Book a Consultation", url: "calendly.com/user/meet", clicks: 432, active: false },
             ].map((link, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-12 rounded-full bg-slate-700 group-hover:bg-[#FF5733] transition-colors" />
                    <div>
                      <h3 className="text-white font-medium text-lg">{link.title}</h3>
                      <p className="text-slate-400 text-sm font-mono">{link.url}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-white font-bold">{link.clicks}</div>
                    <div className="text-xs text-slate-500">clicks</div>
                 </div>
               </div>
             ))}
             
             <button className="w-full py-4 border border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FF5733] group-hover:text-white transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="font-medium">Add New Link</span>
             </button>
          </div>
        </div>

        {/* Quick Tips / Promo */}
        <div className="lg:col-span-1">
           <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF5733] to-[#FFC300] text-slate-900 h-full relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Pro Tip 💡</h3>
                <p className="font-medium mb-6 leading-relaxed opacity-90">
                  Adding a video directly to your LinkHub can increase engagement by up to 40%. Try it out today!
                </p>
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-colors text-sm">
                  Add Video Content
                </button>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5" />
           </div>
        </div>
      </div>
    </div>
  );
}
