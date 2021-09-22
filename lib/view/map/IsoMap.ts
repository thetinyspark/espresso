import { DisplayObjectContainer, IRenderer } from "@thetinyspark/moocaccino-barista";
import { Isometric } from "../../mixins";
import { isoSort } from "../../utils/iso.utils";

export default class IsoMap extends DisplayObjectContainer{

    public sortAuto:boolean = false;

    public sort():void{
        const children = this.getChildren() as unknown as Isometric[];
        children.sort( isoSort );
    }

    public render(renderer:IRenderer):void{
        if( this.sortAuto ){
            this.sort();
        }

        super.render(renderer);
    }
}