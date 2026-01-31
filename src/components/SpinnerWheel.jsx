import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const SpinnerWheel = ({
  items = [],
  onSpinStart,
  onSpinEnd,
  spinDuration = 5000,
  hideContentDuringSpin = false,
  wheelTheme = 'random' // 'random' or a hex color
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const lastTickIndex = useRef(-1);

  const colors = [
    '#8a2be2', '#4b0082', '#00d2ff', '#9d50bb', '#6e48aa', '#3a1c71'
  ];

  // Sound synthesis
  const playTickSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio not supported or blocked", e);
    }
  };

  useEffect(() => {
    drawWheel();
  }, [items, rotation, isSpinning, hideContentDuringSpin, wheelTheme]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const actualItems = items.length > 0 ? items : ["No Data"];
    const arcSize = (2 * Math.PI) / actualItems.length;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 15;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    actualItems.forEach((item, i) => {
      const angle = i * arcSize + rotation;

      // Draw slice
      ctx.beginPath();
      ctx.fillStyle = wheelTheme === 'random' ? colors[i % colors.length] : wheelTheme;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Separator - more visible if same color
      ctx.strokeStyle = (wheelTheme === 'random') ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = (wheelTheme === 'random') ? 1 : 2;
      ctx.stroke();

      // Show text only if not spinning or if hideContentDuringSpin is false
      if (!isSpinning || !hideContentDuringSpin) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";

        const baseFontSize = 14;
        const adaptiveFontSize = Math.max(8, Math.min(baseFontSize, (radius / (item.length * 0.8))));
        ctx.font = `600 ${adaptiveFontSize}px Outfit`;

        ctx.fillText(item, radius - 25, adaptiveFontSize / 3);
        ctx.restore();
      }
    });

    // Center circular cap
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#111';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const handleSpin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    onSpinStart?.();

    // Scale rotations with time: roughly 3.5 full turns per second
    const rotationsPerSecond = 3.5;
    const baseSpins = (spinDuration / 1000) * rotationsPerSecond;
    const extraSpins = baseSpins + Math.random() * 2;
    const targetRotation = rotation + (extraSpins * 2 * Math.PI) + (Math.random() * 2 * Math.PI);

    const startTime = performance.now();
    const startRotation = rotation;
    lastTickIndex.current = -1;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRot = startRotation + (targetRotation - startRotation) * easeOut;

      // Sound logic
      if (items.length > 0) {
        const arcSize = (2 * Math.PI) / items.length;
        const currentTickIndex = Math.floor((currentRot % (2 * Math.PI)) / arcSize);
        if (currentTickIndex !== lastTickIndex.current) {
          playTickSound();
          lastTickIndex.current = currentTickIndex;
        }
      }

      setRotation(currentRot);

      if (elapsed < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        finalizeWinner(currentRot);
      }
    };

    requestAnimationFrame(animate);
  };

  const finalizeWinner = (finalRot) => {
    const arcSize = (2 * Math.PI) / items.length;
    const topAngle = (1.5 * Math.PI - (finalRot % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI);
    const winningIndex = Math.floor(topAngle / arcSize);

    const winner = items[winningIndex];
    onSpinEnd?.(winner);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8a2be2', '#00d2ff']
    });
  };

  return (
    <div className="wheel-wrapper">
      <div
        className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{
          width: 0, height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: '20px solid #fff',
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
        }}
      />
      <div className="wheel-container">
        <canvas
          ref={canvasRef}
          width={420}
          height={420}
          onClick={handleSpin}
          className="cursor-pointer display-block"
          style={{ filter: 'drop-shadow(0 0 50px rgba(138, 43, 226, 0.2))' }}
        />
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="spin-btn"
        >
          {isSpinning ? '...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};

export default SpinnerWheel;
