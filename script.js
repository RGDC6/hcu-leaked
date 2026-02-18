/* Matrix rain effect */
(function () {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    let cols, drops;
    const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const FS = 14;

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.floor(canvas.width / FS);
        drops = Array.from({ length: cols }, () => Math.random() * -100);
    }

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = FS + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
            ctx.fillText(ch, i * FS, drops[i] * FS);
            if (drops[i] * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    init();
    window.addEventListener('resize', init);
    setInterval(draw, 45);
})();

/* Ripple effect on click */
document.querySelectorAll('.pill-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const color = this.classList.contains('blue') ? 'rgba(26,143,255,0.6)' : 'rgba(255,34,51,0.6)';
        
        Object.assign(ripple.style, {
            position: 'fixed',
            left: (e.clientX - 50) + 'px',
            top: (e.clientY - 50) + 'px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: color,
            pointerEvents: 'none',
            zIndex: '999',
            animation: 'rippleOut 0.6s ease-out forwards'
        });

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});