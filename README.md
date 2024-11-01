# 8-Stitch
Needlepoint-style rendering of 8-bit pixelated designs

## Premise
Graphics processor that takes 8-bit style designs and adapts them to a needlepoint grid that changes with each animation frame - giving the impression that each frame is its own organic needlepoint canvas.

## Method
8-stitch starts with plain white needlepoint canvases as backgrounds for user designs. These backgrounds need to have minimal lens distortion, because they will be functioning as the pixel grid of any rendered graphics. They will also have zero saturation, allowing them to take on the colors of user designs. Ideally, there will be at least 5-10 unique canvases, which the animation will cycle through on a frame-by-frame basis.

