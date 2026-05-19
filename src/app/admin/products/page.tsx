"use client";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "", slug: "", category: "", price: "", description: "", material: "", dimensions: "", images: [] as string[]
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.data || []);
    setIsLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const fileData = new FormData();
    fileData.append("file", e.target.files[0]);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fileData });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = currentProduct ? `/api/products/${currentProduct.slug}` : "/api/products";
    const method = currentProduct ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${slug}`, { method: "DELETE" });
    fetchProducts();
  };

  const openModal = (product: any = null) => {
    setCurrentProduct(product);
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: "", slug: "", category: "", price: "", description: "", material: "", dimensions: "", images: [] });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-900">Product Catalog</h2>
        <button onClick={() => openModal()} className="bg-brand-dark text-white px-4 py-2 text-sm uppercase tracking-wider hover:bg-brand-gold flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Image</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : products.map((prod: any) => (
              <tr key={prod._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                    {prod.images?.[0] ? <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" /> : <ImageIcon className="w-6 h-6 m-3 text-gray-400" />}
                  </div>
                </td>
                <td className="p-4 text-sm font-medium text-gray-900">{prod.name}</td>
                <td className="p-4 text-sm text-gray-500">{prod.category}</td>
                <td className="p-4 text-sm text-gray-500">{prod.price}</td>
                <td className="p-4 flex items-center gap-3">
                  <button onClick={() => openModal(prod)} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(prod.slug)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-medium mb-6">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Name</label>
                  <input required className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Slug</label>
                  <input required className="w-full border p-2 text-sm bg-gray-50 outline-none" value={formData.slug} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Category</label>
                  <input required className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Price</label>
                  <input required className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Description</label>
                <textarea required className="w-full border p-2 text-sm focus:border-brand-gold outline-none" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Materials</label>
                  <input required className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Dimensions</label>
                  <input required className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Images</label>
                <div className="flex flex-wrap gap-4 mb-2">
                  {formData.images.map((img, i) => (
                    <div key={i} className="w-20 h-20 relative bg-gray-100 rounded overflow-hidden">
                      <Image src={img} alt="Product" fill className="object-cover" />
                      <button type="button" onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, idx) => idx !== i)}))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
                <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploading} className="text-sm" />
                {uploading && <span className="text-xs text-blue-500 ml-2">Uploading to Cloudinary...</span>}
              </div>
              
              <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
                <button type="submit" className="bg-brand-dark text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-brand-gold">{currentProduct ? 'Update' : 'Save'} Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
