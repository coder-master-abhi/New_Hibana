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

  if (products.length === 0) {
    return <div className="text-center p-4">No products found. Create your first product!</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
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
            <TableCell>${Number(product.price).toFixed(2)}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
            <TableCell className="space-x-2">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}