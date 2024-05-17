import { html, useState, useEffect, useRef } from "../lib/preact.standalone.module.js";
import Timeline from "../Timeline.js";

const Replay = ({ logs, play = true, restart = 0, delay = 17 }) => {
  const [timeline, setTimeline] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    setTimeline(new Timeline(logs));
    setCurrentFrame(0);
  }, [logs, restart]);

  useEffect(() => {
    let intervalId;
    if (play) {
      intervalId = setInterval(() => {
        setCurrentFrame(prev => prev + 1);
      }, delay);
    }

    return () => clearInterval(intervalId);
  }, [play, delay]);

  useEffect(() => {
    if (!timeline || timeline.isFinished()) return;
    timeline.currentFrame = currentFrame;
    async function animate() {
      timeline.update();
      const frameContent = await timeline.render();
      if (canvasRef.current) {
        canvasRef.current.getContext("2d").drawImage(frameContent, 0, 0);
      }
      setTimeline(timeline);
    }

    animate();
  }, [currentFrame]);
  return html`<canvas class="replay" ref=${canvasRef} width="1024" height="720" />`;
}

export default Replay;
