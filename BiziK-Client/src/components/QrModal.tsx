import { FunctionComponent } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";

interface QrModalProps {
  value: string;
  title: string;
  onClose: () => void;
}

const QrModal: FunctionComponent<QrModalProps> = ({ value, title, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X size={20} />
        </button>
        <h3 className="mb-4 text-center text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h3>
        <div className="flex justify-center rounded-xl bg-white p-4">
          <QRCodeSVG value={value} size={200} />
        </div>
        <p className="mt-4 break-words text-center text-sm text-slate-500 dark:text-slate-400">
          {value}
        </p>
      </div>
    </div>
  );
};

export default QrModal;
