#!/usr/local/bin/python3

# pare down these imports later, once you've decided which to actually use
import argparse
import cairosvg
import json
import logging
import lxml
import numpy as np
import os
import PIL
import subprocess
import svgpathtools
import threading
import xml
import yaml
from PIL import Image
from xml.etree import ElementTree as XmlTree

'''
DEVNOTES:
- Some really meaningful notes, yeah!
- Pixel aspect ratio needs to always be 1:1
- User designs restricted to 4-bit color
- Apply pixel animations to background using shaders in Godot
- Processing required:
    - Parse background raster image
        - Number of pixels & aspect ratio
    - Parse vector mask
        - Number of 'pixels' & aspect ratio
        - Store contents of mask file as data
    - Parse design
        - Number of pixels & aspect ratio
        - If pixel count & aspect ratio match mask, store pixel color data (gotta figure out format)
    - Generate color mask
        - Apply design color data to mask data
        - Create new file and write updated mask data to file
    - Export final raster frame (for file render applications)
        - Need to merge design vector data with background image - figure out appropriate method

'''

# Input files
user_design = None
# Eventually going to list all background raster & mask files in a json or yaml file - might do this in higher-level script
raster_background = None
vector_mask = None

class PixelStitch:

    def __init__(self, user_design, raster_background, vector_mask):
        self.design = Image.open(user_design).convert('RGBA')
        self.bg_image = Image.open(raster_background).convert('RGBA')
        self.mask_xmltree = XmlTree.parse(vector_mask)
        self.mask_paths = svgpathtools.svg2paths(vector_mask)

    def HexToRgba(self, hex_color, opacity):
        hex_color = hex_color.lstrip('#')
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        a = int(float(opacity) * 255) if opacity else 0  # Set alpha based on fill-opacity or fully opaque
        return [r, g, b, a]
    
    def RgbaToHex(self, r, g, b, a):
        r_hex = f'{r:02X}'
        g_hex = f'{g:02X}'
        b_hex = f'{b:02X}'
        hex_color = ''.join(['#', r_hex, g_hex, b_hex])
        opacity = f'{a / 255:.2f}'
        return [hex_color, opacity]

    def ParseMask(self):
        # Construct pixel array w/ same structure as png array
        mask_root = self.mask_xmltree.getroot()
        rows = mask_root.findall('{http://www.w3.org/2000/svg}g')
        height = len(rows)
        width = len(rows[0].findall('{http://www.w3.org/2000/svg}path')) if height > 0 else 0

        # Initialize a NumPy array for RGBA data - use uint8 for RGBA (0-255 range)
        self.mask_array = np.zeros((height, width, 4), dtype=np.uint8)

        # Loop through each row and each path to fill in the array
        for i, row in enumerate(rows):
            paths = row.findall('{http://www.w3.org/2000/svg}path')

            for j, path in enumerate(paths):
                fill = path.attrib.get('fill', '#000000') # Default to black if fill is missing
                fill_opacity = path.attrib.get('fill-opacity', '0') # Default to fully transparent if opacity is missing

                # Convert to RGBA and store in the array
                rgba = self.HexToRgba(fill, fill_opacity)
                self.mask_array[i, j] = rgba

        return self.mask_array

    def ParseDesign(self):
        self.design_array = np.array(self.design)
        if self.design_array.shape != self.mask_array.shape:
            print('placeholder')

    def PopulateVectorMask(self):
        print('placeholder')

    def ParseBackground(self):
        # this method may not be necessary, tbd
        self.bg_image_array = np.array(self.bg_image)

    def ExportRasterFrame(self):
        print('placeholder')
