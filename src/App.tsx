import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import Image1 from "./assets/image1.png";
import Image2 from "./assets/image2.png";
import Image3 from "./assets/image3.png";
import Image4 from "./assets/image4.png";
import Image5 from "./assets/image5.png";
import Image6 from "./assets/image6.png";
import Image7 from "./assets/image7.png";
import Image8 from "./assets/image8.png";
import Image9 from "./assets/image9.png";

interface Block {
  id: number;
  rotation: number;
  src?: string;
}

function App() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, src: Image1, rotation: 0 },
    { id: 2, src: Image2, rotation: 0 },
    { id: 3, src: Image3, rotation: 0 },
    { id: 4, src: Image4, rotation: 0 },
    { id: 5, src: Image5, rotation: 0 },
    { id: 6, src: Image6, rotation: 0 },
    { id: 7, src: Image7, rotation: 0 },
    { id: 8, src: Image8, rotation: 0 },
    { id: 9, src: Image9, rotation: 0 },
  ]);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const sourceId = parseInt(e.dataTransfer.getData("text/plain"));

    if (sourceId === targetId) return;

    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      const sourceIndex = newBlocks.findIndex((block) => block.id === sourceId);
      const targetIndex = newBlocks.findIndex((block) => block.id === targetId);

      const [movedBlock] = newBlocks.splice(sourceIndex, 1);
      newBlocks.splice(targetIndex, 0, movedBlock);

      return newBlocks;
    });
  };

  const handleRotate = (id: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? { ...block, rotation: (block.rotation + 90) % 360 }
          : block
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-lime-100 p-8 rounded shadow-xl ">
        <div className="mb-6 flex flex-col  flex-wrap">
          <h1 className="text-2xl font-bold text-gray-800 text-center items-center">
            MacMohan Squares
          </h1>
          <p className="font-bold">
            Todo:
          </p>
          <p className="text-sm">~ Drag and drop the blocks to solve the puzzle.</p>
          <p className="text-sm">~ Rotate the blocks to align the image.</p>
        </div>

        <div className="grid grid-cols-3 ">
          {blocks.map((block) => (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, block.id)}
              className="relative group"
            >
              <div
                className={`
                  w-28 h-28 bg-cover bg-center
                  shadow-lg 
                  cursor-move 
                  transition-all 
                  duration-300
                  flex items-center justify-center
                `}
                style={{
                  transform: `rotate(${block.rotation}deg)`,
                  backgroundImage: block.src ? `url(${block.src})` : undefined,
                }}
              >
                <span className="text-white font-bold text-xl">{block.id}</span>
              </div>
              <button
                onClick={() => handleRotate(block.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-gray-100"
              >
                <RotateCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
