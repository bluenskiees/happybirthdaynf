import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Import all memory photos
import memory1 from "@/assets/memories/memory-1.jpg";
import memory2 from "@/assets/memories/memory-2.jpg";
import memory3 from "@/assets/memories/memory-3.jpg";
import memory4 from "@/assets/memories/memory-4.png";
import memory5 from "@/assets/memories/memory-5.png";
import memory6 from "@/assets/memories/memory-6.png";
import memory7 from "@/assets/memories/memory-7.png";
import memory8 from "@/assets/memories/memory-8.png";
import memory9 from "@/assets/memories/memory-9.png";
import memory10 from "@/assets/memories/memory-10.png";
import memory11 from "@/assets/memories/memory-11.png";
import memory12 from "@/assets/memories/memory-12.png";
import memory13 from "@/assets/memories/memory-13.png";
import memory14 from "@/assets/memories/memory-14.png";
import memory15 from "@/assets/memories/memory-15.jpeg";
import memory16 from "@/assets/memories/memory-16.jpeg";
import memory17 from "@/assets/memories/memory-17.jpeg";
import memory18 from "@/assets/memories/memory-18.jpeg";
import memory19 from "@/assets/memories/memory-19.jpeg";
import memory20 from "@/assets/memories/memory-20.jpeg";
import memory21 from "@/assets/memories/memory-21.jpeg";
import memory22 from "@/assets/memories/memory-22.jpeg";
import memory23 from "@/assets/memories/memory-23.jpeg";
import memory24 from "@/assets/memories/memory-24.jpeg";
import memory25 from "@/assets/memories/memory-25.jpeg";
import memory26 from "@/assets/memories/memory-26.jpeg";
import memory27 from "@/assets/memories/memory-27.jpg";
import memory28 from "@/assets/memories/memory-28.jpg";
import memory29 from "@/assets/memories/memory-29.jpg";
import memory30 from "@/assets/memories/memory-30.jpg";
import memory31 from "@/assets/memories/memory-31.jpeg";
import memory32 from "@/assets/memories/memory-32.jpeg";
import memory33 from "@/assets/memories/memory-33.jpeg";
import memory34 from "@/assets/memories/memory-34.jpeg";
import memory35 from "@/assets/memories/memory-35.jpeg";
import memory36 from "@/assets/memories/memory-36.jpeg";
import memory37 from "@/assets/memories/memory-37.jpeg";
import memory38 from "@/assets/memories/memory-38.jpg";
import memory39 from "@/assets/memories/memory-39.jpg";
import memory40 from "@/assets/memories/memory-40.jpeg";
import memory41 from "@/assets/memories/memory-41.jpeg";
import memory42 from "@/assets/memories/memory-42.jpeg";
import memory43 from "@/assets/memories/memory-43.jpeg";

const galleryTexts = [
  {
    label: "Opening",
    text: 'Sometimes I catch myself smiling while looking at these photos. Not just because of the pictures, but because I remember how it felt.\nBack then… Everything just flowed. Nothing forced. Nothing complicated. Like two people who met and somehow already knew,\n"oh… it\'s you."',
  },
  {
    label: "Middle 1",
    text: "It's funny when I think about it now. The way we met was unexpected, yet it somehow made perfect sense. From something unplanned, from a distance that turned out to be so close, to all those little details that only felt important later. It's like life quietly prepared us, without ever saying a word.",
  },
  {
    label: "Middle 2",
    text: "What I remember most is how there was never any awkwardness. The first time we met, we held hands. We hugged without hesitation. No uncomfortable phase. No pretending. Everything felt light, like two people who had already known each other for a long time.",
  },
  {
    label: "Emotional Anchor",
    text: "I know I'm not the easiest person to love. I've been silent. I've been hard on myself, and sometimes, without realizing it, on you too. But you stayed. You didn't walk away. You didn't give up. And honestly, that's something that still makes me pause every time I think about it.\nThank you, enduutt.",
  },
  {
    label: "Closing",
    text: "Now, as these photos keep moving in front of me, I don't just see the past. I see two people learning. Learning patience. Learning understanding. Learning how to grow together. And somehow, all of this makes me feel warm.",
  },
  {
    label: "",
    text: "Not because everything is perfect, but because I know, whatever comes next… I want to walk through it with you.",
    isFinal: true,
  },
];

