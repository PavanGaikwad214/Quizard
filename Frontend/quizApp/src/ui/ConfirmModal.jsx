// src/ui/ConfirmModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../ui/AnimationButton";

function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="bg-[#0f1229] rounded-2xl p-6 w-full max-w-sm text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-white mb-3">
            {title}
          </h2>

          <p className="text-gray-300 mb-6">
            {message}
          </p>

          <div className="flex gap-4">
            <AnimatedButton
              onClick={onCancel}
              className="w-1/2 py-2 rounded-xl bg-gray-600 text-white"
            >
              Cancel
            </AnimatedButton>

            <AnimatedButton
              onClick={onConfirm}
              className="w-1/2 py-2 rounded-xl bg-red-500 text-white"
            >
              Submit
            </AnimatedButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ConfirmModal;
