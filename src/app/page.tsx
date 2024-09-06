import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Bell, DollarSign, Search, Check } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('https://thomasmore.qc.ca/wp-content/uploads/2016/10/research-banner.jpg')] bg-no-repeat bg-cover bg-center backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none bg-neutral bg-opacity-60 p-2 text-white  max-w-xl mx-auto">
                  Nunca te pierdas ninguna oferta de libros.
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Book Hunter escanea en línea para encontrar la opción que buscas y obtener las mejores ofertas de libros, y te notifica al instante.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex space-x-2 justify-center">
                  <Button asChild>
                    <Link href="/sign-up">
                    ¡Comenzar ahora!
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-white">
                  Prueba gratis por 7 días. No se requiere tarjeta de crédito.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Características principales</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Search className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Búsqueda inteligente</h3>
                  <p className="text-gray-600 text-center">
                    Nuestro algoritmo busca en cientos de tiendas para encontrar las mejores ofertas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Bell className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Alertas personalizadas</h3>
                  <p className="text-gray-600 text-center">
                    Recibe notificaciones instantáneas cuando los libros que te interesan estén en oferta.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <DollarSign className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Ahorro garantizado</h3>
                  <p className="text-gray-600 text-center">
                    Ahorra hasta un 70% en tus compras de libros con nuestras ofertas exclusivas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Lo que dicen nuestros usuarios</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    &quot;Gracias a Book Hunter, he ahorrado cientos de euros en mis compras de libros. ¡Es una herramienta imprescindible para cualquier lector!&quot;
                  </p>
                  <p className="font-semibold">María G., ávida lectora</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    &quot;Como estudiante, Book Hunter me ha ayudado a encontrar los mejores precios para mis libros de texto. ¡Altamente recomendado!&quot;
                  </p>
                  <p className="font-semibold">Carlos R., estudiante universitario</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Planes y precios</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col">
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4">Plan Básico</h3>
                    <p className="text-3xl font-bold mb-6">4.99€/mes</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Hasta 5 alertas de libros
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Notificaciones por email
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Actualizaciones diarias
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-auto">Elegir plan</Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4">Plan Premium</h3>
                    <p className="text-3xl font-bold mb-6">9.99€/mes</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Alertas ilimitadas
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Notificaciones por email y SMS
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Actualizaciones en tiempo real
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Acceso prioritario a ofertas exclusivas
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-auto">Elegir plan</Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4">Plan Empresa</h3>
                    <p className="text-3xl font-bold mb-6">Custom</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Alertas ilimitadas
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Notificaciones por email y SMS
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Actualizaciones en tiempo real
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Acceso prioritario a ofertas exclusivas
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        Soporte dedicado
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-auto">Elegir plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}