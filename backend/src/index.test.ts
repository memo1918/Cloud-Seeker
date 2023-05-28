import {describe, expect, test} from '@jest/globals';
import {sayHello} from "./index";

describe("index-Modul",()=>{

    test('sayHello to state the provided name', () => {
        expect(sayHello(`Kevin`)).toBe(`Hello Kevin`);
    });

    test('sayHello bad case', () => {
        expect(sayHello(`Marvin`)).toBe(`Hello Kevin`);
    })

})    
