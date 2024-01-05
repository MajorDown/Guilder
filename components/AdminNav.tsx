import AppLink from "@/components/AppLink";
import { ConnectedAdmin } from "@/types";

type AdminNavProps = {
  admin: ConnectedAdmin,
  onDisconnect: () => void;
}

const AdminNav = (props: AdminNavProps) => {
  return (
    <div id="adminNav">
      <div id="adminOptions">
          <p>{props.admin.mail}</p>
          <p>|</p>
          <p>administrateur de {props.admin.guild}</p>
          <p>|</p>
          <AppLink onClick={() => props.onDisconnect()} href="/" showActivation>Déconnexion</AppLink>
      </div>
      <nav id="adminPages">
        <AppLink href="/admin" showActivation={true}>Inviter de nouveaux membres</AppLink>
        <p>|</p>          
        <AppLink href="/admin" showActivation={true}>Gérer les opérations</AppLink>
        <p>|</p>
        <AppLink href="/admin" showActivation={true}>Gérer les Membres</AppLink>
      </nav>
    </div>
  )
}

export default AdminNav;