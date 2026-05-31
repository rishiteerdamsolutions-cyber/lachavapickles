"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { isWishlisted, toggleWishlistId } from "@/lib/wishlist-storage";
import { cn } from "@/lib/cn";

interface Props {
  itemId: string;
}

export default function WishlistHeartButton({ itemId }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isWishlisted(itemId));
    const sync = () => setActive(isWishlisted(itemId));
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, [itemId]);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive(toggleWishlistId(itemId));
      }}
      className="wishlist-heart-btn"
    >
      <Heart
        className={cn(active ? "fill-[#1a1a1a] text-[#1a1a1a]" : "fill-none text-[#1a1a1a]")}
        strokeWidth={1.5}
      />
    </button>
  );
}
