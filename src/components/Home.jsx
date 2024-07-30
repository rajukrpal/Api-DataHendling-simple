

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  deleteApiCallFunction,
  EditApiCallFunction,
  getApiCallFunction,
} from "../Data";

const Home = () => {
  const [resiveApiData, setResiveApiData] = useState([]);
  const [resiveApiDataFilter, setResiveApiDataFilter] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  // All data Get
  useEffect(() => {
    const fetchData = async () => {
      const AllData = await getApiCallFunction();
      setResiveApiData(AllData);
      setResiveApiDataFilter(AllData);
    };
    fetchData();
  }, []);

  // filter Search data
  useEffect(() => {
    const searchResult = resiveApiData.filter((user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase())
    );
    setResiveApiDataFilter(searchResult);
  }, [searchUser, resiveApiData]);


  // delete 
  const handleDelete = async (itemId) => {
    try {
      await deleteApiCallFunction(itemId.id);
      const response = resiveApiDataFilter.filter(
        (item) => item.id !== itemId.id
      );
      setResiveApiData(response);
      setResiveApiDataFilter(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  // edit
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setName(item.name);
    setUserName(item.username);
  };


  // submit form
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      username: userName,
      // Include other fields if needed
    };

    const result = await EditApiCallFunction(editingItemId, updatedData);

    if (result.success) {
      const updatedItems = resiveApiData.map((item) =>
        item.id === editingItemId ? result.data : item
      );
      setResiveApiData(updatedItems);
      setResiveApiDataFilter(updatedItems);
      setName("");
      setUserName("");
      setEditingItemId(null);
    } else {
      console.error("Update failed:", result.error);
    }
  };

  return (
    <div>
      <div>
        <input
          className="p-3 bg-slate-200"
          placeholder="Search..."
          type="search"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      <div>
        Home
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resiveApiDataFilter.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.website}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        className="text-green-400"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-400"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Home;
