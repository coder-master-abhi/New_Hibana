import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useToast } from "../components/ui/use-toast";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useCategories } from "../context/CategoryContext";

export default function AddCategoryForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const { toast } = useToast();
  const { refreshCategories } = useCategories();

  const generateSlug = (name: string) =>
    name.toLowerCase().trim().replace(/\s+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !imageURL.trim()) {
      return toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Title and image URL are required.",
      });
    }

    try {
      setUploading(true);

      const newCategory = {
        title,
        slug: generateSlug(title),
        description,
        image: imageURL, // ✅ Directly save the image link
      };

      await addDoc(collection(db, "categories"), newCategory);

      toast({
        title: "Category added",
        description: `"${title}" has been added successfully.`,
      });

      setTitle("");
      setDescription("");
      setImageURL("");
      refreshCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add category. Try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Category Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Sherwani"
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description..."
        />
      </div>

      {/* ✅ Dynamic Image URL */}
      <div>
        <Label htmlFor="imageURL">Image URL</Label>
        <Input
          id="imageURL"
          type="url"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Paste image URL (e.g., Cloudinary or CDN link)"
          required
        />
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="mt-2 rounded-md w-48 h-48 object-cover border"
          />
        )}
      </div>

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? "Saving..." : "Add Category"}
      </Button>
    </form>
  );
}
// This component allows admins to add new categories with a title, description, and image URL.
// It uses Firebase Firestore to save the category data and provides a toast notification on success or failure.