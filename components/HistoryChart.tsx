import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';


export default function HistoryChart({ historyData }: { historyData: any[] }) {
  if (!historyData || historyData.length === 0) return null;

  return (
    <div className="w-full p-8 glass-card rounded-3xl shadow-2xl animate-fade-in [animation-delay:200ms]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-indigo-300 opacity-70">
          Variação Térmica (12h)
        </h3>
        <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] text-indigo-300 font-bold uppercase tracking-widest">
          Live Sync
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={historyData}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            dy={10}
          />
          <YAxis 
            hide
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#6366f1' }}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorTemp)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}