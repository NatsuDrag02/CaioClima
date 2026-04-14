export default function WeatherCard({ data, loading }) {
  if (loading) {
    return (
      <div className="p-12 rounded-3xl glass-card animate-pulse flex flex-col items-center justify-center min-h-[220px]">
        <div className="w-12 h-12 bg-white/20 rounded-full mb-4"></div>
        <span className="text-indigo-200/50 font-medium">Sincronizando dados...</span>
      </div>
    );
  }

  if (!data) return null;

  const temp = Math.round(data.current_weather?.temperature || data?.TEM_INS || 0);
  const umidade = data.hourly?.relativehumidity_2m?.[0] || data?.UMD_INS || 0;
  const vento = data.current_weather?.windspeed || data?.VEN_VEL || 0;

  // Dynamic gradient based on temperature
  let tempGradient = "from-blue-500/20 to-indigo-500/20";
  let textColor = "text-blue-400";
  let statusEmoji = "❄️";
  
  if (temp >= 20 && temp < 30) {
    tempGradient = "from-indigo-500/20 to-purple-500/20";
    textColor = "text-indigo-400";
    statusEmoji = "🌤️";
  } else if (temp >= 30) {
    tempGradient = "from-orange-500/20 to-red-500/20";
    textColor = "text-orange-400";
    statusEmoji = "☀️";
  }

  return (
    <div className={`relative p-8 rounded-3xl glass-card border-white/10 shadow-2xl mb-10 overflow-hidden group animate-fade-in`}>
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${tempGradient} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700`}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-indigo-300 opacity-70 mb-1">
              Condições Atuais
            </h2>
            <p className="text-white/90 text-2xl font-light">Céu Limpo</p>
          </div>
          <span className="text-4xl">{statusEmoji}</span>
        </div>

        <div className="flex items-baseline gap-2 mb-8">
          <span className={`text-8xl font-black tracking-tighter ${textColor} drop-shadow-2xl`}>
            {temp}
          </span>
          <span className="text-4xl font-light text-white/40">°C</span>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
          <div className="flex flex-col">
            <span className="text-xs text-white/40 uppercase tracking-tighter mb-1">Umidade</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium text-white/80">{umidade}%</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white/40 uppercase tracking-tighter mb-1">Vento</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium text-white/80">{vento} km/h</span>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}