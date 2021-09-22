/*
* MIT License

* Copyright (c) 2019 The Tiny Spark

* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.

* @author The Tiny Spark
*/


import IsoMap from "../../../lib/view/map/IsoMap";
import makeIsometric, { Isometric } from "../../../lib/mixins";
import { Animation, Stage } from "@thetinyspark/moocaccino-barista";


describe(
    "IsoMap test suite",
    () => {

        it(`should sort object according to a top iso view (smaller coordinates children are far, greater is close )`, 
        ()=>{
            // given

            const Iso = makeIsometric(Animation); 
            const container = new IsoMap();
            const max = 3;

            for( let i:number = 0; i < max; i++ ){
                const child = new Iso();
                child.isoNode.cellWidth = 64;
                child.isoNode.cellHeight = 32;
                child.isoNode.row = child.isoNode.col = max - i; 
                child.isoNode.resetCoordinatesFromRowAndCol();

                child.syncWithNode();
                container.addChild(child); 
            }

            // when 
            container.sort();
            container.render(new Stage().getRenderer());
        
            // then
            const children = container.getChildren() as unknown as Isometric[];
            children.map( 
                (current, index)=>{
                    
                    expect( current.isoNode.row ).toEqual(index+1);
                    expect( current.isoNode.col ).toEqual(index+1);
                }
            )
        });
    }
)