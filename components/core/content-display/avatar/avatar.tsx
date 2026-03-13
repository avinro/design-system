/**
 * Avatar — Reference implementation
 *
 * Extracted from Figma file: nGsiItayj12cfi3AKbP1mB, node: 5009:2266
 * Figma frame name: "Avatar"
 *
 * This file is a typed reference component for documentation purposes.
 * Adapt to your project's framework, styling system, and token setup.
 *
 * COMPONENT PATTERN: Display-only circular user photo with placeholder fallback.
 *
 * Confirmed from Figma:
 * - Shape: always fully circular (border-radius: 50%)
 * - 7 sizes: XS (24px), SM (32px), MD (40px), LG (48px), XL (56px), XXL (72px), Largest (96px)
 * - Photo fills the container without letterboxing (object-cover)
 * - Placeholder silhouette shown when no photo is available (Figma "pic1" state)
 * - No interactive states — display-only component
 *
 * NOTE: The Figma "avatar" prop (pic1–pic5) represents sample content for
 * documentation preview only. In implementation, accept a dynamic src and
 * fall back to a placeholder when no image is available.
 *
 * TODO: Confirm placeholder background color and silhouette icon tokens.
 * TODO: Confirm whether an online indicator dot or badge is part of this component.
 * TODO: Confirm loading/skeleton state behavior.
 * TODO: Confirm initials fallback variant if planned.
 */

import React, { useState } from "react";

export type AvatarSize = "XS" | "SM" | "MD" | "LG" | "XL" | "XXL" | "Largest";

export interface AvatarProps {
  /** Image source URL for the user's profile photo. If omitted or fails to load, the placeholder is shown. */
  src?: string;
  /** Accessible name for the avatar. Typically the user's name. */
  alt?: string;
  /** Size of the avatar. Determines the pixel dimensions. Default: "MD". */
  size?: AvatarSize;
  /** Additional class names. */
  className?: string;
}

// Pixel dimensions confirmed from Figma.
const SIZE_MAP: Record<AvatarSize, number> = {
  XS:      24,
  SM:      32,
  MD:      40,
  LG:      48,
  XL:      56,
  XXL:     72,
  Largest: 96,
};

/**
 * Placeholder silhouette rendered when no photo is available.
 * TODO: Replace with confirmed icon token or asset.
 */
function AvatarPlaceholder({ size }: { size: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        // TODO: Replace with confirmed design token for placeholder background.
        background: "rgba(29, 29, 35, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* Inline fallback silhouette icon — replace with icon component if available */}
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" fill="rgba(29,29,35,0.3)" />
        <path
          d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
          stroke="rgba(29,29,35,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function Avatar({
  src,
  alt = "",
  size = "MD",
  className,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const px = SIZE_MAP[size];
  const showPlaceholder = !src || hasError;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: px,
    height: px,
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className={className} style={containerStyle}>
      {showPlaceholder ? (
        <AvatarPlaceholder size={px} />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          style={{
            width: px,
            height: px,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </div>
  );
}
