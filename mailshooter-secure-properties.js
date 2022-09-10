#!/bin/node

const fs = require('fs');
const yaml = require('yaml');
const mcrypt = require('mcrypt').MCrypt;
const serpent = new mcrypt('serpent', 'cbc');
const args = require('args-parser')(process.argv);
const {f,k,o} = args;

const encrypt = (data, k) => {
	const iv = serpent.generateIv();
	serpent.open(Buffer.from(k, 'ascii'), iv);
	const encrypted = serpent.encrypt(data.toString());
	return (Buffer.from(encrypted).toString('base64'));
}

const secure_properties_recursive = (object, k) => {
	if (typeof object == "object") {
		const keys = Object.keys(object);
		keys.map((key) => {
			if (typeof object[key] == "object")
				object[key] = secure_properties_recursive(object[key], k);
			if (typeof object[key] == "string")
				object[key] = encrypt(object[key], k);
			if (typeof object[key] == "number")
				object[key] = encrypt(object[key], k);
		})
	}
	return (object);
}

const secure_properties = (f, k, o) => {
	const content = fs.readFileSync(f, 'utf-8');
	const object = yaml.parse(content);
	const encrypted = secure_properties_recursive(object, k);
	const yml = yaml.stringify(encrypted);
	fs.writeFileSync(o, yml);
}

secure_properties(f, k, o);
