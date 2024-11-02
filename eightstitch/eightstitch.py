#!/usr/local/bin/python3

import argparse
import logging
import os
import subprocess
import threading

'''
DEVNOTES:
- Some really meaningful notes, yeah!
- Pixel aspect ratio needs to always be 1:1
- Processing required:
    - Parse vector mask
        - Number of 'pixels' & aspect ratio
    - Parse design
        - Number of pixels & aspect ratio
        - If pixel count & aspect ratio match mask, store pixel color data (gotta figure out format)
    - Generate design vector file
        - Load contents of mask file as data
        - Apply design color data to mask data
        - Create new file and write updated mask data to file
    - Generate resulting final image
        - Somehow need to merge design vector data with background image - figure out appropriate method

'''

user_design = None
raster_background = None
vector_mask = None

class PixelToMask:

    def __init__(self, user_design, raster_background, vector_mask):
        self.design = user_design
        self.bg_image = raster_background
        self.bg_mask = vector_mask

    def ParseMask(self):
        print('placeholder')

    def ParseDesign(self):
        print('placeholder')

    def GenerateMaskFile(self):
        print('placeholder')