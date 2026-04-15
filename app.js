// ============================================================
//   QuantTrader Mobile App - Core Logic
//   Quantitative Cryptocurrency Trading System
// ============================================================

// ==================== DATA ====================

const COINS_DATA = [
  { symbol: 'BTC', name: 'Bitcoin',   icon: '₿', price: 67842.5,  change: 2.34,  volume: '18.4B', cap: '1.33T', color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum',  icon: 'Ξ', price: 3456.8,   change: 1.87,  volume: '9.2B',  cap: '415B',  color: '#627eea' },
  { symbol: 'BNB', name: 'BNB Chain', icon: 'B', price: 587.3,    change: -0.63, volume: '1.8B',  cap: '85B',   color: '#f3ba2f' },
  { symbol: 'SOL', name: 'Solana',    icon: '◎', price: 178.42,   change: 4.21,  volume: '3.1B',  cap: '78B',   color: '#9945ff' },
  { symbol: 'XRP', name: 'Ripple',    icon: '✕', price: 0.6234,   change: -1.24, volume: '2.4B',  cap: '34B',   color: '#00aae4' },
  { symbol: 'ADA', name: 'Cardano',   icon: '₳', price: 0.4821,   change: 3.15,  volume: '0.9B',  cap: '17B',   color: '#0033ad' },
  { symbol: 'AVAX',name: 'Avalanche', icon: '▲', price: 36.74,    change: 2.88,  volume: '0.7B',  cap: '15B',   color: '#e84142' },
  { symbol: 'DOT', name: 'Polkadot',  icon: '●', price: 8.43,     change: -2.11, volume: '0.5B',  cap: '11B',   color: '#e6007a' },
  { symbol: 'LINK',name: 'Chainlink', icon: '⬡', price: 16.92,    change: 5.44,  volume: '0.8B',  cap: '10B',   color: '#375bd2' },
  { symbol: 'MATIC',name:'Polygon',   icon: '⬟', price: 0.892,    change: 1.67,  volume: '0.6B',  cap: '8.9B',  color: '#8247e5' },
  { symbol: 'ARB', name: 'Arbitrum',  icon: '⬢', price: 1.234,    change: -0.45, volume: '0.4B',  cap: '4.1B',  color: '#213147' },
  { symbol: 'OP',  name: 'Optimism',  icon: '⚪', price: 2.145,    change: 6.32,  volume: '0.5B',  cap: '2.8B',  color: '#ff0420' },
];

const STRATEGIES_DATA = [
  {
    id: 1, name: 'BTC 均线策略', type: 'MA Cross', symbol: 'BTC/USDT',
    timeframe: '4h', status: 'running',
    params: { fast: 10, slow: 30 },
    metrics: { return: '+24.3%', sharpe: '2.41', winRate: '68%', drawdown: '-8.2%' },
    startDate: '2026-03-01'
  },
  {
    id: 2, name: 'ETH RSI 策略', type: 'RSI 均值回归', symbol: 'ETH/USDT',
    timeframe: '1h', status: 'paused',
    params: { period: 14, oversold: 30, overbought: 70 },
    metrics: { return: '+12.8%', sharpe: '1.87', winRate: '72%', drawdown: '-5.4%' },
    startDate: '2026-03-15'
  },
];

const STRATEGY_LIBRARY = [
  { id: 3, name: 'MACD 动量策略',  type: 'MACD',       desc: '跟踪动量，在MACD金叉死叉时交易' },
  { id: 4, name: '布林带突破',     type: 'Bollinger',   desc: '价格突破布林带上下轨时进场' },
  { id: 5, name: '多空网格策略',   type: 'Grid',        desc: '在区间内均等分布买卖单，低买高卖' },
  { id: 6, name: 'DCA 定投策略',   type: 'DCA',         desc: '定期买入，摊平成本，适合长期持有' },
];

const SIGNALS_DATA = [
  { id: 1, type: 'buy',  coin: 'BTC', strategy: 'MA均线策略',    price: 67842,  desc: '快线上穿慢线，MACD金叉确认', time: '2分钟前',  strength: '强烈买入', conf: 92 },
  { id: 2, type: 'buy',  coin: 'SOL', strategy: 'RSI策略',       price: 178.42, desc: 'RSI跌至28，超卖区域反弹信号', time: '8分钟前',  strength: '买入',   conf: 78 },
  { id: 3, type: 'sell', coin: 'XRP', strategy: 'MACD策略',      price: 0.6234, desc: 'MACD死叉，动量减弱，建议减仓', time: '15分钟前', strength: '卖出',   conf: 71 },
  { id: 4, type: 'buy',  coin: 'ETH', strategy: '布林带策略',    price: 3456.8, desc: '价格触及布林带下轨，反弹概率高', time: '23分钟前', strength: '买入',   conf: 75 },
  { id: 5, type: 'sell', coin: 'BNB', strategy: '突破策略',      price: 587.3,  desc: '未能突破关键阻力位，假突破信号', time: '41分钟前', strength: '弱卖出', conf: 62 },
  { id: 6, type: 'buy',  coin: 'LINK',strategy: 'RSI+MACD复合',  price: 16.92,  desc: 'RSI超卖 + MACD金叉双重确认', time: '1小时前',  strength: '强烈买入', conf: 89 },
];

const POSITIONS_DATA = [
  { coin: 'BTC', icon: '₿', amount: 0.8542, avgPrice: 62100, currPrice: 67842, ratio: 42 },
  { coin: 'ETH', icon: 'Ξ', amount: 12.34,  avgPrice: 3200,  currPrice: 3456.8, ratio: 28 },
  { coin: 'SOL', icon: '◎', amount: 285.6,  avgPrice: 155,   currPrice: 178.42, ratio: 15 },
  { coin: 'BNB', icon: 'B', amount: 42.1,   avgPrice: 560,   currPrice: 587.3,  ratio: 10 },
  { coin: 'USDT',icon: '$', amount: 8234.56,avgPrice: 1,     currPrice: 1,      ratio: 5  },
];

const TRADE_HISTORY = [
  { side: 'buy',  pair: 'BTC/USDT',  amount: 0.25,   price: 67200,  time: '今日 10:24', pnl: '+$482.50', isUp: true  },
  { side: 'sell', pair: 'SOL/USDT',  amount: 50,     price: 182.3,  time: '今日 09:15', pnl: '+$215.00', isUp: true  },
  { side: 'sell', pair: 'XRP/USDT',  amount: 5000,   price: 0.618,  time: '昨日 16:42', pnl: '-$72.00',  isUp: false },
  { side: 'buy',  pair: 'ETH/USDT',  amount: 2,      price: 3380,   time: '昨日 11:08', pnl: '+$153.60', isUp: true  },
  { side: 'buy',  pair: 'LINK/USDT', amount: 100,    price: 15.8,   time: '昨日 08:30', pnl: '+$112.00', isUp: true  },
];

// ==================== STATE ====================
let currentPage = 'home';
let allSignals = [...SIGNALS_DATA];
let signalFilter = 'all';
let equityChartInstance = null;
let portfolioChartInstance = null;
let backtestChartInstance = null;
let priceTickInterval = null;

// ==================== NAVIGATION ====================

function switchPage(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }

  const navTarget = document.getElementById('nav-' + page);
  if (navTarget) navTarget.classList.add('active');

  currentPage = page;

  // Init page content
  if (page === 'market') renderMarketFull();
  if (page === 'strategy') renderStrategies();
  if (page === 'signals') renderSignals();
  if (page === 'portfolio') renderPortfolio();
}

