/*
 * Copyright 2019 WICKLETS LLC
 *
 * This file is part of Wick Engine.
 *
 * Wick Engine is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Engine is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Engine.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Utility class for creating and parsing wickobject files.
 */
Wick.SVGFile = class {
    /**
     * Create a project from a wick file.
     * @param {Blob | string} svgFile - WickObject file containing object data (can be a Blob or a dataURL string)
     * @param {function} callback - Function called when the object is done being loaded
     */
    static fromSVGFile(svgFile, callback) {
        // Convert to blob if needed
        //if(typeof svgFile === 'string') {
        //    svgFile = Wick.ExportUtils.dataURItoBlob(svgFile);
        //}

        //var fr = new FileReader();
        //load the SVG, converting objexts to paths
        // Convert to blob if needed
        if (typeof svgFile === 'string') {
            svgFile = Wick.ExportUtils.dataURItoBlob(svgFile);
        }

        var fr = new FileReader();

        fr.onload = () => {
            console.error(fr.result);
            callback(fr.result);
        };

        fr.readAsText(svgFile);
        //enumbertae all the paths that have been loaded, exporting as JSON and then that being used to creating a new wicks path for every item... also need to deal with asasets


    }

    /**
     * Create a wick file from the project.
     * @param {Wick.Project} clip - the clip to create a wickobject file from
     * @param {string} format - Can be 'blob' or 'dataurl'.
     */
    static toSVGFile(clip, format, callback) {
        if (!format) format = 'blob';

        var data = clip.export();
        var json = JSON.stringify(data);
        var blob = new Blob([json], { type: "application/json" });

        if (format === 'blob') {
            callback(blob);
        } else if (format === 'dataurl') {
            var fr = new FileReader();
            fr.onload = function(e) {
                callback(e.target.result);
            };
            fr.readAsDataURL(blob);
        } else {
            console.error('toWickObjectFile: invalid format: ' + format);
        }
    }
}