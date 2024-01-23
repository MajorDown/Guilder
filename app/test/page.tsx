'use client'
import TestForm from "@/components/TestForm";
import UINavLink from "@/components/UI/UINavLink";

const TestPage = () => {
  return (
    <section>
        <TestForm />
        <UINavLink href={"/"} label={"retour à l'accueil"} icon={"/images/user.svg"}/>
    </section>
  )
}

export default TestPage;