import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Header } from "../../components/admin";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { server } from "../../static/data";
import axios from "axios";
import Modal from "react-modal";

const AdminListeBebes = () => {
  const { currentColor } = useStateContext();
  const [babies, setBabies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBabyId, setSelectedBabyId] = useState("");
  const [selectedBabyName, setSelectedBabyName] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const fetchBabies = async () => {
    try {
      const response = await axios.get(`${server}/admin/getbabies`, {
        withCredentials: true,
      });
      setBabies(response.data.babies);
      setRecords(response.data.babies);
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  };
  useEffect(() => {
    fetchBabies();
  }, []);

  const columns = [
    {
      name: "Nom",
      selector: (row) => row.babyname,
      sortable: true,
    },
    {
      name: "Numéro de salle",
      selector: (row) => row.room,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <Link
          type="button"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-30 hover:drop-shadow-xl"
          to={`/admin-babies/baby/${row._id}`}
        >
          <RiUserSearchFill size={20} />
        </Link>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-30 hover:drop-shadow-xl"
          onClick={() => openModal(row._id, row.babyname)}
        >
          <TiUserDelete size={20} />
        </button>
      ),
    },
  ];
  const data = babies;
  const [records, setRecords] = React.useState(data);
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.babyname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const openModal = (babyId, babyName) => {
    setSelectedBabyId(babyId);
    setSelectedBabyName(babyName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteReason("");
    setSelectedBabyId("");
    setSelectedBabyName("");
  };

  const handleReasonChange = (e) => {
    setDeleteReason(e.target.value);
  };

  const deleteBaby = async () => {
    try {
      await axios.delete(`${server}/admin/deletebaby/${selectedBabyId}`, {
        data: { babyname: selectedBabyName, reason: deleteReason },
        withCredentials: true,
      });
      closeModal();
      fetchBabies();
    } catch (error) {
      console.error("Error deleting baby:", error);
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Liste bébés" />
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
            Entrez la raison de la suppression
          </h2>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4 mt-10"
            rows="3"
            value={deleteReason}
            onChange={handleReasonChange}
          ></textarea>
          <p className="mt-10 text-red-500">
            Vous êtes sure de supprimer le bébé {selectedBabyName}?
          </p>
          <button
            onClick={deleteBaby}
            className="mt-5 bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 focus:outline-none disabled:opacity-25"
            disabled={!deleteReason}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminListeBebes;
