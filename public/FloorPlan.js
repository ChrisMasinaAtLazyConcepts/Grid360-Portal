import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FloorPlan = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    // Load the floor plan image
    fabric.Image.fromURL('path/to/floor/plan/image.png', (img) => {
      img.scale(1).set({
        left: 0,
        top: 0,
      });
      canvas.add(img);

      // Add icons to the floor plan
      const icons = [
        { url: './assets/camright.JPG', left: 100, top: 100 },
        { url: './assets/camright.JPG', left: 100, top: 100 },
        { url: './assets/camright.JPG', left: 100, top: 100 },
        { url: './assets/camleft.JPG', left: 100, top: 100 },
        { url: './assets/camleft.JPG', left: 100, top: 100 },
        { url: './assets/camleft.JPG', left: 100, top: 100 },
        { url: './assets/gunred.JPG', left: 200, top: 200 },
        { url: './assets/vehiclered.JPG', left: 200, top: 200 },
        { url: './assets/securityguard.JPG', left: 200, top: 200 },
        { url: './assets/securityguard.JPG', left: 200, top: 200 },
        { url: './assets/securityguard.JPG', left: 200, top: 200 },
        { url: './assets/securityguard.JPG', left: 200, top: 200 },
        { url: './assets/poired.JPG', left: 200, top: 200 }
      ];

      icons.forEach((icon) => {
        fabric.Image.fromURL(icon.url, (iconImg) => {
          iconImg.scale(0.5).set({
            left: icon.left,
            top: icon.top,
          });
          canvas.add(iconImg);
        });
      });

      canvas.renderAll();
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FloorPlan;