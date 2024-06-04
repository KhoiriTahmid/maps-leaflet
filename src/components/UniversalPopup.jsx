import { useEffect, useRef } from "react";

const Component = ({value, type, updatePopup}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        updatePopup('')
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);


  return (
    <div className={`w-screen z-[99999] cursor-pointer backdrop-blur-sm bg-white/30 h-screen fixed top-0 left-0 flex  ${type=="pojok"? "justify-end items-end p-10":"justify-center items-center"}`}>
      <div className="font-semibold text-xl p-24 bg-gray-800 " ref={ref}>
        {value}
      </div>
    </div>
  );
};

export default Component;