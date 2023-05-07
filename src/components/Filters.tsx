import DisplayFilter from "./DisplayFilter"
import FilterInput from "./FilterInput"
import { PositionFuncProp } from "./Home"


type FiltersProps = {
    displayAmount : (amount: String) => void
    positionsFunction: PositionFuncProp[]
    filterPositions: (position: String) => void
}

function Filters({ displayAmount, positionsFunction, filterPositions }: FiltersProps){
    return (
        <div className="d-flex justify-content-between w-100">
            <FilterInput positionsFunction={positionsFunction} filterPositions={filterPositions}/>
            <DisplayFilter displayAmount={displayAmount}/>
        </div>
    )
}


export default Filters