# Development notes

## The 'pixelstitch' directory
This directory is the home of all python scripts for the project.

## The 'backgrounds' directory
This directory is the home of all background images and vector masks. Each supported grid aspect ratio will have a dedicated subdirectory within this directory (e.g., "/PixelStitch/backgrounds/16x16/"). Example directory structure shown below:

```
backgrounds/
├── 128x128/
│   ├── 128x128-1_raster.png
│   ├── 128x128-1_mask.png
│   ├── 128x128-2_raster.png
│   └── 128x128-2_mask.svg
├── 16x16/
│   ├── 16x16-1_raster.png
│   ├── 16x16-1_mask.png
│   ├── 16x16-2_raster.png
│   └── 16x16-2_mask.svg
├── 32x32/
│   ├── 32x32-1_raster.png
│   ├── 32x32-1_mask.png
│   ├── 32x32-2_raster.png
│   └── 32x32-2_mask.svg
├── backgrounds.json
├── backgrounds.yaml
└── vector_mask_structure.svg
```

I'm still deciding between using `yaml` vs `json` for the background info file.