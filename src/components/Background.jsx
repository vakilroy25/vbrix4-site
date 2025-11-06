import { useEffect, useRef } from 'react';
import './Background.css';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let blocks = [];
    let connections = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Block class
    class Block {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 20;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.hue = Math.random() > 0.5 ? 190 : 280; // Blue or purple
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Wrap around edges
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;

        // Draw block
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // Inner glow
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity * 0.2})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        ctx.restore();
      }
    }

    // Initialize blocks
    const numBlocks = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < numBlocks; i++) {
      blocks.push(new Block());
    }

    // Draw connection between two blocks
    const drawConnection = (block1, block2, distance, maxDistance) => {
      const opacity = (1 - distance / maxDistance) * 0.15;
      
      ctx.beginPath();
      ctx.moveTo(block1.x, block1.y);
      ctx.lineTo(block2.x, block2.y);
      
      const gradient = ctx.createLinearGradient(block1.x, block1.y, block2.x, block2.y);
      gradient.addColorStop(0, `hsla(${block1.hue}, 100%, 60%, ${opacity})`);
      gradient.addColorStop(1, `hsla(${block2.hue}, 100%, 60%, ${opacity})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blocks
      blocks.forEach(block => {
        block.update();
        block.draw();
      });

      // Draw connections between nearby blocks
      const maxConnectionDistance = 200;
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const dx = blocks[i].x - blocks[j].x;
          const dy = blocks[i].y - blocks[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxConnectionDistance) {
            drawConnection(blocks[i], blocks[j], distance, maxConnectionDistance);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="background-container">
      <canvas ref={canvasRef} className="background-canvas" />
    </div>
  );
};

export default Background;

