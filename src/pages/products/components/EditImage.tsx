import { useEffect, useState, type ChangeEvent } from "react";

interface EditProductImageProps {
  image: string;
  onChange: (file: File) => void;
  error?: string;
}

const EditProductImage = ({
  image,
  onChange,
  error,
}: EditProductImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    onChange(file);

    const validTypes = ["image/png", "image/jpeg", "image/webp"];

    if (validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }

    event.currentTarget.value = "";
  };

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-3">
        <img
          src={previewUrl ?? image}
          alt="Product"
          className="h-full w-full object-contain"
        />
      </div>

      <label className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors sm:text-[15px] hover:bg-zinc-50">
        Change Image
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default EditProductImage;