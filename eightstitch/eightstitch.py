#!/usr/local/bin/python3

# pare down these imports later, once you've decided which to actually use
import argparse
import cairosvg
import json
import logging
import lxml
import numpy
import os
import PIL
import PIL.Image as Image
import subprocess
import svgpathtools
import threading
import xml
import xml.etree.ElementTree as XmlTree
import yaml

'''
DEVNOTES:
- Some really meaningful notes, yeah!
- Pixel aspect ratio needs to always be 1:1
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
# Eventually going to list all background raster & mask files in a json or yaml file
raster_background = None
vector_mask = None

class EightStitch:

    def __init__(self, user_design, raster_background, vector_mask):
        self.design = Image.open(user_design)
        self.bg_image = Image.open(raster_background)
        # Determine best method(s) for loading vector mask data from svg file
        self.mask2xmltree = XmlTree(vector_mask)
        self.mask2paths = svgpathtools.svg2paths(vector_mask)

    def ParseBackground(self):
        print('placeholder')

    def ParseMask(self):
        print('placeholder')

    def ParseDesign(self):
        print('placeholder')

    def GenerateColorMask(self):
        print('placeholder')

    def ExportRasterFrame(self):
        print('placeholder')