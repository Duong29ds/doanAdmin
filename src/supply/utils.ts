import { DataSupplier } from "./supplier.slice";

export const handleGetIDList=(data:Array<DataSupplier>, selection:Array<number>)=>{
    return data.filter((item,index)=>{
       return selection.includes(index)
    }).map(item=>item.id)
}