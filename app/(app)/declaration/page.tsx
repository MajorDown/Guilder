'use client'
import InterventionForm from '@/components/InterventionForm';
import PageForMember from '@/components/PageForMember';

const Declaration = () => {    
    return (<PageForMember 
        title={'Déclarez une nouvelle intervention'} 
        pseudoTitle={'Déclarer'} 
        id={'section_declaration'}
    >
        <InterventionForm />
    </PageForMember>)
}

export default Declaration;