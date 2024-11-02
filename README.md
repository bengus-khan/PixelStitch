# PixelStitch
8-Stitch is a needlepoint-style renderer for 8-bit style pixel designs.

## Premise
Graphics processor that takes 4-bit, pixel art designs and adapts them to a needlepoint grid that changes with each animation frame - giving the impression that each frame is its own organic needlepoint canvas.

## Method
PixelStitch starts with photos of plain white needlepoint canvases as backgrounds for user designs. These images need to have minimal perspective distortion and low saturation, allowing them to function as pixel grids and take on the colors of user designs. Ideally, there will be at least 5-10 unique canvases, which the animation will cycle through on a frame-by-frame basis.

Each unique background canvas will also have an accompanying vector mask that essentially divides the image area into "pixels" that share boundaries with each stitch on the grid of the needlepoint canvas. These vector masks will be drawn to match the actual physical boundaries of each stitch.

PixelStitch will then take any image with a resolution and aspect ratio that match the canvas's grid and map its colors to the individual pixels/stitches of the canvas, resulting in a photographic, needlepoint-style render of the original 8-bit style image.

## Intended applications
- Standalone graphics rendering tool
- Graphics rendering for Godot game engine
- Web-based graphics renderer