// ==================== HOME PAGE ====================

function initHome() {
  renderHomeMarket();
  renderHomeSignals();
  initEquityChart();
}

function renderHomeMarket() {
  const container = document.getElementById('home-market-list');
  if (!container) return;
  const featured = COINS_DATA.slice(0, 5);
  container.innerHTML = featured.map(c => createMarketItemHTML(c)).join('');
}

function renderHomeSignals() {
  const container = document.getElementById('home-signals');
  if (!container) return;
  container.innerHTML = SIGNALS_DATA.slice(0, 3).map(s => createSignalPreviewHTML(s)).join('');
}

function createSignalPreviewHTML(s) {
  const isUp = s.type === 'buy';
  const color = isUp ? 'var(--green)' : 'var(--red)';
  const bg = isUp ? 'var(--green-bg)' : 'var(--red-bg)';
  const icon = isUp ? '🔼' : '🔽';
  return `
    <div class="signal-item" onclick="switchPage('signals')">
      <div class="signal-icon ${s.type}" style="background:${bg}">${icon}</div>
      <div class="signal-body">
        <div class="signal-title" style="color:${color}">${s.coin}/USDT · ${s.strength}</div>
        <div class="signal-desc">${s.desc}</div>
        <div class="signal-time">${s.strategy} · ${s.time}</div>
      </div>
      <div class="signal-price">
        <div class="s-price" style="color:${color}">$${formatPrice(s.price)}</div>
        <div class="s-strength" style="color:${color}">置信度 ${s.conf}%</div>
      </div>
    </div>
  `;
}

