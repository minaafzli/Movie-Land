import {  useRef, useState } from "react";
import minus_icon from "../image/minus-circle.svg";
import add_icon from "../image/add-circle.svg";
import useClickOutside from "../hooks/useClickOutside";

function Question({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useClickOutside(containerRef ,()=> setIsOpen(false))

  return (
    <div
      ref={containerRef}
      className="bg-bgGray w-full rounded-2xl px-8 py-4 transition-all duration-300 cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between ">
        <p className="text-accent text-xl">{question}</p>
        <img
          src={isOpen ? minus_icon : add_icon}
          alt="toggle-icon"
          className="size-6"
        />
      </div>

      {isOpen && (
        <p className="text-muted text-sm pt-4 transition-all duration-300 text-left">
          {answer}
        </p>
      )}
    </div>
  );
}

export default Question;
