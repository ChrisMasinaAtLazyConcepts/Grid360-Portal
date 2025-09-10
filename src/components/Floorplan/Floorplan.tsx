import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';


const FloorPlan = () => {
    
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f0f0f0'
    });

    // Fixed image loading with proper syntax
    fabric.Image.fromURL(
      './assets/vaal_mall_floor_plan.JPG',
      (img: fabric.Image) => {
        const canvas = fabricCanvas.current;
        if (!canvas || !img) return;

        img.scaleToWidth(800);
        
        const scaledWidth = img.getScaledWidth();
        const scaledHeight = img.getScaledHeight();
        
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        img.set({
          left: canvasWidth / 2 - scaledWidth / 2,
          top: canvasHeight / 2 - scaledHeight / 2,
          selectable: false,
          evented: false
        });
        
        canvas.add(img);
        
        // Add icons
        const icons = [
        { url: './assets/camright.JPG', left: 100, top: 100 },
        { url: './assets/camright.JPG', left: 150, top: 150 },
        { url: './assets/camright.JPG', left: 200, top: 200 },
        { url: './assets/camleft.JPG', left: 250, top: 250 },
        { url: './assets/camleft.JPG', left: 300, top: 300 },
        { url: './assets/camleft.JPG', left: 350, top: 350 },
        { url: './assets/gunred.JPG', left: 400, top: 400 },
        { url: './assets/vehiclered.JPG', left: 450, top: 450 },
        { url: './assets/securityguard.JPG', left: 500, top: 500 },
        { url: './assets/securityguard.JPG', left: 550, top: 550 },
        { url: './assets/securityguard.JPG', left: 600, top: 600 },
        { url: './assets/securityguard.JPG', left: 650, top: 650 },
        { url: './assets/poired.JPG', left: 700, top: 700 }
        ];

        icons.forEach((icon) => {
          fabric.Image.fromURL(
            icon.url,
            (iconImg: fabric.Image) => {
              if (!canvas || !iconImg) return;
              
              iconImg.scale(0.5).set({
                left: icon.left,
                top: icon.top,
                hasControls: true,
                hasBorders: true,
                lockRotation: true
              });
              
              canvas.add(iconImg);
            },
            { crossOrigin: 'Anonymous' }
          );
        });

        canvas.renderAll();
      },
      { crossOrigin: 'Anonymous' } // Options for floor plan image
    );

    return () => {
      fabricCanvas.current?.dispose();
      fabricCanvas.current = null;
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FloorPlan;