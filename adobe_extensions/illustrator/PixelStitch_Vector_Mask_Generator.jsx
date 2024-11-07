// Adobe Illustrator extension for PixelStitch graphic design system

// User input dialog
var dialog = new Window("dialog", "PixelStitch Vector Mask Generator");

dialog.add('statictext', undefined, 'Enter the grid width (must be an integer between 8 and 128):');
var width_input = dialog.add('edittext', undefined, '16');
width_input.onChanging = function() {
    width_input.text = width_input.text.replace(/[^\d]/g, '');
    var value = parseInt(width_input.text, 10);
    if (isNaN(value) || value < 8) {
        width_input.text = '8';
    } else if (value > 128) {
        width_input.text = '128'
    }
};
dialog.add('statictext', undefined, 'Enter the grid height (must be an integer between 8 and 128):');
var height_input = dialog.add('edittext', undefined, '16');
height_input.onChanging = function() {
    height_input.text = height_input.text.replace(/[^\d]/g, '');
    var value = parseInt(height_input.text, 10);
    if (isNaN(value) || value < 8) {
        height_input.text = '8';
    } else if (value > 128) {
        height_input.text = '128'
    }
};
dialog.add('statictext', undefined, 'Select the size of each grid square:');
var size_input = dialog.add('dropdownlist', undefined, [30, 60]);
dialog.add('statictext', undefined, 'Select the number of anchor points per grid square:');
var anchor_points_input = dialog.add('dropdownlist', undefined, [4, 8, 12, 16, 20]);

// OK and Cancel buttons
var buttonGroup = dialog.add('group');
buttonGroup.alignment = 'right';
var okButton = buttonGroup.add('button', undefined, 'OK');
var cancelButton = buttonGroup.add('button', undefined, 'Cancel');
okButton.onClick = function () {
    dialog.close(1); // Return a "1" status for OK
};
cancelButton.onClick = function () {
    dialog.close(0); // Return a "0" status for Cancel
};
if (dialog.show() == 1) {
    width = width_input.text;
    height = height_input.text;
    size = size_input.text;
    anchor_points = anchor_points_input.text
} else {
    alert("Script input cancelled.");
};

// Script execution below
if (isNaN(width) || isNaN(height) || width < 8 || width > 128 || height < 8 || height > 128) {
    alert("Please enter valid positive integers for width and height.");
} else {
    // Check if there is an open document
    if (app.documents.length === 0) {
        alert("Please open a document before running this script.");
    } else {
        // Use the currently active document
        var doc = app.activeDocument;
        var layerName = "vector_mask";
        function layerExists(doc, layerName) {
            try {
                var layer = doc.layers.getByName(layerName);
                return true;  // Layer exists
            } catch (e) {
                return false; // Layer does not exist
            }
        }
        function createStitch(x, y, size, anchor_points) {
            var points = [];
            var step = size / (anchor_points / 4);
            // Top edge points (from top-left to top-right)
            for (var i = 0; i < (anchor_points / 4); i++) {
                points.push([x + (i * step), y]);
            }
            // Right edge points (from top-right to bottom-right)
            for (var i = 1; i < (anchor_points / 4); i++) {
                points.push([x + size, y - (i * step)]);
            }
            // Bottom edge points (from bottom-right to bottom-left)
            for (var i = (anchor_points / 4) - 2; i >= 0; i--) {
                points.push([x + (i * step), y - size]);
            }
            // Left edge points (from bottom-left to top-left)
            for (var i = (anchor_points / 4) - 2; i > 0; i--) {
                points.push([x, y - (i * step)]);
            }
            // Create the path
            var path = vectorMaskLayer.pathItems.add();
            path.setEntirePath(points);
            path.closed = true;  // Ensure the path is closed
            path.filled = false; // No fill color
            path.stroked = true; // Add stroke if desired for visibility
            path.strokeColor = new NoColor(); // Or define a color if needed
            return path;
        }
        if (layerExists(doc, layerName)) {
            alert("Layer '" + layerName + "' already exists. Please delete or rename this layer.");
        } else {
            var vectorMaskLayer = doc.layers.add();
            vectorMaskLayer.name = "vector_mask";

            // Set up document dimensions to fit the grid
            var spacing = 20;  // Adjust spacing between paths
            var pathSize = 10; // Size of each path (adjust as necessary)

            // Loop through rows
            for (var row = 1; row <= height; row++) {
                var rowLayer = vectorMaskLayer.layers.add();
                rowLayer.name = "row" + row;

                // Loop through columns
                for (var col = 1; col <= width; col++) {
                    var path = rowLayer.pathItems.rectangle(
                        -((row - 1) * spacing), // y-position (negative to start from top)
                        (col - 1) * spacing,    // x-position
                        pathSize, pathSize      // width, height of the path
                    );

                    // Set the path name and clear fill/stroke settings
                    path.name = "stitch" + row + "." + col;
                    path.filled = false;          // No fill color
                    path.stroked = false;         // No stroke color
                }
            }
            alert("Vector mask layer 'vector_mask' with sublayers generated successfully!");
        }
    }
}
