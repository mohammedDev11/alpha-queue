// import React from "react";
// import type { IconType } from "react-icons";

// type ExpandedButtonProps = {
//   id: string;
//   label: string;
//   icon: IconType;
//   className?: string;
//   onClick?: () => void;
// };

// const ExpandedButton: React.FC<ExpandedButtonProps> = ({
//   label,
//   icon: Icon,
//   className = "",
//   onClick,
// }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`
//       group flex items-center overflow-hidden rounded-md
//       bg-brand-500 text-white
//       transition-all duration-700 hover:scale-105 p-2 cursor-pointer
//       ${className}
//     `}
//     >
//       <div className="flex h-10 w-10 items-center justify-center">
//         <Icon size={25} />
//       </div>

//       <span
//         className="
//           max-w-0 overflow-hidden whitespace-nowrap text-sm
//           transition-all duration-700
//           group-hover:max-w-[140px]
//           group-hover:pr-4
//         "
//       >
//         {label}
//       </span>
//     </button>
//   );
// };

// export default ExpandedButton;

import React from "react";
import type { IconType } from "react-icons";

type ExpandedButtonProps = {
  id: string;
  label: string;
  icon: IconType;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "ghost";
};

const ExpandedButton: React.FC<ExpandedButtonProps> = ({
  label,
  icon: Icon,
  className = "",
  onClick,
  variant = "default",
}) => {
  const variantStyles = {
    default: "bg-brand-500 text-white",
    ghost: "bg-transparent", // ✅ removed color control
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center overflow-hidden rounded-md
        transition-all duration-500 hover:scale-105 px-2 py-1 cursor-pointer
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <div className="flex h-10 w-10 items-center justify-center">
        <Icon size={18} />
      </div>

      <span
        className="
          max-w-0 overflow-hidden whitespace-nowrap text-sm
          transition-all duration-700
          group-hover:max-w-[140px]
          group-hover:pr-4
        "
      >
        {label}
      </span>
    </button>
  );
};

export default ExpandedButton;
