'use client';
import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import HistoryChart from '../components/HistoryChart';

export default function Dashboard() {
  const [station, setStation] = useState('A701');
  const [weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(`/api/clima?estacao=${station}`);
      const data = await res.json();

      setWeather(data);

      if (data.hourly) {
        const history = data.hourly.time.slice(0, 12).map((t, i) => ({
          time: new Date(t).getHours() + 'h',
          temp: data.hourly.temperature_2m[i]
        }));
        setChartData(history);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [station]);

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20"></div>
              <h1 className="text-3xl font-black tracking-tighter text-white">
                Caio<span className="text-indigo-500">Clima</span>
              </h1>
            </div>
            <p className="text-slate-400 font-medium">
              Inteligência climática em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm self-start md:self-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Localização</span>
            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="bg-transparent border-none text-white font-semibold focus:outline-none cursor-pointer text-sm"
            >
              <option value="A701" className="bg-slate-900">São Paulo, SP</option>
              <option value="A201" className="bg-slate-900">Rio de Janeiro, RJ</option>
              <option value="A301" className="bg-slate-900">Belo Horizonte, MG</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <WeatherCard data={weather} loading={loading} />
          <HistoryChart historyData={chartData} />
        </div>

        <footer className="mt-16 text-center opacity-30">
          <p className="text-xs uppercase tracking-[0.3em] font-bold">
            Powered by CaioClima Engine &copy; 2026
          </p>
        </footer>

      </div>
    </main>
  );
}