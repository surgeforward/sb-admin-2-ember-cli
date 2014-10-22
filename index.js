/**
 * Created by eibrahim on 10/21/2014
 */
'use strict';

var path = require('path');
var fs = require('fs');
var vendorPath='vendor';
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');


function EmberCLISbAdmin2(project) {
  this.project = project;
  this.name = 'Ember CLI SB Admin 2';
}

/**
 * @param filename
 * @returns {boolean}
 */
function isFile(filename) {
  return path.extname(filename).length > 0;
}

/**
 * @param path
 * @returns {string|*}
 */
function concatPath(filePath){
  return path.join(vendorPath,filePath);
}


function unwatchedTree(dir) {
  return {
    read: function () {
      return dir;
    },
    cleanup: function () {
    }
  };
}

EmberCLISbAdmin2.prototype.treeFor = function treeFor(name) {
  var treePath = path.join('node_modules', 'sb-admin-2-cli', name);
  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

/**
 * Ember Cli Hook For Vendor
 * @param type
 * @param workingTree
 */
EmberCLISbAdmin2.prototype.postprocessTree = function postprocessTree(type, workingTree) {
  var assetsPath = path.join(__dirname, 'vendor', 'font-awesome', 'fonts');
  //hard code to destDir to assets/assets.
  return mergeTrees([
      workingTree,
      pickFiles(assetsPath, {
        srcDir: '/',
        files: ['**/*.*'],
        destDir: '/fonts'
      })
    ]
  );
};


EmberCLISbAdmin2.prototype.included = function included(app) {
  var emberCLIVersion = app.project.emberCLIVersion();
  if (emberCLIVersion < '0.0.41') {
    throw new Error('sb-admin-2-cli requires ember-cli version 0.0.41 or greater.\n');
  }

  //import css files
  app.import(concatPath('bootstrap/dist/css/bootstrap.min.css'));
  app.import(concatPath('font-awesome/css/font-awesome.css'));
  app.import(concatPath('sb-admin-v2/css/plugins/social-buttons/social-buttons.css'));
  app.import(concatPath('sb-admin-v2/css/plugins/timeline/timeline.css'));
  app.import(concatPath('sb-admin-v2/css/plugins/dataTables/dataTables.bootstrap.css'));
  app.import(concatPath('sb-admin-v2/css/sb-admin.css'));

  //import javascript files
  app.import(concatPath('bootstrap/dist/js/bootstrap.min.js'));
  app.import(concatPath('metisMenu/dist/jquery.metisMenu.js'));
  app.import(concatPath('sb-admin-v2/js/sb-admin.js'));
};

module.exports = EmberCLISbAdmin2;
