import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

// Placeholder photos (user will replace later)
const createPlaceholders = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    placeholder: true,
  }));

const photoRows = [
  createPlaceholders(6),
  createPlaceholders(6),
  createPlaceholders(5),
  createPlaceholders(5),
  createPlaceholders(5),
];

const PhotoRow = ({
  photos,
  direction,
}: {
  photos: typeof photoRows[0];
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
            key={`${photo.id}-${i}`}
            className="flex-shrink-0 w-48 md:w-64 aspect-[4/3] rounded-lg bg-greige/60 border border-petal-primary/20 shadow-sm overflow-hidden relative group"
          >
            {/* Placeholder pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-petal-primary/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-stone-warm/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-[10px] text-stone-warm/40 tracking-wider">
                  Photo {photo.id + 1}
                </p>
              </div>
            </div>
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
        duration: (section as any).isFinal ? 1.5 : 0.9,
        delay: (section as any).isFinal ? 0.4 : 0.1,
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
        transition={{ duration: 0.8 }}
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
