
export class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      /* 
      this.vx = 0;
      this.vy = 0;
      */ 

      this.vx = (Math.random() - 0.5) * 2; // random horizontal speed
     this.vy = (Math.random() - 0.5) * 2; // random vertical speed

    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
    }

}

export function createParticleCloud(count, width, height) {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const p = new Particle(Math.random() * width, Math.random() * height);
      particles.push(p);
    }
    return particles;
}
  