// All memory photos
const allPhotos = [
  memory1, memory2, memory3, memory4, memory5, memory6, memory7, memory8, memory9,
  memory10, memory11, memory12, memory13, memory14, memory15, memory16, memory17,
  memory18, memory19, memory20, memory21, memory22, memory23, memory24, memory25,
  memory26, memory27, memory28, memory29, memory30, memory31, memory32, memory33,
  memory34, memory35, memory36, memory37, memory38, memory39, memory40, memory41,
  memory42, memory43,
];

// Distribute 43 photos across 5 rows
const photoRows = [
  allPhotos.slice(0, 9),    // Row 1: photos 1-9
  allPhotos.slice(9, 18),   // Row 2: photos 10-18
  allPhotos.slice(18, 27),  // Row 3: photos 19-27
  allPhotos.slice(27, 35),  // Row 4: photos 28-35
  allPhotos.slice(35, 43),  // Row 5: photos 36-43
];

const PhotoRow = ({
  photos,
  direction,
}: {
  photos: string[];
  direction: "left" | "right";
}) => {
  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex gap-4 ${direction === "left" ? "gallery-track-left" : "gallery-track-right"}`}
        style={{ width: "200%" }}
      >
        {/* Double the photos for seamless loop */}
        {[...photos, ...photos].map((photo, i) => (
          <div
            key={`photo-${i}`}
            className="flex-shrink-0 w-48 md:w-64 aspect-[3/4] rounded-lg overflow-hidden relative group shadow-md"
          >
            <img
              src={photo}
              alt={`Memory ${i + 1}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryText = ({
  section,
  index,
}: {
  section: (typeof galleryTexts)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: (section as any).isFinal ? 1.2 : 0.7,
        delay: 0,
      }}
      className="max-w-xl mx-auto text-center py-12 md:py-16 px-6"
    >
      {section.label && (
        <p className="text-xs tracking-[0.25em] uppercase text-stone-warm/60 mb-4 font-body">
          {section.label}
        </p>
      )}
      <p
        className={`font-serif-elegant leading-relaxed whitespace-pre-line ${
          (section as any).isFinal
            ? "text-xl md:text-2xl text-walnut-deep font-medium italic"
            : "text-lg md:text-xl text-walnut-deep/85"
        }`}
      >
        {section.text}
      </p>
    </motion.div>
  );
};

const Section4Gallery = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="min-h-screen bg-gradient-warm py-20 overflow-hidden">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0 }}
        className="text-center mb-16 px-6"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-stone-warm mb-3">
          Our Memories
        </p>
        <h2 className="font-script text-4xl md:text-5xl text-walnut-deep">
          A Journey in Frames
        </h2>
      </motion.div>

      {/* Interleaved photos and text */}
      <GalleryText section={galleryTexts[0]} index={0} />
      <PhotoRow photos={photoRows[0]} direction="left" />

      <GalleryText section={galleryTexts[1]} index={1} />
      <PhotoRow photos={photoRows[1]} direction="right" />

      <GalleryText section={galleryTexts[2]} index={2} />
      <PhotoRow photos={photoRows[2]} direction="left" />

      <GalleryText section={galleryTexts[3]} index={3} />
      <PhotoRow photos={photoRows[3]} direction="right" />

      <GalleryText section={galleryTexts[4]} index={4} />
      <PhotoRow photos={photoRows[4]} direction="left" />

      {/* Final text - slowest animation */}
      <GalleryText section={galleryTexts[5]} index={5} />
    </section>
  );
};

export default Section4Gallery;
