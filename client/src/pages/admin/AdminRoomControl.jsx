import React from "react";
import { Header } from "../../components/admin";

const AdminRoomControl = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Controle de la salle" />
      <div className="w-full flex justify-center">
        <iframe
          src="http://127.0.0.1:5000"
          width="900"
          height="700"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminRoomControl;
