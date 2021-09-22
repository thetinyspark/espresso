import Grid3D from "../../../model/space/partitioning/grid/Grid3D";

export default class Inventory<T> extends Grid3D<T> {
  public getNumPlacesLeft(): number {
    let total = this.numCols * this.numRows * this.numLayers;

    this.forEach( 
        (value)=>{
            if (value === null) total--;
        }
    )

    return total;
  }

  public getItemsEqualTo<T>(equalFunc: Function): { row: number; col: number; layer: number; value: T }[] {
    const result = [];
    this.forEach( 
        (value, row, col, layer)=>{
            if (equalFunc(value))
                result.push({row,col,layer,value});
        }
    )
    return result;
  }
}
