import type React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { Bookmark } from "lucide-react";

export const Status:React.FC=()=>{
    return(
        <>
        <section className="bg-white p-5 rounded-3xl shadow-sm">
          <SectionTitle icon={Bookmark} title="Estatus" />
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-full text-sm font-bold">Inventario</button>
            <button className="flex-1 border border-gray-200 py-3 rounded-full text-sm font-medium text-gray-600">En Espera</button>
            <button className="flex-1 border border-gray-200 py-3 rounded-full text-sm font-medium text-gray-600">Reparación</button>
          </div>
        </section>
        </>
    );
}