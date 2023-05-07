import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { PositionFuncProp } from "./Home";


type FilterInputProps = {
  positionsFunction: PositionFuncProp[]
  filterPositions: (position: String) => void
}


function FilterInput({ positionsFunction, filterPositions }: FilterInputProps) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedSuboptions, setSelectedSuboptions] = useState({});

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCheckedItems((prev) => [...prev, value]);
      setSelectedSuboptions((prev) => ({ ...prev, [value]: [] }));
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== value));
      setSelectedSuboptions((prev) => {
        const { [value]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSuboptionChange = (parentTitle, e) => {
    filterPositions(e.target.value)
    const childName = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSuboptions((prev) => ({
      ...prev,
      [parentTitle]: isChecked
        ? [...prev[parentTitle], childName]
        : prev[parentTitle].filter((name) => name !== childName),
    }));
  };

  return (
    <Dropdown className="d-flex justify-content-start w-100">
      <button onClick={() => console.log(checkedItems)}>checkedItems</button>
      <button onClick={() => console.log(setSelectedSuboptions)}>setSelectedSuboptions</button>
      <Dropdown.Toggle id="dropdown-basic" className="bg-white border border-white text-dark w-50 d-flex justify-content-start align-items-center fs-5">
        Filter by position
      </Dropdown.Toggle>

      <Dropdown.Menu className="border shadow-lg p-2 fs-5">
        {positionsFunction.map((item) => {
          const isExpanded = checkedItems.includes(item.title);

          return (
            <div key={item.title}>
              <Form.Check
                inline
                type="checkbox"
                id={item.title}
                label={item.title}
                value={item.title}
                style={{ backgroundColor: 'dark', borderColor: 'dark' }}
                checked={checkedItems.includes(item.title)}
                onChange={handleCheckboxChange}
              />

              {isExpanded &&
                item.children.map((children) => {
                  const isSelected = selectedSuboptions[item.title]?.includes(
                    children.name
                  );

                  return (
                    <Form.Check
                      key={children.name}
                      type="checkbox"
                      id={children.name}
                      label={children.name}
                      value={children.name}
                      checked={isSelected}
                      className="ms-4"
                      style={{ backgroundColor: 'dark', borderColor: 'dark' }}
                      onChange={(e) =>
                        handleSuboptionChange(item.title, e)
                      }
                    />
                  );
                })}
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterInput;