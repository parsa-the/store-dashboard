import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import { ImagePlus, X } from "lucide-react";

interface HandleImageProps {
  onImageChange: (file: File | null) => void;
}

const HandleImage = ({ onImageChange }: HandleImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImage = (file?: File) => {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setImageError("Only PNG and JPG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be under 5 MB.");
      return;
    }

    setImage(file);
    setImageError("");
    onImageChange(file);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    handleImage(e.dataTransfer.files[0]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImage(e.target.files?.[0]);
    e.target.value = "";
  };

  const removeImage = () => {
    setImage(null);
    setImageError("");
    onImageChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="product-image"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative flex h-40 w-full cursor-pointer flex-col
             items-center justify-center overflow-hidden rounded-lg
             border-2 border-dashed border-slate-200 bg-slate-50
             transition-colors hover:bg-blue-50/50"
      >
        <input
          id="product-image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
          className="sr-only"
        />

        {preview ? (
          <div className="h-11/12">
            <button
              type="button"
              onClick={removeImage}
              className="absolute  opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 right-32 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={preview}
              alt="Product preview"
              className="h-full w-full object-contain p-2"
            />
          </div>
        ) : (
          <>
            <ImagePlus className="h-6 w-6 text-blue-500" />

            <span className="text-sm font-medium text-slate-700">
              Click to upload or drag and drop
            </span>

            <span className="text-xs text-slate-400">
              PNG or JPG, up to 5 MB
            </span>
          </>
        )}
      </label>

      {imageError && <p className="text-sm text-red-500">{imageError}</p>}
    </div>
  );
};

export default HandleImage;
