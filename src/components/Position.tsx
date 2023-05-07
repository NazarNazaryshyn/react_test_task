import { ItemProp } from "./Home"

export type PositionProp = {
    item: ItemProp
}


function Position({ item }: PositionProp){
    return (
        <div className="d-flex flex-row align-items-center mt-3 border border-light rounded shadow px-3">
            <div>
                <img src={item.image_url}  className="border rounded-circle" width={50} height={50}/>
            </div>
            <div className="ms-3 my-3">
                <div>
                    <p className="text-dark fs-3">{item.title}</p>
                </div>
                <div className="d-flex text-secondary align-items-center">
                    <p className="m-0 me-2">{item.company}</p>
                    <img className="bg-secondary border border-secondary rounded-circle me-2" height={10} width={10}/>
                    <p className="m-0 me-2">{item.position_function}</p>
                    <img className="bg-secondary border border-secondary rounded-circle me-2" height={10} width={10}/>
                    <p className="m-0">{item.due_date}</p>
                </div>
            </div>
        </div>
    )
}


export default Position