import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

/* Type 2 = Stateful (Radix-powered) Components */

const myDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    console.log(isOpen);
  }, [isOpen]);

  const setter = (isOpen: boolean) => {
    if (isOpen) {
      setIsOpen(true);
      return;
    }
    if (window.confirm("are u sure to cancel?")) {
      setIsOpen(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-6">
      {/* uncontrolled state */}
      <Dialog>
        <DialogTrigger>Open (uncontrolled state) </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* controlled state */}

      <Dialog open={isOpen} onOpenChange={setter}>
        <DialogTrigger>Open (controlled state) </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default myDialog;
