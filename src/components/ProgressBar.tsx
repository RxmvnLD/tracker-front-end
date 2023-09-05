interface ProgressBarProps {
    max: number;
    value: number;
}
const ProgressBar = ({ max, value }: ProgressBarProps) => {
    const progressPercentage = (value * 100) / max;
    return (
        <div className="w-full h-3 rounded-md bg-gray-300/50">
            <div
                style={{ width: `${progressPercentage}%` }}
                className={`h-full rounded-md ${
                    progressPercentage < 70 ? "bg-red-300" : "bg-green-300"
                }`}
            ></div>
        </div>
    );
};
export default ProgressBar;
