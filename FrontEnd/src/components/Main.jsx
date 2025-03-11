import React from "react";
import "./style/main.css";
const Main = () => {

  const CreateTaskHandleSubmit =async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProducts);
      setNewproducts({title:'',description:'',deadLine:'',image:''})
    } catch (error) {
      console.log("the error is occer on the produte"+error)
    }
  }


  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();

      render.onloadend = () => {
        setNewproducts({ ...newProducts, image:render.result});
      };
      render.readAsDataURL(file);
    }
  };
  return (
    <div className="main">
      <div className="displayDetail"></div>
      <div className="box1">
        <div className="createTask">
          <h1>Create Task</h1>
          <div className="create-Task-form">
            <form onSubmit={CreateTaskHandleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value=""
                  onChange={(e) =>
                    setNewproducts({ ...newProducts, name: e.target.value })
                  }
                  required
                  placeholder="Create Task"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value=""
                  onChange={(e) =>
                    setNewproducts({
                      ...newProducts,
                      description: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter product description"
                />
              </div>

              <div className="form-group">
                <label>deadLine</label>
                <input
                  type="date"
                  value=''
                  onChange={(e) =>
                    setNewproducts({ ...newProducts, price: e.target.value })
                  }
                  required
                  placeholder="Enter the last date"
                />
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" onChange={imageHandler} accept="image/*" />
              </div>

              <button type="submit" className="submit-button">
              Create Task
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className="box2"></div>
    </div>
  );
};

export default Main;
