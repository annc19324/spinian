import React, { useState, useEffect } from 'react';
import SpinnerWheel from './components/SpinnerWheel';
import { Settings, ChevronDown, ChevronUp, Clock, EyeOff, Palette } from 'lucide-react';

const DEFAULT_MODES = {
  NAMES: {
    label: "Quay Tên",
    defaultItems: ["Minh", "Thu", "Hải"]
  },
  PRIZES: {
    label: "Quay Thưởng",
    defaultItems: ["100k", "50k", "Voucher"]
  },
  LUCKY: {
    label: "Quay Lì Xì",
    defaultItems: ["🧧 20k", "🧧 50k", "🧧 100k"]
  }
};

const THEME_COLORS = [
  { name: 'Random', value: 'random' },
  { name: 'Purple', value: '#8a2be2' },
  { name: 'Red', value: '#e63946' },
  { name: 'Blue', value: '#00d2ff' },
  { name: 'Green', value: '#2a9d8f' },
  { name: 'Orange', value: '#f4a261' }
];

const App = () => {
  const [activeMode, setActiveMode] = useState('NAMES');
  const [showEditor, setShowEditor] = useState(false);
  const [spinDuration, setSpinDuration] = useState(5000);
  const [spinMode, setSpinMode] = useState('fixed');
  const [randomRange, setRandomRange] = useState({ min: 5, max: 30 });
  const [effectiveDuration, setEffectiveDuration] = useState(5000);

  // New states for hide content and color theme
  const [hideDuringSpin, setHideDuringSpin] = useState(false);
  const [wheelTheme, setWheelTheme] = useState('random');

  const [customItems, setCustomItems] = useState(() => {
    const saved = localStorage.getItem('spinian_custom_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }
    return {
      NAMES: DEFAULT_MODES.NAMES.defaultItems.join('\n'),
      PRIZES: DEFAULT_MODES.PRIZES.defaultItems.join('\n'),
      LUCKY: DEFAULT_MODES.LUCKY.defaultItems.join('\n')
    };
  });
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    localStorage.setItem('spinian_custom_items', JSON.stringify(customItems));
  }, [customItems]);

  const getCurrentItems = () => {
    return (customItems[activeMode] || "").split('\n').filter(item => item.trim() !== '');
  };

  const handleInputChange = (value) => {
    setCustomItems(prev => ({
      ...prev,
      [activeMode]: value
    }));
  };

  const handleSpinStart = () => {
    let duration = spinDuration;
    if (spinMode === 'random') {
      const minMs = randomRange.min * 1000;
      const maxMs = randomRange.max * 1000;
      duration = Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
    }
    setEffectiveDuration(duration);
    setIsSpinning(true);
    setWinner(null);
  };

  useEffect(() => {
    setWinner(null);
  }, [activeMode]);

  return (
    <div className="app-container">
      <div className="brand">SPINIAN</div>

      <div className="mode-selector">
        {Object.keys(DEFAULT_MODES).map((mode) => (
          <button
            key={mode}
            className={`mode-btn ${activeMode === mode ? 'active' : ''}`}
            onClick={() => !isSpinning && setActiveMode(mode)}
          >
            {DEFAULT_MODES[mode].label}
          </button>
        ))}
      </div>

      <SpinnerWheel
        items={getCurrentItems()}
        spinDuration={effectiveDuration}
        hideContentDuringSpin={hideDuringSpin}
        wheelTheme={wheelTheme}
        onSpinStart={handleSpinStart}
        onSpinEnd={(res) => {
          setIsSpinning(false);
          setWinner(res);
        }}
      />

      {winner && !isSpinning && (
        <div className="winner-toast">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>
            Kết quả là
          </p>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {winner}
          </h2>
        </div>
      )}

      <button
        className={`settings-toggle ${showEditor ? 'active' : ''}`}
        onClick={() => setShowEditor(!showEditor)}
      >
        <Settings size={16} />
        {showEditor ? 'Ẩn cài đặt' : 'Chỉnh sửa & Cài đặt'}
        {showEditor ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Content Editor */}
      {showEditor && (
        <div className="editor-container">
          {/* Advanced Settings Section */}
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <span className="editor-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Clock size={14} /> Chế độ thời gian quay
            </span>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <button
                className={`mode-btn ${spinMode === 'fixed' ? 'active' : ''}`}
                style={{ flex: 1, fontSize: '0.75rem', padding: '8px' }}
                onClick={() => setSpinMode('fixed')}
              >
                Cố định
              </button>
              <button
                className={`mode-btn ${spinMode === 'random' ? 'active' : ''}`}
                style={{ flex: 1, fontSize: '0.75rem', padding: '8px' }}
                onClick={() => setSpinMode('random')}
              >
                Ngẫu nhiên
              </button>
            </div>

            {spinMode === 'fixed' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem' }}>Thời gian: {spinDuration / 1000}s</span>
                  <input
                    type="number"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', width: '60px', borderRadius: '4px', textAlign: 'center', padding: '4px' }}
                    value={spinDuration / 1000}
                    onChange={(e) => setSpinDuration(Number(e.target.value) * 1000)}
                  />
                </div>
                <input
                  type="range"
                  min="1000"
                  max="60000"
                  step="500"
                  value={spinDuration}
                  onChange={(e) => setSpinDuration(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  disabled={isSpinning}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem' }}>Khoảng ngẫu nhiên (giây):</span>
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0 8px', minWidth: 0 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Min</span>
                    <input
                      type="number"
                      style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', textAlign: 'center', padding: '8px 2px', outline: 'none', minWidth: 0 }}
                      value={randomRange.min}
                      onChange={(e) => setRandomRange({ ...randomRange, min: Number(e.target.value) })}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0 8px', minWidth: 0 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Max</span>
                    <input
                      type="number"
                      style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', textAlign: 'center', padding: '8px 2px', outline: 'none', minWidth: 0 }}
                      value={randomRange.max}
                      onChange={(e) => setRandomRange({ ...randomRange, max: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* New Visibility & Theme Settings Section */}
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <div className="toggle-group">
              <span className="editor-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <EyeOff size={14} /> Ẩn kết quả khi quay
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={hideDuringSpin}
                  onChange={(e) => setHideDuringSpin(e.target.checked)}
                />
                <span className="slider-switch"></span>
              </label>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <span className="editor-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={14} /> Chủ đề màu sắc
              </span>
              <div className="color-option-group">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color.value}
                    className={`color-btn ${wheelTheme === color.value ? 'active' : ''} ${color.value === 'random' ? 'random-gradient' : ''}`}
                    style={color.value !== 'random' ? { backgroundColor: color.value } : {}}
                    title={color.name}
                    onClick={() => setWheelTheme(color.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          <span className="editor-title">Tùy chỉnh nội dung ({DEFAULT_MODES[activeMode].label})</span>
          <textarea
            className="editor-input"
            value={customItems[activeMode]}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Nhập mỗi lựa chọn trên một dòng..."
            disabled={isSpinning}
          />
          <span className="hint">Mọi thay đổi sẽ tự động lưu lại.</span>
        </div>
      )}
    </div>
  );
};

export default App;
