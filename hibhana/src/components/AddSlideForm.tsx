// src/components/AddSlideForm.tsx

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function AddSlideForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
  });

  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, "categories"));
      const fetched = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
      setCategories(fetched);
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      await addDoc(collection(db, "heroSlides"), {
        ...formData,
      });

      toast({
        title: "Slide added!",
        description: "Hero slide has been saved.",
      });

      setFormData({ title: "", subtitle: "", image: "", link: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add slide",
        description: "Something went wrong. Try again.",
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
        <Select
          onValueChange={(value) => setFormData((prev) => ({ ...prev, link: value }))}
          value={formData.link}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category link" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={`/collections/${cat.id}`}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Slide"}
      </Button>
    </form>
  );
}
