import { useState } from "react";
import TechCard, { TechCardProps } from "@/app/components/TechCard";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectCardProps {
  onClick?: () => void;
  project_name: string;
  developedAt?: string;
  details?: string;
  highlight_image: string;
  tooltip_images: string[];
  tech_skills: TechCardProps[];
}

const ProjectCard = ({
  onClick,
  project_name,
  details,
  highlight_image,
  tooltip_images,
  tech_skills,
}: ProjectCardProps) => {
  const [isOpen, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tooltip_images.length);
  };

  const goPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + tooltip_images.length) % tooltip_images.length
    );
  };

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick ? onClick : () => setOpen(!isOpen)}
      className="
        relative flex flex-col lg:flex-row items-center gap-3 group text-sm lg:m-4 w-full
        transition-shadow duration-200
        hover:shadow-lg
        my-4
        cursor-pointer
      "
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 overflow-hidden backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black"
            />

            {tooltip_images.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrevious();
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{ opacity: currentIndex === 0 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-[51]"
              >
                <ChevronLeftIcon />
              </motion.button>
            )}

            {tooltip_images.length > 1 && (
              <div className="relative z-[51] max-w-[90vw] max-h-[80vh] overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={tooltip_images[currentIndex]}
                    src={tooltip_images[currentIndex]}
                    loading="lazy"
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                  />
                </AnimatePresence>
              </div>
            )}

            {tooltip_images.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  opacity: currentIndex === tooltip_images.length - 1 ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="relative z-[51]"
              >
                <ChevronRightIcon />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center lg:items-start flex-col lg:flex-row gap-6 lg:p-6 w-full min-w-0 ">
        <motion.div
          className="w-88 md:w-38 lg:w-48 max-w-xl aspect-video shrink-0 order-3 lg:order-0 overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <img src={highlight_image} className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex-1 flex-col min-w-0 lg:border-l border-gray-300 lg:pl-3">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-semibold truncate order-1 lg:order-2">
              {project_name}
            </h2>
          </div>
          <div className="text-xs text-gray-500">
            <p className="text-justify break-words">{details}</p>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap order-2 lg:order-3">
            {tech_skills.map((tech_skill) => (
              <TechCard key={tech_skill.TechnologyName} {...tech_skill} />
            ))}
          </div>
        </div>
      </div>
      <hr className="w-full border-t border-gray-300 my-2 lg:hidden" />
    </motion.div>
  );
};

export default ProjectCard;