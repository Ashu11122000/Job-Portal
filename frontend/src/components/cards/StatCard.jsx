export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg flex items-center gap-4 text-black">
      <div className="text-2xl text-indigo-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-400 uppercase">{label}</p>
        <h3 className="text-2xl font-black">{value}</h3>
      </div>
    </div>
  );
}
