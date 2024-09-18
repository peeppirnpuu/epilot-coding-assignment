"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/Button";
import { getRandomValueFromArray } from "@/helpers";

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

type PasttimeQuizProps = {
  answers: string[];
  color: string;
};

export default function PasttimeQuiz({ answers, color }: PasttimeQuizProps) {
  const [items, setItems] = useState<string[]>([
    getRandomValueFromArray(answers),
  ]);

  const addItem = (item: string) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = () => {
    setItems((prevItems) => prevItems.slice(1));
  };

  const handleClick = () => {
    removeItem();

    setTimeout(() => {
      addItem(getRandomValueFromArray(answers));
    }, 300);
  };

  return (
    <AnimatePresence>
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Button
            color={color}
            onClick={handleClick}
            size="small"
            type="primary"
          >
            {item}
          </Button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
