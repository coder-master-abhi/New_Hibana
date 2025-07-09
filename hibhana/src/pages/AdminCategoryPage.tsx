import { useState } from "react";
import { useCategories } from "../context/CategoryContext";
import AddCategoryForm from "./AddCategoryForm";
import { deleteCategory, updateCategory } from "../services/firestore";
import { useToast } from "../components/ui/use-toast";
import { Trash2, Edit } from "lucide-react";

export default function AdminCategoryPage() {
  const { categories, loading, error, refreshCategories } = useCategories();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      setDeletingSlug(slug);
      await deleteCategory(slug);
      toast({ title: "Category deleted successfully" });
      await refreshCategories();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Could not delete this category.",
      });
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleEditClick = (category: any) => {
    setEditingSlug(category.slug);
    setEditData({
      title: category.title,
      description: category.description || "",
      image: category.image || "",
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData.title.trim() || !editData.image.trim()) {
      return toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Title and Image are required.",
      });
    }

    try {
      await updateCategory(editingSlug!, {
        title: editData.title,
        slug: editData.title.toLowerCase().trim().replace(/\s+/g, "-"),
        description: editData.description,
        image: editData.image,
      });

      toast({ title: "Category updated" });
      setEditingSlug(null);
      await refreshCategories();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update the category.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Category Management</h2>
        <button
          className="bg-[#7A0D1E] text-white px-4 py-2 rounded-md hover:bg-[#5e0a17] transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <AddCategoryForm />
        </div>
      )}

      <hr className="my-8" />

      <h3 className="text-xl font-semibold mb-4">Current Categories</h3>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) =>
                editingSlug === category.slug ? (
                  <tr key={category.slug} className="bg-yellow-50">
                    <td className="p-3">
                      <input
                        value={editData.image}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, image: e.target.value }))
                        }
                        className="w-32 text-xs p-1 border"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        value={editData.title}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className="w-32 text-xs p-1 border"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        value={editData.description}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        className="w-48 text-xs p-1 border"
                      />
                    </td>
                    <td className="p-3 italic text-muted-foreground text-xs">
                      {category.slug}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={handleEditSubmit}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSlug(null)}
                          className="text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={category.slug} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    </td>
                    <td className="p-3 font-medium">{category.title}</td>
                    <td className="p-3 text-gray-600">
                      {category.description || "—"}
                    </td>
                    <td className="p-3 italic text-xs text-muted-foreground">
                      {category.slug}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.slug)}
                          disabled={deletingSlug === category.slug}
                          className="text-red-600 hover:text-red-800"
                        >
                          {deletingSlug === category.slug ? "Deleting..." : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
