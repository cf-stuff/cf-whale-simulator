import { html, useState, useEffect, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import { renderTimeline } from "../display.js";
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
      timeline.addEvents();
      timeline.events.forEach(event => {
        if (currentFrame >= event.frame) event.callback();
      });
      timeline.events = timeline.events.filter(event => currentFrame < event.frame);
      const frameContent = await renderTimeline(timeline);
      timeline.ongoingAnimations = timeline.ongoingAnimations.filter(animation => !animation.isFinished());
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