// ==================== EQUITY CHART ====================

function initEquityChart() {
  const canvas = document.getElementById('equityChart');
  if (!canvas || equityChartInstance) return;

  const data = generateEquityData(30);

  equityChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#3b82f6',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c2128',
          borderColor: '#30363d',
          borderWidth: 1,
          titleColor: '#8b949e',
          bodyColor: '#e6edf3',
          callbacks: {
            label: ctx => ' $' + ctx.raw.toLocaleString()
          }
        }
      },
      scales: {
        x: { display: false },
        y: {
          display: true,
          grid: { color: 'rgba(48,54,61,0.5)', drawBorder: false },
          ticks: { color: '#8b949e', font: { size: 10 }, maxTicksLimit: 4,
            callback: v => '$' + (v/1000).toFixed(0) + 'K'
          },
          border: { display: false }
        }
      }
    }
  });
}

function generateEquityData(days, seed = 100000) {
  const labels = [];
  const values = [];
  let val = seed;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }));
    val *= (1 + (Math.random() - 0.42) * 0.03);
    values.push(Math.round(val));
  }
  // Make sure it ends up higher
  values[values.length - 1] = 128465;
  return { labels, values };
}

function changeTimeRange(btn, range) {
  document.querySelectorAll('.time-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const days = { '7D': 7, '1M': 30, '3M': 90, '1Y': 365 }[range] || 30;
  const data = generateEquityData(days);

  if (equityChartInstance) {
    equityChartInstance.data.labels = data.labels;
    equityChartInstance.data.datasets[0].data = data.values;
    equityChartInstance.update('active');
  }
}

// ==================== MARKET PAGE ====================

function renderMarketFull() {
  const container = document.getElementById('market-full-list');
  if (!container) return;
  container.innerHTML = COINS_DATA.map(c => createMarketItemHTML(c, true)).join('');
}

function createMarketItemHTML(coin, showVolume = false) {
  const isUp = coin.change >= 0;
  const changeClass = isUp ? 'up' : 'down';
  const changeSymbol = isUp ? '▲' : '▼';
  const bgColor = coin.color + '22';

  // Generate mini sparkline
  const sparkPath = generateSparkline(isUp);

  return `
    <div class="market-item" onclick="showCoinDetail('${coin.symbol}')">
      <div class="coin-icon" style="background:${bgColor}; color:${coin.color}; font-weight:900; font-size:18px">
        ${coin.icon}
      </div>
      <div class="coin-info">
        <div class="coin-name">${coin.symbol}</div>
        <div class="coin-fullname">${coin.name}${showVolume ? ' · Vol ' + coin.volume : ''}</div>
      </div>
      <svg class="coin-chart-mini" viewBox="0 0 60 32" preserveAspectRatio="none">
        <path d="${sparkPath}" stroke="${isUp ? '#10b981' : '#ef4444'}" stroke-width="1.5" fill="none"/>
      </svg>
      <div class="coin-price-info">
        <div class="coin-price">$${formatPrice(coin.price)}</div>
        <div class="coin-change ${changeClass}">${changeSymbol} ${Math.abs(coin.change).toFixed(2)}%</div>
      </div>
    </div>
  `;
}

function generateSparkline(trending) {
  const points = [];
  let y = trending ? 24 : 8;
  for (let x = 0; x <= 60; x += 6) {
    y += (Math.random() - (trending ? 0.35 : 0.65)) * 6;
    y = Math.max(4, Math.min(28, y));
    points.push(`${x},${y}`);
  }
  return 'M ' + points.join(' L ');
}

function filterMarket(query) {
  const q = query.toLowerCase();
  const items = document.querySelectorAll('#market-full-list .market-item');
  items.forEach((item, i) => {
    const coin = COINS_DATA[i];
    if (!coin) return;
    const match = coin.symbol.toLowerCase().includes(q) || coin.name.toLowerCase().includes(q);
    item.style.display = match ? '' : 'none';
  });
}

function setMarketTab(btn, category) {
  document.querySelectorAll('.market-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  // In a real app, this would filter by category
  showToast('已切换到 ' + btn.textContent);
}

function sortMarket(by) {
  showToast('按 ' + by + ' 排序');
}

function showCoinDetail(symbol) {
  showToast('查看 ' + symbol + ' 详情');
}

// ==================== STRATEGIES PAGE ====================

function renderStrategies() {
  renderRunningStrategies();
  renderStrategyLibrary();
}

function renderRunningStrategies() {
  const container = document.getElementById('running-strategies');
  if (!container) return;
  container.innerHTML = STRATEGIES_DATA.map(s => `
    <div class="strategy-card ${s.status}">
      <div class="strategy-header">
        <div class="strategy-name">${s.name}</div>
        <span class="strategy-status status-${s.status}">
          ${s.status === 'running' ? '🟢 运行中' : '⏸ 暂停'}
        </span>
      </div>
      <div class="strategy-meta">
        <span class="strategy-tag">📊 ${s.type}</span>
        <span class="strategy-tag">💱 ${s.symbol}</span>
        <span class="strategy-tag">⏰ ${s.timeframe}</span>
      </div>
      <div class="strategy-metrics">
        <div class="s-metric">
          <div class="s-metric-val" style="color:var(--green)">${s.metrics.return}</div>
          <div class="s-metric-label">总收益</div>
        </div>
        <div class="s-metric">
          <div class="s-metric-val">${s.metrics.sharpe}</div>
          <div class="s-metric-label">夏普比率</div>
        </div>
        <div class="s-metric">
          <div class="s-metric-val" style="color:var(--green)">${s.metrics.winRate}</div>
          <div class="s-metric-label">胜率</div>
        </div>
        <div class="s-metric">
          <div class="s-metric-val" style="color:var(--red)">${s.metrics.drawdown}</div>
          <div class="s-metric-label">最大回撤</div>
        </div>
      </div>
      <div class="strategy-actions">
        <button class="action-btn btn-backtest" onclick="openBacktestModal(${s.id})">📈 查看回测</button>
        <button class="action-btn ${s.status === 'running' ? 'btn-stop' : 'btn-start'}"
          onclick="toggleStrategy(${s.id})">
          ${s.status === 'running' ? '⏹ 停止' : '▶ 启动'}
        </button>
      </div>
    </div>
  `).join('');
}

function renderStrategyLibrary() {
  const container = document.getElementById('strategy-library');
  if (!container) return;
  container.innerHTML = STRATEGY_LIBRARY.map(s => `
    <div class="strategy-card">
      <div class="strategy-header">
        <div class="strategy-name">${s.name}</div>
        <span class="strategy-status status-backtest">📋 内置</span>
      </div>
      <div class="strategy-meta">
        <span class="strategy-tag">📊 ${s.type}</span>
      </div>
      <div style="color:var(--text-secondary);font-size:13px;margin-bottom:10px">${s.desc}</div>
      <div class="strategy-actions">
        <button class="action-btn btn-paper" onclick="showToast('开始模拟交易 ${s.name}')">🔄 模拟交易</button>
        <button class="action-btn btn-backtest" onclick="openBacktestModal(${s.id})">📈 快速回测</button>
        <button class="action-btn btn-start" onclick="showStrategyEditor()">⚡ 部署</button>
      </div>
    </div>
  `).join('');
}

function toggleStrategy(id) {
  const s = STRATEGIES_DATA.find(x => x.id === id);
  if (!s) return;
  s.status = s.status === 'running' ? 'paused' : 'running';
  renderRunningStrategies();
  showToast(s.status === 'running' ? '策略已启动 ▶' : '策略已暂停 ⏸');
}

function openBacktestModal(id) {
  const modal = document.getElementById('backtest-modal');
  if (!modal) return;

  // Generate backtest data
  const bt = generateBacktestResult();
  const content = document.getElementById('backtest-result-content');
  content.innerHTML = `
    <div class="backtest-metrics">
      <div class="bt-metric">
        <div class="bt-val" style="color:var(--green)">${bt.totalReturn}</div>
        <div class="bt-label">总收益率</div>
      </div>
      <div class="bt-metric">
        <div class="bt-val">${bt.annReturn}</div>
        <div class="bt-label">年化收益</div>
      </div>
      <div class="bt-metric">
        <div class="bt-val">${bt.sharpe}</div>
        <div class="bt-label">夏普比率</div>
      </div>
      <div class="bt-metric">
        <div class="bt-val" style="color:var(--red)">${bt.maxDD}</div>
        <div class="bt-label">最大回撤</div>
      </div>
      <div class="bt-metric">
        <div class="bt-val" style="color:var(--green)">${bt.winRate}</div>
        <div class="bt-label">胜率</div>
      </div>
      <div class="bt-metric">
        <div class="bt-val">${bt.trades}</div>
        <div class="bt-label">总交易次数</div>
      </div>
    </div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px">回测净值曲线（1年）</div>
  `;

  modal.classList.remove('hidden');

  // Draw backtest chart
  setTimeout(() => {
    drawBacktestChart();
  }, 100);
}

function drawBacktestChart() {
  const canvas = document.getElementById('backtestChart');
  if (!canvas) return;
  if (backtestChartInstance) { backtestChartInstance.destroy(); backtestChartInstance = null; }

  const data = generateEquityData(365, 10000);
  backtestChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: '策略净值',
          data: data.values,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.07)',
          borderWidth: 1.5,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
        },
        {
          label: 'BTC Buy&Hold',
          data: generateBHData(365, 10000),
          borderColor: '#f7931a',
          backgroundColor: 'transparent',
          borderWidth: 1,
          fill: false,
          tension: 0.3,
          pointRadius: 0,
          borderDash: [4, 4],
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#8b949e', font: { size: 11 }, boxWidth: 20, padding: 12 }
        },
        tooltip: {
          backgroundColor: '#1c2128',
          borderColor: '#30363d',
          borderWidth: 1,
          titleColor: '#8b949e',
          bodyColor: '#e6edf3',
        }
      },
      scales: {
        x: { display: false },
        y: {
          grid: { color: 'rgba(48,54,61,0.5)', drawBorder: false },
          ticks: { color: '#8b949e', font: { size: 10 }, maxTicksLimit: 5,
            callback: v => '$' + (v/1000).toFixed(1) + 'K'
          },
          border: { display: false }
        }
      }
    }
  });
}

