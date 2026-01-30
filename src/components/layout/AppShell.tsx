import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, BarChart3, Settings, Menu, X, User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: LinkIcon, label: 'My Links', path: '/links' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#FF5733] selection:text-white overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5733] to-[#FFC300] flex items-center justify-center">
            <LinkIcon className="text-white w-5 h-5" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">LinkHub</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 w-72 bg-slate-900/40 backdrop-blur-xl border-r border-white/10 
          transform transition-transform duration-300 z-40 lg:transform-none flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            <div className="hidden lg:flex items-center gap-3 font-bold text-2xl tracking-tight mb-10 text-white">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5733] to-[#FFC300] flex items-center justify-center shadow-lg shadow-[#FF5733]/20">
                <LinkIcon className="text-white w-6 h-6" />
              </div>
              LinkHub
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                      ${isActive 
                        ? 'text-white shadow-lg shadow-[#FF5733]/10' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#FF5733]/20 to-[#FF5733]/5 border border-[#FF5733]/20 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-[#FF5733]' : 'group-hover:text-white transition-colors'}`} />
                    <span className="font-medium relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-white/10 bg-slate-900/20">
             <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[#FF5733]/10 to-[#FFC300]/5 border border-[#FF5733]/20">
                <div className="flex items-center gap-2 mb-2 text-[#FFC300] font-semibold text-sm">
                  <Zap className="w-4 h-4" /> Pro Plan
                </div>
                <p className="text-xs text-slate-400 mb-3">Unlock analytics & custom themes.</p>
                <button className="w-full py-2 bg-[#FF5733] hover:bg-[#ff6b4a] text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-[#FF5733]/20">
                  Upgrade
                </button>
             </div>

            <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-all text-left">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Creator Account</p>
                <p className="text-xs text-slate-400 truncate">@username</p>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-slate-950 scroll-smooth">
           {/* Ambient Background Effects */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#FF5733]/10 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#FFC300]/5 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10 max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
