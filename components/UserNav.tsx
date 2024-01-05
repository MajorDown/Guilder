import AppLink from "@/components/AppLink";
import { ConnectedUser } from "@/types";

type UserNavProps = {
  user: ConnectedUser
  onDisconnect: () => void;
}

const UserNav = (props: UserNavProps) => {
  return (
    <div id="userNav">
      <div id="userOptions">
          <p>{props.user.mail}</p>
          <p>|</p>
          <p>{props.user.counter} points</p>
          <p>|</p>
          <AppLink onClick={() => props.onDisconnect()} href="/" showActivation>Déconnexion</AppLink>
      </div>
      <nav id="userPages">
        <AppLink href="/operation" showActivation={true}>Déclarer une opération</AppLink>
        <p>|</p>          
        <AppLink href="/historique" showActivation={true}>Historique des opérations</AppLink>
        <p>|</p>
        <AppLink href="/guilde" showActivation={true}>Membres de la guilde</AppLink>
      </nav>
    </div>
  )
}

export default UserNav;