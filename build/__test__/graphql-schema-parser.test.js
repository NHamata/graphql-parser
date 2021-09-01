"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var raw_schema_text_1 = require("./fixtures/raw-schema-text");
var expected_schema_object_1 = require("./fixtures/expected-schema-object");
var graphql_schema_parser_1 = require("../parser/graphql-schema-parser");
it('generates a schema object with all the expected properties and values', function () {
    var results = compareSchemaObjects(expected_schema_object_1.expectedSchemaObject, (0, graphql_schema_parser_1.generateSchemaObject)(raw_schema_text_1.rawSchemaText, 'test-schema'));
    expect(results.isEqual).toBe(true);
});
/**
 * Recursive function that ensures that an expected object matches an actual one. checks that at each level all the property names and values are equivalent for each object
 * PRECONDITION: expectedSchemaObject and actualSchemaObject must have 'leaf' (as in bottom of a tree, and not an external empty node) components whose value is a primative
 * BASE CASE: all properties passed in only contain primative values.
 * INDUCTION STEP: if all the child components of the property match, and the current property matches, than the actual and expected match as well
 * POSTCONDITION: returns a boolean if actual and expected object match although this is all that is technically needed more properties were added useful for dubugging info.
 * The added properties useful for debugging is the actual object, expected object, as well as the expected parent and actual parent
 *
 * @param expectedSchemaObject schema object that should be generated
 * @param actualSchemaObject the actual schema object that was generated
 * @returns an object with information if the expectedSchemaObject and actualSchemaObject match as well as meta information useful for debugging.
 * isEqual: boolean value denoting if the properties of the input expectedSchemaObject and actualSchemaObject match
 * expected: is the expected property that was checked
 * actual: is the actual property that was checked
 * expectedParent: is the parent which contained the expected property
 * actualParent: is the parent which contained the actual property
 *
 */
var compareSchemaObjects = function (expectedSchemaObject, actualSchemaObject) {
    var _a = splitStringProperties(expectedSchemaObject), expectedStringProperties = _a.stringProperties, expected = _a.objectProperties;
    var _b = splitStringProperties(actualSchemaObject), actualStringProperties = _b.stringProperties, actual = _b.objectProperties;
    var isEqual = true;
    /* BASE CASE */
    if ((!getKeys(actual) && !getKeys(expected)) || (getKeys(actual).length === 0 && getKeys(expected).length === 0)) {
        if (isKeyValueArrayEqual(expectedStringProperties, actualStringProperties)) {
            return { isEqual: true, reason: "objects match", expected: {}, actual: {}, expectedParent: expectedSchemaObject, actualParent: actualSchemaObject };
        }
        else {
            return { isEqual: false, reason: "string based properties do not match", expected: expectedStringProperties, actual: actualStringProperties, expectedParent: expectedSchemaObject, actualParent: actualSchemaObject };
        }
    }
    /* INDUCTION STEP*/
    if (!isKeyValueArrayEqual(expectedStringProperties, actualStringProperties)) {
        return { isEqual: false, reason: "string based properties do not match", expected: expectedStringProperties, actual: actualStringProperties, expectedParent: expectedSchemaObject, actualParent: actualSchemaObject };
    }
    if (!isPropertyNamesEqual(getKeys(actual), getKeys(expected))) {
        return { isEqual: false, reason: "object based properties keys do not match", expected: getKeys(expected), actual: getKeys(actual), expectedParent: expectedSchemaObject, actualParent: actualSchemaObject };
    }
    for (var property in expected) {
        var result = compareSchemaObjects(expected[property], actual[property]);
        isEqual = isEqual && result.isEqual;
        if (!isEqual) {
            return result;
        }
    }
    return { isEqual: isEqual, reason: "objects match, success", expected: {}, actual: {}, expectedParent: expectedSchemaObject, actualParent: actualSchemaObject };
};
/**
 * gets the keys of an object that has some defined property.
 * @param obj input object
 * @returns array of keys as string of an object that has some defined property.
 */
var getKeys = function (obj) {
    var result = [];
    for (var property in obj) {
        if (obj[property] && Object.keys(obj[property]).length > 0) {
            result.push(property);
        }
    }
    return result;
};
/**
 * checks if the strings contents in each array match
 * @param arr1 an array of strings
 * @param arr2 another array of strings
 * @returns boolean value if arr1 and arr2 match or not
 */
