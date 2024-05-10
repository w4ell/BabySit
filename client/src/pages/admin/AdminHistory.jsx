import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Header } from "../../components/admin";
import { useStateContext } from "../../context/ContextProvider";
import { GrView } from "react-icons/gr";
import { server } from "../../static/data";
import axios from "axios";
import Modal from "react-modal";

const AdminHistory = () => {
  const { currentColor } = useStateContext();
  const [histories, setHistories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const fetchHistories = async () => {
    try {
      const response = await axios.get(`${server}/admin/gethistories`, {
        withCredentials: true,
      });
      setHistories(response.data.histories);
      setRecords(response.data.histories);
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  };
  useEffect(() => {
    fetchHistories();
  }, []);

  const columns = [
    {
      name: "Nom",
      selector: (row) => row.babyname,
      sortable: true,
    },
    {
      name: "Date de suppression",
      selector: (row) => row.deleteDate.substring(0, 10),
      sortable: true,
    },
    {
      name: "Raison de suppression",
      cell: (row) => (
        <button
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-30 hover:drop-shadow-xl"
          onClick={() => openModal(row.reason)}
        >
          <GrView size={20} />
        </button>
      ),
    },
  ];
  const data = histories;
  const [records, setRecords] = React.useState(data);
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.babyname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const openModal = (selectedReason) => {
    setSelectedReason(selectedReason);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReason("");
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Historique" />
      <div>
        <input
          className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          type="text"
          placeholder="chercher par nom..."
          onChange={handleFilter}
        />
      </div>
      <DataTable columns={columns} data={records} pagination />
      {/* React Modal */}
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={closeModal}
            className="bg-red-600 text-white px-2 rounded-md"
          >
            X
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mt-20">
            La raison de la suppression
          </h2>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4 mt-10"
            rows="3"
            value={selectedReason}
            readOnly
          ></textarea>
        </div>
      </Modal>
    </div>
  );
};

export default AdminHistory;
