import { Wifi, WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNetwork } from "@/context/NetworkContext";

const NetworkStatus = () => {
 
  const { isOnline } = useNetwork();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    if (isOnline) {
      toast.success("You're back online");
      const timer = setTimeout(() => setVisible(false), 3000);

      return () => clearTimeout(timer);
    }

    toast.error("Internet connection lost");
  }, [isOnline]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          className={`fixed left-1/2 top-4 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-xl px-5 py-3 shadow-xl ${
            isOnline
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}

          <span className="font-medium">
            {isOnline
              ? "You're back online"
              : "You're offline"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatus;