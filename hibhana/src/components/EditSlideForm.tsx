import { useEffect, useState } from "react";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

interface Props {
  slide: Slide;
  onSuccess: () => void;
}

export function EditSlideForm({ slide, onSuccess }: Props) {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: slide.title,
    subtitle: slide.subtitle,
    image: slide.image,
    link: slide.link,
  });

  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snap = await getDocs(collection(db, "categories"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, subtitle, image, link } = formData;

    if (!title || !subtitle || !image || !link) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "All fields are required.",
      });
      return;
    }

    setLoading(true);
    try {
      const slideRef = doc(db, "heroSlides", slide.id);
      await updateDoc(slideRef, {
        title,
        subtitle,
        image,
        link,
      });

      toast({
        title: "Slide updated!",
        description: "Hero slide has been successfully updated.",
      });

      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea id="subtitle" value={formData.subtitle} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" value={formData.image} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="link">Link to Category</Label>
        <select
          id="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={`/collections/${cat.id}`}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Slide"}
      </Button>
    </form>
  );
}
