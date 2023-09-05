import { useState } from "react";

type ColorOptions =
    | "purpleBlue"
    | "cyanBlue"
    | "greenBlue"
    | "purplePink"
    | "pinkOrange"
    | "tealLime"
    | "redYellow";
type SizeOptions = "sm" | "md" | "lg" | "xl";
type TypeOptions = "button" | "submit" | "reset";

interface GradientButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    color?: ColorOptions;
    size?: SizeOptions; // sm, md, lg, xl
    disabled?: boolean;
    styles?: string;
    type?: TypeOptions;
}

const colorClasses = {
    purpleBlue:
        "from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
    cyanBlue:
        "from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800",
    greenBlue:
        "from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800",
    purplePink:
        "from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800",
    pinkOrange:
        "from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800",
    tealLime:
        "from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800",
    redYellow:
        "from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400",
};
export default function GradientButton({
    children,
    onClick,
    color = "purplePink",
    size = "md",
    disabled = false,
    styles,
    type,
}: GradientButtonProps) {
    const [colorClass] = useState(
        colorClasses[color as keyof typeof colorClasses],
    );

    return (
        <button
            className={`btn group ${styles} ${colorClass} ${
                disabled
                    ? "group from-neutral-900 to-gray-700 group-hover:from-slate-900 group-hover:to-gray-500 hover:text-white dark:text-white"
                    : ""
            }`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            <span
                className={`btn-span cursor-pointer ${size} ${
                    disabled ? "dark:bg-gray-900" : ""
                }`}
            >
                {children}
            </span>
        </button>
    );
}
