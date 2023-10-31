import React, { useEffect, useState } from "react";
import "./style.css";

// get the localStorage data back
const getlocalstorageData = () => {
    const lists = localStorage.getItem("Todo-Lists");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }

}


const Todo = () => {

    // Add States
    const [inputData, setinputData] = useState("");
    const [items, setItems] = useState(getlocalstorageData());

    const [editItem, seteditItem] = useState("");
    const [toggleBtn, settoggleBtn] = useState(false);

    // const [isEditing, setisEditing] = useState(false);
    // const [currentItem, setcurrentItem] = useState({});

    // add the items fucnction
    const addItems = () => {
        if (!inputData) {
            alert("PLease Write Something");
        } else if (inputData && toggleBtn) {
            setItems(
              items.map((curElem) => {
                if (curElem.id === editItem) {
                  return { ...curElem, name: inputData };
                }
                return curElem;
              })
            );
      
            setinputData("");
            seteditItem(null);
            settoggleBtn(false);
          }
        else {
            const newinputdata = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newinputdata]);
            setinputData("");
        }
    }

    //edit the items

    const editItems = (index) => {
        const updateItems = items.find((currElement) => {
            return currElement.id === index;
        })
        setinputData(updateItems.name)
        seteditItem(index);
        settoggleBtn(true);
    }





    // const handleEditClick = (editItems) => {
    //     setisEditing(true);
    //     setcurrentItem({...editItems});
    //     console.log(currentItem);

    // }

    // how to delete items section
    const deleteItem = (id) => {
        // console.log(id);

        // Two Ways to Delete Row
        // That's 1
        const delItems = items.filter((_, index) => { return index !== id })
        setItems(delItems);

        // That's 2

        // const deleteItem = [...items];
        // deleteItem.splice(index,1);
        // setItems(deleteItem);
    }

    // remove all the elements
    const removeAll = () => {
        setItems([]);
    }

    // adding localStorage

    useEffect(() => {
        localStorage.setItem("Todo-Lists", JSON.stringify(items));
    }, [items]);




    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./todo-lists.jpg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(event) => setinputData(event.target.value)}
                        />
                        {
                            toggleBtn ? (
                                <i className="far fa-edit add-btn" onClick={addItems} ></i>) :
                                (
                                    <i className="fa fa-plus add-btn" onClick={addItems} ></i>
                                )


                        }
                    </div>


                    {/* show our items  */}
                    <div className="showItems">
                        {items.map((currElement, index) => {
                            return (
                                <div className="eachItem" key={index}>
                                    <h3>{currElement.name}</h3>
                                    <div className="todo-btn">
                                        <i
                                            className="far fa-edit add-btn"
                                            onClick={() => editItems(currElement.id)}></i>
                                        <i
                                            className="far fa-trash-alt add-btn" onClick={() => {
                                                deleteItem(index);
                                            }}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    {/* rmeove all button  */}
                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={removeAll} >
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;