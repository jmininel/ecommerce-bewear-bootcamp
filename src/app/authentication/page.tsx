import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import SignInForm from "./components/sign-in-form"
import SignUpForm from "./components/sign-up-form"
import { Header } from "@/components/common/header"

const Authentication = async () => {
  return (
  <>
     <Header/>

      <main className="flex min-h-[calc(100svh-4rem)] w-full items-center justify-center px-4 py-8">
        <section className="w-full max-w-sm">
          <Tabs className="w-full" defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in" className="w-full">
              <SignInForm />
            </TabsContent>

            <TabsContent value="sign-up" className="w-full">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </section>
      </main>
  </>
  )
}

export default Authentication;