function generateBHData(days, start) {
  const vals = [];
  let v = start;
  for (let i = 0; i <= days; i++) {
    v *= (1 + (Math.random() - 0.46) * 0.025);
    vals.push(Math.round(v));
  }
  return vals;
}

function generateBacktestResult() {
  return {
    totalReturn: '+' + (Math.random() * 60 + 20).toFixed(1) + '%',
    annReturn:   '+' + (Math.random() * 80 + 30).toFixed(1) + '%',
    sharpe:      (Math.random() * 2 + 1).toFixed(2),
    maxDD:       '-' + (Math.random() * 15 + 5).toFixed(1) + '%',
    winRate:     Math.round(Math.random() * 20 + 55) + '%',
    trades:      Math.round(Math.random() * 200 + 50),
  };
}

function closeBacktestModal() {
  document.getElementById('backtest-modal').classList.add('hidden');
}

// ==================== STRATEGY EDITOR ====================

const STRATEGY_PARAMS_TEMPLATES = {
  ma_cross: `
    <div class="form-group">
      <label>策略参数</label>
      <div class="param-grid">
        <div class="param-item">
          <label>快线周期</label>
          <input type="number" class="form-input" value="10" min="2" max="50">
        </div>
        <div class="param-item">
          <label>慢线周期</label>
          <input type="number" class="form-input" value="30" min="5" max="200">
        </div>
      </div>
    </div>`,
  rsi: `
    <div class="form-group">
      <label>策略参数</label>
      <div class="param-grid">
        <div class="param-item">
          <label>RSI 周期</label>
          <input type="number" class="form-input" value="14" min="5" max="50">
        </div>
        <div class="param-item">
          <label>超卖阈值</label>
          <input type="number" class="form-input" value="30" min="10" max="40">
        </div>
        <div class="param-item">
          <label>超买阈值</label>
          <input type="number" class="form-input" value="70" min="60" max="90">
        </div>
        <div class="param-item">
          <label>持仓比例 %</label>
          <input type="number" class="form-input" value="50" min="10" max="100">
        </div>
      </div>
    </div>`,
  macd: `
    <div class="form-group">
      <label>策略参数</label>
      <div class="param-grid">
        <div class="param-item">
          <label>快线 EMA</label>
          <input type="number" class="form-input" value="12">
        </div>
        <div class="param-item">
          <label>慢线 EMA</label>
          <input type="number" class="form-input" value="26">
        </div>
        <div class="param-item">
          <label>Signal 周期</label>
          <input type="number" class="form-input" value="9">
        </div>
      </div>
    </div>`,
  bollinger: `
    <div class="form-group">
      <label>策略参数</label>
      <div class="param-grid">
        <div class="param-item">
          <label>BB 周期</label>
          <input type="number" class="form-input" value="20">
        </div>
        <div class="param-item">
          <label>标准差倍数</label>
          <input type="number" class="form-input" value="2" step="0.1">
        </div>
      </div>
    </div>`,
  breakout: `
    <div class="form-group">
      <label>策略参数</label>
      <div class="param-grid">
        <div class="param-item">
          <label>回望周期</label>
          <input type="number" class="form-input" value="20">
        </div>
        <div class="param-item">
          <label>止损比例 %</label>
          <input type="number" class="form-input" value="3">
        </div>
      </div>
    </div>`,
};

