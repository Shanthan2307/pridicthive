"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Bug {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  sprite: string;
  scale: number;
  state: "formation" | "diving" | "returning" | "dead";
  targetPosition?: { x: number; y: number };
  diveProgress: number;
  shootCooldown: number;
}

interface Bullet {
  id: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  fromShip: boolean;
}

interface GalagaVisualizerProps {
  query: string;
}

const COLORS = {
  background: "#0E091C",
  primary: "#6E54FF",
  cyan: "#85E6FF",
  pink: "#FF8EE4",
  green: "#00FF88",
};

const BUG_SPRITES = [
  { name: "Blue", path: "/galaga/Blue.png" },
  { name: "Green", path: "/galaga/Green.png" },
  { name: "Red", path: "/galaga/Red.png" },
];

export default function GalagaVisualizer({ query }: GalagaVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const animationFrameRef = useRef<number | undefined>();
  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const gameStateRef = useRef({
    shipShootCooldown: 0,
    nextBugDive: 2,
    phase: 0,
  });

  // Load sprite images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = [
        ...BUG_SPRITES.map((sprite) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = sprite.path;
            img.onload = () => {
              imagesRef.current[sprite.name] = img;
              resolve();
            };
          });
        }),
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = "/galaga/Ship.png";
          img.onload = () => {
            imagesRef.current["Ship"] = img;
            resolve();
          };
        }),
      ];

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Handle canvas resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setCanvasSize({ width, height });
        setShipPosition({ x: width / 2, y: height - 80 });
      }
    };

    setTimeout(updateSize, 100);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize bugs
  useEffect(() => {
    if (!imagesLoaded || canvasSize.width === 0) return;

    const teams = ["Brazil", "Argentina", "France", "Germany", "Spain"];
    const initialBugs: Bug[] = teams.map((team, index) => ({
      id: `bug-${index}`,
      name: team,
      hp: 100,
      maxHp: 100,
      position: {
        x: canvasSize.width / 2 - 200 + (index % 3) * 200,
        y: 80 + Math.floor(index / 3) * 100,
      },
      velocity: { x: 0, y: 0 },
      sprite: BUG_SPRITES[index % BUG_SPRITES.length].name,
      scale: 2.5,
      state: "formation",
      diveProgress: 0,
      shootCooldown: 0,
    }));

    setBugs(initialBugs);
  }, [imagesLoaded, canvasSize.width, query]);

  // Game loop
  useEffect(() => {
    if (!imagesLoaded || bugs.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationPhase = 0;
    const deltaTime = 1 / 60;

    const gameLoop = () => {
      animationPhase += 0.02;
      const gameState = gameStateRef.current;

      // Update ship shooting
      gameState.shipShootCooldown -= deltaTime;
      if (gameState.shipShootCooldown <= 0) {
        // Find closest bug to shoot
        const aliveBugs = bugs.filter((b) => b.hp > 0);
        if (aliveBugs.length > 0) {
          const closestBug = aliveBugs.reduce((closest, bug) => {
            const distToBug = Math.hypot(
              bug.position.x - shipPosition.x,
              bug.position.y - shipPosition.y
            );
            const distToClosest = Math.hypot(
              closest.position.x - shipPosition.x,
              closest.position.y - shipPosition.y
            );
            return distToBug < distToClosest ? bug : closest;
          });

          // Shoot at closest bug
          const angle = Math.atan2(
            closestBug.position.y - shipPosition.y,
            closestBug.position.x - shipPosition.x
          );
          setBullets((prev) => [
            ...prev,
            {
              id: `bullet-${Date.now()}`,
              position: { ...shipPosition },
              velocity: {
                x: Math.cos(angle) * 8,
                y: Math.sin(angle) * 8,
              },
              fromShip: true,
            },
          ]);
          gameState.shipShootCooldown = 0.3;
        }
      }

      // Update bug AI
      gameState.nextBugDive -= deltaTime;
      if (gameState.nextBugDive <= 0) {
        const formationBugs = bugs.filter((b) => b.state === "formation" && b.hp > 0);
        if (formationBugs.length > 0) {
          const randomBug = formationBugs[Math.floor(Math.random() * formationBugs.length)];
          setBugs((prev) =>
            prev.map((b) =>
              b.id === randomBug.id
                ? { ...b, state: "diving", diveProgress: 0 }
                : b
            )
          );
        }
        gameState.nextBugDive = 1.5 + Math.random() * 2;
      }

      // Update bugs
      setBugs((prev) =>
        prev.map((bug) => {
          if (bug.hp <= 0) return { ...bug, state: "dead" };

          const formationX = canvasSize.width / 2 - 200 + (parseInt(bug.id.split("-")[1]) % 3) * 200;
          const formationY = 80 + Math.floor(parseInt(bug.id.split("-")[1]) / 3) * 100;

          if (bug.state === "formation") {
            // Slight wave motion in formation
            const waveX = Math.sin(animationPhase + parseInt(bug.id.split("-")[1])) * 15;
            return {
              ...bug,
              position: {
                x: formationX + waveX,
                y: formationY,
              },
              shootCooldown: Math.max(0, bug.shootCooldown - deltaTime),
            };
          } else if (bug.state === "diving") {
            // Dive toward ship with curve
            bug.diveProgress += deltaTime * 0.8;
            const t = bug.diveProgress;

            if (t >= 1) {
              return { ...bug, state: "returning", diveProgress: 0 };
            }

            // Bezier curve dive path
            const startX = formationX;
            const startY = formationY;
            const controlX = shipPosition.x + (Math.random() - 0.5) * 200;
            const controlY = canvasSize.height / 2;
            const endX = shipPosition.x;
            const endY = shipPosition.y - 50;

            const x =
              (1 - t) * (1 - t) * startX +
              2 * (1 - t) * t * controlX +
              t * t * endX;
            const y =
              (1 - t) * (1 - t) * startY +
              2 * (1 - t) * t * controlY +
              t * t * endY;

            // Shoot during dive (Red bugs)
            if (bug.sprite === "Red" && bug.shootCooldown <= 0 && t > 0.3 && t < 0.7) {
              const angle = Math.atan2(shipPosition.y - y, shipPosition.x - x);
              setBullets((prev) => [
                ...prev,
                {
                  id: `bullet-${Date.now()}-${Math.random()}`,
                  position: { x, y },
                  velocity: {
                    x: Math.cos(angle) * 5,
                    y: Math.sin(angle) * 5,
                  },
                  fromShip: false,
                },
              ]);
              return { ...bug, position: { x, y }, shootCooldown: 0.5 };
            }

            return { ...bug, position: { x, y } };
          } else if (bug.state === "returning") {
            // Return to formation
            bug.diveProgress += deltaTime * 1.2;
            const t = bug.diveProgress;

            if (t >= 1) {
              return {
                ...bug,
                state: "formation",
                position: { x: formationX, y: formationY },
                diveProgress: 0,
              };
            }

            const x = bug.position.x + (formationX - bug.position.x) * t * 0.1;
            const y = bug.position.y + (formationY - bug.position.y) * t * 0.1;

            return { ...bug, position: { x, y } };
          }

          return bug;
        })
      );

      // Update bullets
      setBullets((prev) => {
        const updated = prev
          .map((bullet) => ({
            ...bullet,
            position: {
              x: bullet.position.x + bullet.velocity.x,
              y: bullet.position.y + bullet.velocity.y,
            },
          }))
          .filter(
            (bullet) =>
              bullet.position.x > 0 &&
              bullet.position.x < canvasSize.width &&
              bullet.position.y > 0 &&
              bullet.position.y < canvasSize.height
          );

        // Check collisions
        updated.forEach((bullet) => {
          if (bullet.fromShip) {
            // Ship bullet hitting bugs
            bugs.forEach((bug) => {
              if (bug.hp > 0) {
                const dist = Math.hypot(
                  bullet.position.x - bug.position.x,
                  bullet.position.y - bug.position.y
                );
                if (dist < 30) {
                  setBugs((prev) =>
                    prev.map((b) =>
                      b.id === bug.id ? { ...b, hp: Math.max(0, b.hp - 20) } : b
                    )
                  );
                  setBullets((prev) => prev.filter((b) => b.id !== bullet.id));
                }
              }
            });
          }
        });

        return updated;
      });

      // Render
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasSize.height);
      gradient.addColorStop(0, COLORS.background);
      gradient.addColorStop(1, "#1a0f2e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw stars
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      for (let i = 0; i < 50; i++) {
        const x = (i * 137.5) % canvasSize.width;
        const y = (i * 197.3 + animationPhase * 20) % canvasSize.height;
        const size = (i % 3) + 1;
        ctx.fillRect(x, y, size, size);
      }

      // Draw bullets
      bullets.forEach((bullet) => {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = bullet.fromShip ? COLORS.cyan : COLORS.pink;
        ctx.fillStyle = bullet.fromShip ? COLORS.cyan : COLORS.pink;
        ctx.beginPath();
        ctx.arc(bullet.position.x, bullet.position.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw bugs
      bugs.forEach((bug) => {
        if (bug.hp > 0) {
          drawBug(ctx, bug, animationPhase);
        }
      });

      // Draw ship
      drawShip(ctx, shipPosition, animationPhase);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [bugs, bullets, shipPosition, imagesLoaded, canvasSize]);

  const drawBug = (ctx: CanvasRenderingContext2D, bug: Bug, phase: number) => {
    const { x, y } = bug.position;
    const img = imagesRef.current[bug.sprite];
    if (!img) return;

    ctx.save();
    ctx.translate(x, y);

    // Rotation based on state
    if (bug.state === "diving") {
      const angle = Math.atan2(shipPosition.y - y, shipPosition.x - x);
      ctx.rotate(angle + Math.PI / 2);
    }

    const hpPercent = bug.hp / bug.maxHp;
    const glowColor =
      hpPercent > 0.6 ? COLORS.green : hpPercent > 0.3 ? COLORS.cyan : COLORS.pink;
    ctx.shadowBlur = 20;
    ctx.shadowColor = glowColor;

    const width = img.width * bug.scale;
    const height = img.height * bug.scale;
    ctx.drawImage(img, -width / 2, -height / 2, width, height);

    ctx.shadowBlur = 0;
    ctx.restore();

    // HP Bar
    const barWidth = 80;
    const barHeight = 8;
    const barX = x - barWidth / 2;
    const barY = y + height / 2 + 10;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    const hpGradient = ctx.createLinearGradient(barX, barY, barX + barWidth * hpPercent, barY);
    hpGradient.addColorStop(0, glowColor);
    hpGradient.addColorStop(1, glowColor + "80");
    ctx.fillStyle = hpGradient;
    ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    ctx.fillStyle = "#FFF";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#000";
    ctx.fillText(bug.name, x, barY + barHeight + 18);
    ctx.shadowBlur = 0;
  };

  const drawShip = (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    phase: number
  ) => {
    const { x, y } = position;
    const img = imagesRef.current["Ship"];
    if (!img) return;

    ctx.save();

    const hoverOffset = Math.sin(phase * 2) * 3;
    ctx.translate(x, y + hoverOffset);

    ctx.shadowBlur = 30;
    ctx.shadowColor = COLORS.cyan;

    const scale = 3;
    const width = img.width * scale;
    const height = img.height * scale;
    ctx.drawImage(img, -width / 2, -height / 2, width, height);

    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = COLORS.cyan;
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#000";
    ctx.fillText("AUTOPILOT", x, y + height / 2 + 25);
    ctx.shadowBlur = 0;
  };

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-monad-dark-bg">
        <div className="text-center">
          <div className="text-2xl text-purple-400 font-mono mb-4">LOADING DEBATE MODE...</div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-monad-dark-bg overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[500px] h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 bg-purple-900/80 backdrop-blur-md border-2 border-purple-500/50 rounded-lg px-4 py-3 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-xs text-purple-300 font-mono uppercase tracking-wider">
              Prediction Query
            </p>
          </div>
          <p className="text-sm text-white font-bold">{query}</p>
        </motion.div>

        <div
          ref={containerRef}
          className="flex-1 mx-4 my-4 relative rounded-xl overflow-hidden border-4 border-purple-500/30 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.background} 0%, #1a0f2e 100%)`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="w-full h-full"
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3) 1px,
                transparent 1px,
                transparent 2px
              )`,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mb-4 bg-black/90 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400">DEBATE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="text-purple-400">{bugs.filter((b) => b.hp > 0).length} ALIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              <span className="text-pink-400">FIGHTING</span>
            </div>
          </div>

          <div className="space-y-2">
            {bugs.map((bug) => (
              <div
                key={bug.id}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300 font-semibold">{bug.name}</span>
                  <span className="text-xs text-white font-bold">{Math.round(bug.hp)}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${(bug.hp / bug.maxHp) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