var isPropertyNamesEqual = function (arr1, arr2) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    var result = false;
    try {
        for (var arr1_1 = __values(arr1), arr1_1_1 = arr1_1.next(); !arr1_1_1.done; arr1_1_1 = arr1_1.next()) {
            var arr1Element = arr1_1_1.value;
            if (arr1Element === 'constructor') {
                continue;
            }
            try {
                for (var arr2_1 = (e_2 = void 0, __values(arr2)), arr2_1_1 = arr2_1.next(); !arr2_1_1.done; arr2_1_1 = arr2_1.next()) {
                    var arr2Element = arr2_1_1.value;
                    if (arr2Element === 'constructor') {
                        continue;
                    }
                    if (arr1Element === arr2Element) {
                        result = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (arr2_1_1 && !arr2_1_1.done && (_b = arr2_1.return)) _b.call(arr2_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (!result) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr1_1_1 && !arr1_1_1.done && (_a = arr1_1.return)) _a.call(arr1_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var arr2_2 = __values(arr2), arr2_2_1 = arr2_2.next(); !arr2_2_1.done; arr2_2_1 = arr2_2.next()) {
            var arr2Element = arr2_2_1.value;
            if (arr2Element === 'constructor') {
                continue;
            }
            try {
                for (var arr1_2 = (e_4 = void 0, __values(arr1)), arr1_2_1 = arr1_2.next(); !arr1_2_1.done; arr1_2_1 = arr1_2.next()) {
                    var arr1Element = arr1_2_1.value;
                    if (arr1Element === 'constructor') {
                        continue;
                    }
                    if (arr2Element === arr1Element) {
                        result = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (arr1_2_1 && !arr1_2_1.done && (_d = arr1_2.return)) _d.call(arr1_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (!result) {
                return false;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (arr2_2_1 && !arr2_2_1.done && (_c = arr2_2.return)) _c.call(arr2_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    return true;
};
/**
 * gets an object and splits it in to two objects, one that contains all properties that are strings, and one that contians all properties that are objects
 * @param object any object
 * @returns two objects, one that contains all properties that are strings the stringProperties, and one that contians all properties that are objects the objectProperties
 */
var splitStringProperties = function (object) {
    var stringProperties = [];
    var objectProperties = {};
    for (var property in object) {
        if (property === 'constructor' || !object[property]) {
            continue;
        }
        if (typeof object[property] === 'string') {
            if (object[property] && object[property].length > 0) {
                stringProperties.push({ key: property, value: object[property] });
            }
        }
        else {
            //@ts-ignore
            if (object[property]) {
                objectProperties[property] = object[property];
            }
        }
    }
    return {
        stringProperties: stringProperties,
        objectProperties: objectProperties
    };
};
/**
 * checks if the strings contents in each array match
 * @param arr1 an array of key value pairs, representing leaf nodes of object properties which hold a primitive
 * @param arr2 another array of key value pairs, representing leaf nodes of object properties which hold a primitive
 * @returns boolean the key name and value of both arr1 and arr2 match
 */
var isKeyValueArrayEqual = function (arr1, arr2) {
    var e_5, _a, e_6, _b, e_7, _c, e_8, _d;
    var result = false;
    try {
        // are all the elements in arr1 inside of arr2?
        for (var arr1_3 = __values(arr1), arr1_3_1 = arr1_3.next(); !arr1_3_1.done; arr1_3_1 = arr1_3.next()) {
            var arr1Element = arr1_3_1.value;
            if (arr1Element.key === 'constructor') {
                continue;
            }
            try {
                for (var arr2_3 = (e_6 = void 0, __values(arr2)), arr2_3_1 = arr2_3.next(); !arr2_3_1.done; arr2_3_1 = arr2_3.next()) {
                    var arr2Element = arr2_3_1.value;
                    if (arr2Element.key === 'constructor') {
                        continue;
                    }
                    if (arr1Element.key === arr2Element.key && arr1Element.value === arr2Element.value) {
                        result = true;
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (arr2_3_1 && !arr2_3_1.done && (_b = arr2_3.return)) _b.call(arr2_3);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (!result) {
                return false;
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (arr1_3_1 && !arr1_3_1.done && (_a = arr1_3.return)) _a.call(arr1_3);
        }
        finally { if (e_5) throw e_5.error; }
    }
    try {
        // are all the elements in arr2 inside of arr1?
        for (var arr2_4 = __values(arr2), arr2_4_1 = arr2_4.next(); !arr2_4_1.done; arr2_4_1 = arr2_4.next()) {
            var arr2Element = arr2_4_1.value;
            if (arr2Element.key === 'constructor') {
                continue;
            }
            try {
                for (var arr1_4 = (e_8 = void 0, __values(arr1)), arr1_4_1 = arr1_4.next(); !arr1_4_1.done; arr1_4_1 = arr1_4.next()) {
                    var arr1Element = arr1_4_1.value;
                    if (arr1Element.key === 'constructor') {
                        continue;
                    }
                    if (arr1Element.key === arr2Element.key && arr1Element.value === arr2Element.value) {
                        result = true;
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (arr1_4_1 && !arr1_4_1.done && (_d = arr1_4.return)) _d.call(arr1_4);
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (!result) {
                return false;
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (arr2_4_1 && !arr2_4_1.done && (_c = arr2_4.return)) _c.call(arr2_4);
        }
        finally { if (e_7) throw e_7.error; }
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    return true;
};
