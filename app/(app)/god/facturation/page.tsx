'use client'
import {useState, useEffect} from 'react';
import { Facture } from '@/types';
import PageForGod from '@/components/god/PageForGod';
import getAllFactures from '@/tools/front/getAllFactures';
import FactureManager from '@/components/god/FactureManager';

const GodFacturationPage = () => {
    const [guildsFacturations, setGuildsFacturations] = useState<Facture[]>([]);
    const [FacturationsErr, setFacturationsErr] = useState<string>("");

    useEffect(() => {
        getAllFactures()
            .then((data) => setGuildsFacturations(data))
            .catch((err) => setFacturationsErr("erreur lors du chargement des factures"));
    }, []);

    return (
        <PageForGod title={"Facturation"} id={"sectionFacturation"}>
            <>
                <FactureManager Factures={guildsFacturations} />
                {FacturationsErr && <p>{FacturationsErr}</p>}
            </>
        </PageForGod>
    )  
}

export default GodFacturationPage;