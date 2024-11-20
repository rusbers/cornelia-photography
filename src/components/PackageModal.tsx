import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export function PackageModal({
  children,
  packageName,
}: {
  children: React.ReactNode;
  packageName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="button">
          Book
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-uppercase text-center">
            Book {packageName}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
