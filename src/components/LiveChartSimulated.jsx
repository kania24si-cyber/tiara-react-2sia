import { useEffect, useState } from "react";

const CHART_W = 600;
const CHART_H = 160;
const PAD_X = 32;
const PAD_Y = 16;
const INNER_W = CHART_W - PAD_X * 2;
const INNER_H = CHART_H - PAD_Y * 2;

const LABELS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function buildPath(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = PAD_X + (i / (data.length - 1)) * INNER_W;
    const y = PAD_Y + INNER_H - ((v - min) / range) * INNER_H;
    return [x, y];
  });

  // Smooth cubic bezier
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = (points[i - 1][0] + points[i][0]) / 2;
    const cp1y = points[i - 1][1];
    const cp2x = cp1x;
    const cp2y = points[i][1];
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i][0]},${points[i][1]}`;
  }

  const areaD =
    d +
    ` L ${points[points.length - 1][0]},${CHART_H - PAD_Y}` +
    ` L ${points[0][0]},${CHART_H - PAD_Y} Z`;

  return { d, areaD, points };
}

export default function LiveChartSimulated({ currentRevenue }) {
  const [data, setData] = useState([30, 45, 60, 25, 70, 45, 90, 65, 40, 85, 55, 75]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const chartTick = setInterval(() => {
      setData(prev => [...prev.slice(1), Math.floor(Math.random() * 65) + 30]);
    }, 4000);
    return () => clearInterval(chartTick);
  }, []);

  const { d, areaD, points } = buildPath(data);
  const lastPt = points[points.length - 1];

  return (
    <div className="space-y-3">
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-50/60 border border-slate-100">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          style={{ height: 160 }}
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            {/* Gradient area bawah garis */}
            <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.01" />
            </linearGradient>
            {/* Gradient untuk garis itu sendiri */}
            <linearGradient id="lineStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Grid Lines Horizontal */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
            const y = PAD_Y + INNER_H * (1 - frac);
            return (
              <line
                key={i}
                x1={PAD_X}
                y1={y}
                x2={CHART_W - PAD_X}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={i === 0 ? "0" : "4 4"}
              />
            );
          })}

          {/* Area shading di bawah garis */}
          <path d={areaD} fill="url(#lineAreaGrad)" />

          {/* Garis utama (line chart) */}
          <path
            d={d}
            fill="none"
            stroke="url(#lineStrokeGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "d 0.7s ease" }}
          />

          {/* Dot pada setiap titik data */}
          {points.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={hovered === i ? 5 : 3}
              fill={i === points.length - 1 ? "#e11d48" : "#fb7185"}
              stroke="white"
              strokeWidth="1.5"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
            />
          ))}

          {/* Dot terakhir berdenyut */}
          <circle cx={lastPt[0]} cy={lastPt[1]} r="7" fill="#e11d48" fillOpacity="0.15">
            <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={lastPt[0]} cy={lastPt[1]} r="4" fill="#e11d48" stroke="white" strokeWidth="2" />

          {/* Tooltip saat hover */}
          {hovered !== null && (
            <g>
              <rect
                x={points[hovered][0] - 28}
                y={points[hovered][1] - 30}
                width="56"
                height="20"
                rx="6"
                fill="#0f172a"
                fillOpacity="0.85"
              />
              <text
                x={points[hovered][0]}
                y={points[hovered][1] - 16}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {data[hovered]}%
              </text>
            </g>
          )}

          {/* Label sumbu X (jam) */}
          {LABELS.map((label, i) => {
            const x = PAD_X + (i / (LABELS.length - 1)) * INNER_W;
            return (
              <text
                key={i}
                x={x}
                y={CHART_H - 2}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="8"
                fontFamily="monospace"
              >
                {i % 2 === 0 ? label : ""}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Footer info */}
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-gradient-to-r from-pink-400 to-rose-600 rounded-full inline-block" />
          Timeline Transaksi Real-Time
        </span>
        <span className="font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
          ACC: Rp {(currentRevenue / 1_000_000).toFixed(2)} Jt
        </span>
      </div>
    </div>
  );
}