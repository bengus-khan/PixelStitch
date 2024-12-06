// Adobe Illustrator extension for PixelStitch graphic design system

// User input dialog
var dialog = new Window("dialog", "PixelStitch: Stitch Generator");

dialog.add('statictext', undefined, 'Enter the design width (must be an integer between 8 and 256):');
var width_input = dialog.add('edittext', undefined, '16');
width_input.characters = 4;
width_input.onChanging = function() {
    width_input.text = width_input.text.replace(/[^\d]/g, '');
    var value = parseInt(width_input.text, 10);
    if (isNaN(value) || value < 8) {
        width_input.text = '8';
    } else if (value > 256) {
        width_input.text = '256'
    }
};
dialog.add('statictext', undefined, 'Enter the design height (must be an integer between 8 and 256):');
var height_input = dialog.add('edittext', undefined, '16');
height_input.characters = 4;
height_input.onChanging = function() {
    height_input.text = height_input.text.replace(/[^\d]/g, '');
    var value = parseInt(height_input.text, 10);
    if (isNaN(value) || value < 8) {
        height_input.text = '8';
    } else if (value > 256) {
        height_input.text = '256'
    }
};

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
} else {
    alert("Script input cancelled.");
};

// Script execution below
if (isNaN(width) || isNaN(height) || width < 8 || width > 256 || height < 8 || height > 256) {
    alert("Must assign acceptable values for width and height.");
} else {
    if (app.documents.length === 0) {
        alert("Please open a document before running this script.");
    } else {
        var doc = app.activeDocument;
        var layerName = "needlepoint_stage";
        var stitchSpacing = 10;
        function layerExists(doc, layerName) {
            try {
                doc.layers.getByName(layerName);
                return true;
            } catch (e) {
                return false;
            }
        }
        function createStitch(x, y, stitchSpacing, layer, rowNum, colNum) {
            var points = [];
            var increment = stitchSpacing / 10;

            // plot anchor points, starting in top left and working clockwise
            points.push([x - (increment * 4), y - (increment * 4)]);
            points.push([x + (increment * 4), y - (increment * 6)]);
            points.push([x + (increment * 6), y - (increment * 4)]);
            points.push([x + (increment * 4), y + (increment * 4)]);
            points.push([x - (increment * 4), y + (increment * 6)]);
            points.push([x - (increment * 6), y + (increment * 4)]);

            var path = layer.pathItems.add();
            path.setEntirePath(points);
            path.closed = true;
            path.filled = false;
            path.stroked = true;
            path.strokeWidth = 0.1;
            path.opacity = 100;
            path.blendingMode = BlendModes.NORMAL;
            path.name = "stitch" + rowNum + "." + colNum;
            path.move(layer, ElementPlacement.PLACEATEND);
            return path;
        }
        if (layerExists(doc, layerName)) {
            alert("Layer '" + layerName + "' already exists. Please delete or rename this layer.");
        } else {
            var needlepointLayer = doc.layers.add();
            needlepointLayer.name = "needlepoint_stage";

            for (var row = 1; row <= height; row++) {
                var rowLayer = needlepointLayer.layers.add();
                rowLayer.name = "row" + row;
                rowLayer.move(needlepointLayer, ElementPlacement.PLACEATEND);

                for (var col = 1; col <= width; col++) {
                    var x = (col - 1) * stitchSpacing
                    var y = -((row - 1) * stitchSpacing)  // negative to start from top
                    var rowNum = row
                    var colNum = col
                    var path = createStitch(x, y, stitchSpacing, rowLayer, rowNum, colNum);
                }
            }
            alert("Image layer '" + layerName + "' and sublayers generated successfully.");
        }
    }
}
