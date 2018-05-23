'use strict';

var Whispers = function (text) {
    if (text) {
        var o = JSON.parse(text);
        this.school = o.school;
        this.major = o.major;
        this.name = o.name;
        this.content = o.content;
    }
};

Whispers.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var GraduationWhisper = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new Whispers(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

// save value to contract, only after height of block, users can takeout
GraduationWhisper.prototype = {
    init: function () {
        //TODO:
    },

    save: function (school, major, name, content) {
        if (!school || !major || !name || !content) {
            throw new Error("parmas is wrong")
        }

        // var from = Blockchain.transaction.from

        var key = school + major + name
        var whisper = this.data.get(key)
        if (whisper) {
            throw new Error("this whisper has been occupied")
        }

        whisper = new Whispers()
        whisper.school = school
        whisper.major = major
        whisper.name = name
        whisper.content = content

        this.data.put(key, whisper)
        var result = this.data.get(key)
        return result
    },

    get: function (school, major, name) {
        if (!school || !major || !name) {
            throw new Error("parmas is wrong")
        }
        var key = school + major + name
        return this.data.get(key)
    }
};
module.exports = GraduationWhisper;
