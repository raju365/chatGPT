import { useState } from "react";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex h-16 items-center border-b border-zinc-800 px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <div className="rounded-lg p-2 hover:bg-zinc-800 cursor-pointer">
              <Menu size={22} />
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 border-zinc-800 p-0">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>

        <h2 className="ml-4 text-lg font-bold">
          Oriv <span className="text-violet-500">AI</span>
        </h2>
      </div>
    </>
  );
};

export default MobileSidebar;