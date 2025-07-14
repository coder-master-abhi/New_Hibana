import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { deleteProduct } from '../services/firestore';
import { toast } from 'react-hot-toast';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Loader2, Edit, Trash2 } from 'lucide-react';

type ProductListProps = {
  onEditProduct: (productId: string) => void;
};

export default function ProductList({ onEditProduct }: ProductListProps) {
  const { products, loading, error, refreshProducts } = useProducts();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      toast.success('Product deleted successfully');
      refreshProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const renderTable = (data: typeof products, title: string) => (
    <>
      <h2 className="text-xl font-bold mt-10 mb-4">{title}</h2>

      {/* ✅ Scrollable wrapper */}
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Collections</TableHead>
              <TableHead>Indian Wear</TableHead>
              <TableHead>Western Wear</TableHead>
              <TableHead>Collection Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>₹{Number(product.price).toLocaleString()}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>{product.collections ? 'Yes' : 'No'}</TableCell>
                <TableCell>{!!product.indianWear ? 'Yes' : 'No'}</TableCell>
                <TableCell>{!!product.westernWear ? 'Yes' : 'No'}</TableCell>
                <TableCell>{product.collectionType || '—'}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate">
                    {product.description || '—'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditProduct(product.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );


  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  const featuredProducts = products.filter((p) => p.featured);
  const collectionProducts = products.filter((p) => p.collections);

  return (
    <div>
      {renderTable(featuredProducts, '🔥 Featured Products')}
      {renderTable(collectionProducts, '🧺 Our Collections')}
    </div>
  );
}
