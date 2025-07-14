// src/components/HeroSlideList.tsx
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { EditSlideForm } from "../components/EditSlideForm";
 

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const HeroSlideList = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "heroSlides"));
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Slide[];
    setSlides(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this slide?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "heroSlides", id));
      toast({ title: "Slide deleted successfully." });
      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete slide.", variant: "destructive" });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slides.map((slide) => (
            <TableRow key={slide.id}>
              <TableCell>
                <img src={slide.image} alt={slide.title} className="w-20 h-14 object-cover rounded-md" />
              </TableCell>
              <TableCell>{slide.title}</TableCell>
              <TableCell className="max-w-xs truncate">{slide.subtitle}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{slide.link}</TableCell>
              <TableCell className="text-right space-x-2">
                <Dialog
                  open={isEditDialogOpen && selectedSlide?.id === slide.id}
                  onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) setSelectedSlide(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedSlide(slide);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Slide</DialogTitle>
                    </DialogHeader>
                    <EditSlideForm
                      slide={slide}
                      onSuccess={() => {
                        fetchSlides();
                        setIsEditDialogOpen(false);
                        setSelectedSlide(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>

                <Button variant="destructive" onClick={() => handleDelete(slide.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {loading && <p className="text-center text-sm text-muted-foreground py-4">Loading slides...</p>}
    </div>
  );
};

export default HeroSlideList;
