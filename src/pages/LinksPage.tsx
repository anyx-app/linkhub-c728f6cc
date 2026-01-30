import { Plus } from 'lucide-react';

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Links</h1>
          <p className="text-slate-400">Manage and organize your public buttons.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#FF5733] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#ff451a] transition-colors shadow-lg shadow-[#FF5733]/25">
          <Plus className="w-5 h-5" /> Add Link
        </button>
      </div>

      <div className="p-12 rounded-2xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <Plus className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No links created yet</h3>
        <p className="text-slate-400 max-w-sm mb-6">
          Start building your LinkHub page by adding your first link. It could be your website, social profile, or a product.
        </p>
        <button className="text-[#FF5733] font-medium hover:underline">
          Create from template
        </button>
      </div>
    </div>
  );
}
