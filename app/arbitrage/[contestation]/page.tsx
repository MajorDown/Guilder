'use client'
import { useState, useEffect } from 'react';
import { useAdminContext} from "@/contexts/adminContext";

const Modification = () => {
    const {admin} = useAdminContext();

    return (
        <section>
            <h2>Modification de l'intervention</h2>
            <p>Statuez ici sur les contestations faites par les membres de la guilde</p>
        </section>
  )
}

export default Modification;