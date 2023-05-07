import Form from 'react-bootstrap/Form';


type DisplayFilterProsp = {
    displayAmount : (amount: String) => void
}


function DisplayFilter({ displayAmount }: DisplayFilterProsp){
    return (
        <div className="w-100 d-flex justify-content-end">   
            <Form.Select aria-label="Default select example" className="w-25 border-0 d-flex fs-5" onChange={(e) => displayAmount(e.target.value)}>
                <option selected value="5">5 per page</option>
                <option value="25">25 per page</option>
                <option value="All">Display all</option>
            </Form.Select>
        </div>
    )
}


export default DisplayFilter