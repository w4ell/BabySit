import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Header } from "../../components/admin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../static/data";
const AdminAddBaby = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [babyname, setBabyname] = React.useState("");
  const [birth_date, setBirth_date] = React.useState("");
  const [parent_name, setParent_name] = React.useState("");
  const [parent_id, setParent_id] = React.useState("");
  const [parent_phone, setParent_phone] = React.useState("");
  const [room, setRoom] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baby = {
      babyname,
      birth_date,
      parent_name,
      parent_id,
      parent_phone,
      room,
    };
    try {
      await axios
        .post(`${server}/admin/addbaby`, baby, { withCredentials: true })
        .then((res) => {
          navigate("/admin-babies");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Liste bébés" />
      <form
        className="flex flex-col gap-2 justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-3 w-full justify-center">
          <label
            style={{ color: currentColor }}
            className="text-lg font-semibold"
          >
            Nom du nouveau bebe
          </label>
          <input
            className=" max-w-[200px] w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            type="text"
            placeholder="saisir.."
            value={babyname}
            required
            onChange={(e) => setBabyname(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3  w-full justify-center">
          <label
            style={{ color: currentColor }}
            className="text-lg font-semibold"
          >
            Date de naissance
          </label>
          <input
            className=" max-w-[200px] w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            type="date"
            value={birth_date}
            required
            onChange={(e) => setBirth_date(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3  w-full justify-center">
          <label
            style={{ color: currentColor }}
            className="text-lg font-semibold"
          >
            Nom du parent
          </label>
          <input
            className=" max-w-[200px] w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            type="text"
            placeholder="saisir.."
            value={parent_name}
            required
            onChange={(e) => setParent_name(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3  w-full justify-center">
          <label
            style={{ color: currentColor }}
            className="text-lg font-semibold"
          >
            N° de carte d'identité
          </label>
          <input
            className=" max-w-[200px] w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            type="text"
            placeholder="saisir.."
            value={parent_id}
            required
            onChange={(e) => setParent_id(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3  w-full justify-center">
          <label
            style={{ color: currentColor }}
            className="text-lg font-semibold"
          >
            N° de telephone
          </label>
          <input
            className=" max-w-[200px] w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            type="text"
            placeholder="saisir.."
            value={parent_phone}
            required
            onChange={(e) => setParent_phone(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3  w-full justify-center">
          <label
            style={{ color: currentColor }}
            className="text-lg font-semibold"
          >
            N° de Salle
          </label>
          <input
            className=" max-w-[200px] w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            type="text"
            placeholder="saisir.."
            value={room}
            required
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button
          style={{ backgroundColor: currentColor }}
          className="px-40 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AdminAddBaby;
