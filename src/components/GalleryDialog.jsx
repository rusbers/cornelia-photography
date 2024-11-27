import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export function GalleryDialog(props) {
  return (
    <Dialog>
      <DialogTrigger>{props.imageComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-uppercase sr-only text-center">
            Dialog
          </DialogTitle>
        </DialogHeader>
        {props.lightbox}
      </DialogContent>
    </Dialog>
  );
}
