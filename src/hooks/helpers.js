export default {
    removeItemsStorage(...args) {
        for (let i = 0; i < args.length; i += 1) {
            window.localStorage.removeItem(args[i]);
        }
    },
    parseJson(string) {
        try {
            return JSON.parse(string);
        } catch (e) {
            return {};
        }
    },
    isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    objectType(obj) {
        return Object.prototype.toString.call(obj)
            .replace(/[[\]]|object/g, '')
            .trim();
    },
    b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str)
            .replace(/%([0-9A-F]{2})/g,
                (match, p1) => String.fromCharCode(`0x${p1}`)));
    },
    b64DecodeUnicode(str) {
        return decodeURIComponent(atob((str || '').toString())
            .split('')
            .map((c) => `%${(`00${c.charCodeAt(0)
                .toString(16)}`).slice(-2)}`)
            .join(''));
    },
    titleCase(str) {
        return str.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
    },
    addDataForm(formData = new FormData(), data = {}) {
        Object.keys(data)
            .forEach((keyVal) => {
                if (data[keyVal] == null || typeof data[keyVal] === 'undefined') {
                    // eslint-disable-next-line no-param-reassign
                    data[keyVal] = '';
                }
                if (this.isArray(data[keyVal])) {
                    data[keyVal].map((f, subKeyVal) => {
                        if (this.isArray(f)) {
                            f.map((v, superSubKeyVal) => {
                                if (v != null && typeof v !== 'undefined' && v !== '') {
                                    formData.append(`${keyVal}[${subKeyVal}][${superSubKeyVal}]`, v);
                                }
                                return v;
                            });
                        } else {
                            formData.append(`${keyVal}[${subKeyVal}]`, f);
                        }
                        return f;
                    });
                } else if (typeof data[keyVal] !== 'function') {
                    formData.append(keyVal, data[keyVal]);
                }
            });
    },
};
