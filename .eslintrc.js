module.exports = {
    "env": {
        "browser": true,
				"node": true,
				"jquery": true
    },
    "extends": "eslint:recommended",
    "rules": {
				"no-console": "off",

        "indent": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
