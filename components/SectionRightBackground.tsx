import { useEffect, useState } from "react";
import { useAdminContext } from "@/contexts/adminContext";
import { useMemberContext } from "@/contexts/memberContext";

const SectionRightBackground = () => {
    const { admin } = useAdminContext();
    const { member } = useMemberContext();
    const [userIsConnected, setUserIsConnected] = useState<boolean>();
    const [userIsChecked, setUserIsChecked] = useState<boolean>(false);

    useEffect(() => {
        if (admin || member) setUserIsConnected(true);
        else setUserIsConnected(false);
        setUserIsChecked(true);
    }, [admin, member]);
    
    if (userIsChecked && userIsConnected) return (
        <div id={"section_right_background"}></div>
    )
}

export default SectionRightBackground;