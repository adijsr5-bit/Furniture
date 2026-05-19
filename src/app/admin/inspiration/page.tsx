"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Image as ImageIcon, Sparkles, Upload } from "lucide-react";

interface InspirationImage {
  _id: string;
  url: string;
  caption: string;
}

export default function AdminInspiration() {
  const [images, setImages] = useState<InspirationImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [urlInput, setUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/inspiration");
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (err) {
      console.error("Failed loading inspiration images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: urlInput.trim(),
          caption: captionInput.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setImages([data.data, ...images]);
        setUrlInput("");
        setCaptionInput("");
        alert("Image added successfully to gallery!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add image.");
    } finally {
      setSubmitting(false);
    }
  };

  // Convert local file to base64 and add to gallery
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingFile(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const res = await fetch("/api/inspiration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: base64String,
            caption: file.name.split(".")[0] || "Uploaded Space",
          }),
        });

        const data = await res.json();
        if (data.success) {
          setImages([data.data, ...images]);
          alert("Image uploaded and added successfully!");
        }
      } catch (err) {
        console.error(err);
        alert("Upload failed.");
      } finally {
        setUploadingFile(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this space from the Inspiration Gallery?")) return;
    try {
      const res = await fetch(`/api/inspiration/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setImages(images.filter(img => img._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-serif text-3xl text-brand-dark">Inspiration Gallery</h2>
        <p className="text-gray-500 text-sm font-light">Upload, view, and manage interior design spaces highlighted on your portal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Upload & Input Form */}
        <div className="lg:col-span-4 bg-white border p-6 md:p-8 rounded-sm shadow-sm space-y-6">
          <h3 className="font-serif text-lg text-brand-dark border-b pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-gold" /> Add New Space
          </h3>

          {/* Form */}
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5 font-medium">Image URL</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                className="w-full border p-3 text-xs focus:border-brand-gold outline-none"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5 font-medium">Caption (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Contemporary Living Room"
                className="w-full border p-3 text-xs focus:border-brand-gold outline-none"
                value={captionInput}
                onChange={e => setCaptionInput(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-dark text-white py-3 uppercase tracking-widest text-xs font-semibold hover:bg-brand-gold transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {submitting ? "Adding..." : "Add via URL"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">OR</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Upload Local File Box */}
          <div className="border border-dashed border-gray-300 rounded-sm p-6 text-center hover:border-brand-gold transition-colors relative cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              disabled={uploadingFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
            <p className="text-xs text-brand-dark font-medium mb-1">
              {uploadingFile ? "Uploading image..." : "Upload Local Photo"}
            </p>
            <p className="text-[10px] text-gray-400 font-light">JPG, PNG or WEBP up to 5MB</p>
          </div>
        </div>

        {/* Right Side: Active Gallery Grid */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-t-2 border-brand-gold rounded-full animate-spin mx-auto"></div>
            </div>
          ) : images.length === 0 ? (
            <div className="py-24 bg-white border text-center p-8">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Gallery is Empty</h3>
              <p className="text-gray-500 font-light text-sm">Upload some designer spaces to populate your gallery.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <div 
                  key={img._id} 
                  className="group relative aspect-video bg-gray-100 overflow-hidden border border-gray-100 shadow-sm hover:shadow transition-all"
                >
                  <img
                    src={img.url}
                    alt={img.caption || "Designer Space"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay Controls */}
                  <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(img._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm shadow-md transition-colors"
                        title="Delete Space"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <p className="text-white text-xs font-serif leading-tight">{img.caption || "Designer Space"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
