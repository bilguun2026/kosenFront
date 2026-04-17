import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface CardProps {
  icon: IconType;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, description }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="flex flex-col bg-white rounded-xl p-8 w-full max-w-md min-h-[250px] border border-gray-100 my-8"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Icon className="text-4xl kosenText1 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 text-lg flex-grow">{description}</p>
    </motion.div>
  );
};

export default Card;