function showStrategyEditor() {
  document.getElementById('strategy-editor-modal').classList.remove('hidden');
  updateStrategyParams();
}

function closeStrategyEditor() {
  document.getElementById('strategy-editor-modal').classList.add('hidden');
}

function updateStrategyParams() {
  const type = document.getElementById('strategy-type').value;
  const paramsDiv = document.getElementById('strategy-params');
  paramsDiv.innerHTML = STRATEGY_PARAMS_TEMPLATES[type] || '';
}

function selectTF(btn) {
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function runBacktest() {
  closeStrategyEditor();
  const name = document.getElementById('strategy-name').value || '未命名策略';
  showToast('⏳ 正在回测 ' + name + '...');
  setTimeout(() => {
    openBacktestModal(99);
  }, 1200);
}

function startStrategy() {
  const name = document.getElementById('strategy-name').value || '未命名策略';
  if (!name.trim()) {
    showToast('请输入策略名称');
    return;
  }
  closeStrategyEditor();
  showToast('✅ 策略 "' + name + '" 已启动');

  // Add to running strategies
  STRATEGIES_DATA.push({
    id: Date.now(), name: name, type: '自定义', symbol: 'BTC/USDT',
    timeframe: '1h', status: 'running',
    metrics: { return: '+0.00%', sharpe: '—', winRate: '—', drawdown: '—' },
    startDate: new Date().toLocaleDateString('zh-CN')
  });
  if (currentPage === 'strategy') renderStrategies();
}

// ==================== SIGNALS PAGE ====================

function renderSignals() {
  renderIndicatorOverview();
  renderSignalsList();
}

function renderIndicatorOverview() {
  const container = document.getElementById('indicator-overview');
  if (!container) return;

  const indicators = [
    { name: 'RSI (14)', value: 42.3, min: 0, max: 100, signal: '中性', signalClass: 'neutral', color: '#f59e0b' },
    { name: 'MACD',     value: 284,  min: -500, max: 500, signal: '买入', signalClass: 'buy',   color: '#10b981' },
    { name: '布林带',   value: 67.2, min: 0, max: 100, signal: '中性', signalClass: 'neutral', color: '#f59e0b' },
    { name: 'ATR (14)', value: 1842, min: 0, max: 3000, signal: '高波动', signalClass: 'neutral', color: '#8b5cf6' },
  ];

  container.innerHTML = indicators.map(ind => {
    const pct = ((ind.value - ind.min) / (ind.max - ind.min) * 100).toFixed(0);
    const colors = { buy: '#10b981', sell: '#ef4444', neutral: '#f59e0b' };
    return `
      <div class="indicator-card">
        <div class="ind-header">
          <span class="ind-name">${ind.name}</span>
          <span class="ind-signal signal-${ind.signalClass}">${ind.signal}</span>
        </div>
        <div class="ind-value" style="color:${ind.color}">${ind.value < 10 ? ind.value.toFixed(2) : Math.round(ind.value)}</div>
        <div class="ind-bar">
          <div class="ind-bar-fill" style="width:${pct}%;background:${colors[ind.signalClass]}"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSignalsList() {
  const container = document.getElementById('signals-list');
  if (!container) return;

  let filtered = allSignals;
  if (signalFilter !== 'all') filtered = allSignals.filter(s => s.type === signalFilter);

  container.innerHTML = filtered.map(s => {
    const isUp = s.type === 'buy';
    const color = isUp ? 'var(--green)' : 'var(--red)';
    const icon = isUp ? '🔼' : '🔽';
    const bg = isUp ? 'var(--green-bg)' : 'var(--red-bg)';
    const confColor = s.conf >= 85 ? '#10b981' : s.conf >= 70 ? '#f59e0b' : '#8b949e';
    return `
      <div class="signal-item" onclick="showSignalDetail(${s.id})">
        <div class="signal-icon ${s.type}" style="background:${bg}">${icon}</div>
        <div class="signal-body">
          <div class="signal-title" style="color:${color}">${s.coin}/USDT · ${s.strength}</div>
          <div class="signal-desc">${s.desc}</div>
          <div class="signal-time">📊 ${s.strategy} · 🕐 ${s.time}</div>
        </div>
        <div class="signal-price">
          <div class="s-price" style="color:${color}">$${formatPrice(s.price)}</div>
          <div class="s-strength" style="color:${confColor}">置信 ${s.conf}%</div>
        </div>
      </div>
    `;
  }).join('');

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">暂无该类型信号</div>';
  }
}

function filterSignal(btn, type) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  signalFilter = type;
  renderSignalsList();
}

function showSignalDetail(id) {
  const s = SIGNALS_DATA.find(x => x.id === id);
  if (!s) return;
  showToast(`${s.coin} 信号详情 · 置信度 ${s.conf}%`);
}

// ==================== PORTFOLIO PAGE ====================

function renderPortfolio() {
  renderPositions();
  renderTradeHistory();
  initPortfolioChart();
}

function renderPositions() {
  const container = document.getElementById('positions-list');
  if (!container) return;
  container.innerHTML = POSITIONS_DATA.map(p => {
    const pnl = ((p.currPrice - p.avgPrice) / p.avgPrice * 100);
    const pnlAbs = (p.amount * (p.currPrice - p.avgPrice)).toFixed(2);
    const isUp = pnl >= 0;
    const value = (p.amount * p.currPrice).toFixed(2);
    return `
      <div class="position-item">
        <div class="pos-header">
          <div class="pos-coin">
            <div class="pos-icon">${p.icon}</div>
            <div>
              <div class="pos-name">${p.coin}</div>
              <div class="pos-amount">${p.amount} ${p.coin}</div>
            </div>
          </div>
          <div class="pos-value">
            <div class="pos-usdt">$${Number(value).toLocaleString()}</div>
            <div class="pos-pnl" style="color:${isUp ? 'var(--green)' : 'var(--red)'}">
              ${isUp ? '+' : ''}$${pnlAbs} (${pnl.toFixed(2)}%)
            </div>
          </div>
        </div>
        <div class="pos-bar">
          <div class="pos-bar-fill" style="width:${p.ratio}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:4px">
          <span style="font-size:11px;color:var(--text-secondary)">占比 ${p.ratio}%</span>
          <span style="font-size:11px;color:var(--text-secondary)">均价 $${formatPrice(p.avgPrice)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderTradeHistory() {
  const container = document.getElementById('trade-history');
  if (!container) return;
  container.innerHTML = TRADE_HISTORY.map(t => `
    <div class="trade-item">
      <div class="trade-side ${t.side}">${t.side === 'buy' ? '买' : '卖'}</div>
      <div class="trade-info">
        <div class="trade-pair">${t.pair}</div>
        <div class="trade-time">${t.time} · ${t.amount} @ $${formatPrice(t.price)}</div>
      </div>
      <div class="trade-result">
        <div class="trade-amount">$${(t.amount * t.price).toLocaleString(undefined, {maximumFractionDigits:0})}</div>
        <div class="trade-pnl" style="color:${t.isUp ? 'var(--green)' : 'var(--red)'}">${t.pnl}</div>
      </div>
    </div>
  `).join('');
}

function initPortfolioChart() {
  const canvas = document.getElementById('portfolioChart');
  if (!canvas || portfolioChartInstance) return;

  portfolioChartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: POSITIONS_DATA.map(p => p.coin),
      datasets: [{
        data: POSITIONS_DATA.map(p => p.ratio),
        backgroundColor: ['#f7931a', '#627eea', '#9945ff', '#f3ba2f', '#2563eb'],
        borderColor: '#161b22',
        borderWidth: 2,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#8b949e',
            font: { size: 11 },
            boxWidth: 12,
            padding: 8,
          }
        },
        tooltip: {
          backgroundColor: '#1c2128',
          borderColor: '#30363d',
          borderWidth: 1,
          bodyColor: '#e6edf3',
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` }
        }
      }
    }
  });
}

// ==================== SETTINGS ====================

function toggleSetting(toggle) {
  toggle.classList.toggle('active');
  const label = toggle.closest('.settings-item').querySelector('.settings-label').textContent;
  const isOn = toggle.classList.contains('active');
  showToast(label + (isOn ? ' 已开启' : ' 已关闭'));
}

function showApiConfig() {
  document.getElementById('api-modal').classList.remove('hidden');
}

function closeApiModal() {
  document.getElementById('api-modal').classList.add('hidden');
}

function saveApiConfig() {
  closeApiModal();
  showToast('✅ API 配置已保存（仅限本地）');
}

// ==================== UTILS ====================

function formatPrice(price) {
  if (price >= 10000) return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toFixed(4);
}

function showToast(msg, duration = 2200) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

function showNotification() {
  showToast('🔔 3 条新交易信号');
}

// ==================== REAL-TIME PRICE SIMULATION ====================

function startPriceTicker() {
  priceTickInterval = setInterval(() => {
    COINS_DATA.forEach(coin => {
      // Simulate small random price movements
      const delta = (Math.random() - 0.5) * 0.002;
      coin.price *= (1 + delta);
      coin.change += (Math.random() - 0.5) * 0.1;
    });

    // Update home market if visible
    if (currentPage === 'home') renderHomeMarket();
    if (currentPage === 'market') renderMarketFull();

    // Update total asset with slight variation
    const assetEl = document.getElementById('total-asset');
    if (assetEl) {
      const val = 128465.32 * (1 + (Math.random() - 0.5) * 0.001);
      assetEl.textContent = val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }, 3000);
}

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  initHome();
  startPriceTicker();

  // Prevent pull-to-refresh on mobile
  document.addEventListener('touchstart', e => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  // Smooth scrolling for app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    appContainer.addEventListener('scroll', () => {}, { passive: true });
  }

  console.log('%c QuantTrader 量化交易系统 已启动 🚀', 'color:#3b82f6;font-size:16px;font-weight:bold');
});
