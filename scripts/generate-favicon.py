"""Generate favicon.ico and apple-touch-icon.png for the site."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

BG = (31, 58, 50, 255)
GOLD = (154, 123, 85, 255)
CREAM = (235, 228, 216, 255)


def draw_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = max(4, size // 5)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG)

    scale = size / 32
    points = [
        (5 * scale, 21 * scale),
        (9 * scale, 9 * scale),
        (14 * scale, 14 * scale),
        (18 * scale, 11 * scale),
        (24 * scale, 8 * scale),
        (27 * scale, 12 * scale),
    ]

    for index in range(len(points) - 1):
        draw.line([points[index], points[index + 1]], fill=GOLD, width=max(2, int(2.4 * scale)))

    cx, cy = 18 * scale, 11 * scale
    r = max(2, int(1.6 * scale))
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=CREAM)
    return img


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)

    sizes = [16, 32, 48]
    images = [draw_icon(size) for size in sizes]
    images[0].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(img.width, img.height) for img in images],
        append_images=images[1:],
    )

    apple = draw_icon(180)
    apple.save(PUBLIC / "apple-touch-icon.png", format="PNG")

    print("Generated public/favicon.ico and public/apple-touch-icon.png")


if __name__ == "__main__":
    main()
