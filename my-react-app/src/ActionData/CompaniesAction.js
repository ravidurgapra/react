export const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

export const deleteDataSuccess = (id) => ({
  type: "DELETE_DATA_SUCCESS",
  payload: id,
});

export const deleteDataFailure = (error) => ({
  type: "DELETE_DATA_FAILURE",
  payload: error,
});

export const deleteData = (id) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        dispatch(deleteDataSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteDataFailure(error.message));
      });
  };
};

export const setCurrentPage = (currentPage) => ({
  type: "SET_CURRENT_PAGE",
  payload: currentPage,
});

export const setTotalPages = (totalPages) => ({
  type: "SET_TOTAL_PAGES",
  payload: totalPages,
});

export const fetchDataForPage = (page) => ({
  type: "FETCH_DATA_FOR_PAGE",
  payload: page,
});

export const handleEditData = (id, newData) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "EDIT_ROW_SUCCESS",
          payload: newData,
        });
        dispatch({
          type: "CLEAR_EDITING_ID",
        });
      })
      .catch((error) => console.error("Error editing row:", error));
  };
};
export const handleEditData1 = (id, newData) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "EDIT_ROW",
          payload: newData,
        });
        dispatch({
          type: "CLEAR_EDITING_ID",
        });
      })
      .catch((error) => console.error("Error editing row:", error));
  };
};

export const tableData = (currentPage, selectedValue, searchTerm) => {
  return (dispatch) => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${currentPage}&_limit=${selectedValue}&q=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => dispatch(fetchDataSuccess(data)))
      .catch((error) => console.error("Error fetching data:", error));
  };
};
