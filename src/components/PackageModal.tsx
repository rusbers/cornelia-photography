import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

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
