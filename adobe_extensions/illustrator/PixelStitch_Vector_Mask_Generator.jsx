// Adobe Illustrator extension for PixelStitch graphic design system

// User input dialog
var dialog = new Window("dialog", "PixelStitch Vector Mask Generator");

dialog.add('statictext', undefined, 'Enter the grid width (must be an integer between 8 and 128):');
var width_input = dialog.add('edittext', undefined, '16');
width_input.characters = 4;
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
height_input.characters = 4;
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
size_input.characters = 4;
dialog.add('statictext', undefined, 'Select the number of anchor points per grid square:');
var anchor_points_input = dialog.add('dropdownlist', undefined, [4, 8, 12, 16, 20, 24, 28, 32]);
anchor_points_input.characters = 4;

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
    width = parseInt(width_input.text, 10);
    height = parseInt(height_input.text, 10);
    size = parseInt(size_input.selection.text, 10);
    anchor_points = parseInt(anchor_points_input.selection.text, 10);
} else {
    alert("Script input cancelled.");
};

// Script execution below
if (isNaN(width) || isNaN(height) || width < 8 || width > 128 || height < 8 || height > 128) {
    alert("Please enter valid positive integers for width and height.");
} else {
    if (app.documents.length === 0) {
        alert("Please open a document before running this script.");
    } else {
        var doc = app.activeDocument;
        var layerName = "vector_mask";
        function layerExists(doc, layerName) {
            try {
                doc.layers.getByName(layerName);
                return true;
            } catch (e) {
                return false;
            }
        }
        function createStitch(x, y, size, anchor_points, layer, rowNum, colNum) {
            var points = [];
            var step = size / (anchor_points / 4);
            // Top edge (from top-left to top-right)
            for (var i = 0; i <= (anchor_points / 4); i++) {
                points.push([x + (i * step), y]);
            }
            // Right edge (from top-right to bottom-right)
            for (var i = 1; i <= (anchor_points / 4); i++) {
                points.push([x + size, y - (i * step)]);
            }
            // Bottom edge (from bottom-right to bottom-left)
            for (var i = (anchor_points / 4) - 1; i >= 0; i--) {
                points.push([x + (i * step), y - size]);
            }
            // Left edge (from bottom-left to top-left)
            for (var i = (anchor_points / 4) - 1; i > 0; i--) { // > instead of >=, since top left point is defined on top edge
                points.push([x, y - (i * step)]);
            }
            var path = layer.pathItems.add();
            path.setEntirePath(points);
            path.closed = true;
            path.filled = false;
            path.stroked = true;
            path.strokeWidth = 0.5;
            path.name = "stitch" + rowNum + "." + colNum;
            path.move(layer, ElementPlacement.PLACEATEND);
            return path;
        }
        if (layerExists(doc, layerName)) {
            alert("Layer '" + layerName + "' already exists. Please delete or rename this layer.");
        } else {
            var vectorMaskLayer = doc.layers.add();
            vectorMaskLayer.name = "vector_mask";

            for (var row = 1; row <= height; row++) {
                var rowLayer = vectorMaskLayer.layers.add();
                rowLayer.name = "row" + row;
                rowLayer.move(vectorMaskLayer, ElementPlacement.PLACEATEND);

                for (var col = 1; col <= width; col++) {
                    var x = (col - 1) * size
                    var y = -((row - 1) * size)  // negative to start from top
                    var rowNum = row
                    var colNum = col
                    var path = createStitch(x, y, size, anchor_points, rowLayer, rowNum, colNum);
                }
            }
            alert("Vector mask layer 'vector_mask' with sublayers generated successfully!");
        }
    }
}
