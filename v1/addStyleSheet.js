function AddStyleSheet(path, name, instanceName) {
    this.instanceName = instanceName ? instanceName : 'editorContent';
    this.CKeditorDOM = CKEDITOR.instances[this.instanceName] ? CKEDITOR.instances[this.instanceName].document : null;
    this.path = path;
    this.name = name;
};


AddStyleSheet.prototype = {
    constructor: AddStyleSheet,
    add: function () {
        if (this.CKeditorDOM) {
            var _CKeditorHead = this.CKeditorDOM.find("head").$[0];

            if (typeof this.name === "string") {
                this.addString(_CKeditorHead);
            } else if (this.name instanceof Array) {
                for (var i = 0; i < this.name.length; i++) {
                    var _path = CKEDITOR.plugins.getPath(this.path) + this.name[i] + '.css';
                    this.addString(_CKeditorHead, _path)
                }
            }
        }
    },
    remove: function () {
        if (this.CKeditorDOM) {
            var _CKeditorHead = this.CKeditorDOM.find("head").$[0];

            if (typeof this.name === "string") {
                this.deleteString(_CKeditorHead);
            } else if (this.name instanceof Array) {
                for (var i = 0; i < this.name.length; i++) {
                    var _path = CKEDITOR.plugins.getPath(this.path) + this.name[i] + '.css';
                    this.deleteString(_CKeditorHead, _path);
                }
            }
        }
    },
    addString: function (CKeditorHead, path) {
        var _path = (this.name instanceof Array ? path : CKEDITOR.plugins.getPath(this.path) + this.name + '.css'),
            _stringStyleSheet = "<link rel='stylesheet' type='text/css' href='" + _path + "'>";

        var _parser = new DOMParser(),
            _parserElement = _parser.parseFromString(_stringStyleSheet, "text/html"),
            _elementStyleSheet = _parserElement.childNodes[0].querySelector("head").childNodes[0],
            _exists = CKeditorHead.querySelector('link[href*="' + _path + '"]');

        if (!_exists) {
            CKeditorHead.appendChild(_elementStyleSheet);
        }

    },
    deleteString: function (CKeditorHead, path) {
        var _path = (this.name instanceof Array ? path : CKEDITOR.plugins.getPath(this.path) + this.name + '.css'),
            _exists = CKeditorHead.querySelector('link[href*="' + _path + '"]');

        if (_exists) {
            CKeditorHead.removeChild(_exists);
        }
    }
};

