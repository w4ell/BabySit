import React, { useEffect, useState } from "react";
import { Header } from "../../components/admin";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { server } from "../../static/data";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
const AdminBabyDetails = () => {
  const { currentColor } = useStateContext();
  const { id } = useParams();
  const [baby, setBaby] = useState({});
  useEffect(() => {
    const fetchBaby = async () => {
      try {
        const response = await axios.get(`${server}/admin/getbaby/${id}`, {
          withCredentials: true,
        });
        setBaby(response.data.baby);
      } catch (error) {
        console.error("Error fetching baby:", error);
      }
    };
    fetchBaby();
  }, []);
  return (
    <div className="mt-24">
      <div className="flex flex-col md:flex-row gap-10 m-10  justify-center">
        <div className="bg-white dark:text-gray-200 p-6 rounded-2xl w-full md:w-2/3">
          <Header category="" title="Détails du bebe" />
          <div>{/* ici statisque*/}</div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full md:w-1/3">
          <div className="flex gap-5 justify-center items-center mt-6 border-color border-b-1 pb-6">
            <span className="text-black text-lg"> Photo du bebe </span>
            <CgProfile size={100} color={currentColor} />
          </div>
          <p className="font-semibold text-xl dark:text-gray-200 mt-5">
            Informations sur le bebe
          </p>
          <div>
            <div className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Nom et Prénom:
              <span className="text-black text-lg">{baby?.babyname}</span>
            </div>
            <div className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Date de naissance:
              <span className="text-black text-lg">
                {baby?.birth_date?.substring(0, 10)}
              </span>
            </div>
            <div className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              Salle: <span className="text-black text-lg">{baby?.room}</span>
            </div>
          </div>
          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <div>
              <p className="font-semibold text-xl dark:text-gray-200">
                Informations sur le parent
              </p>
              <div className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                Nom et Prénom du parent:
                <span className="text-black text-lg">{baby?.parent_name}</span>
              </div>
              <div className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                N° Telephone du parent:
                <span className="text-black text-lg">{baby?.parent_phone}</span>
              </div>
              <div className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                N° CIN du parent:{" "}
                <span className="text-black text-lg">{baby?.parent_id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBabyDetails;
