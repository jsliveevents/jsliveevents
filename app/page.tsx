"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import {
  MonitorPlay,
  Tv2,
  Radio,
  Drone,
  ShieldCheck,
  Headphones,
  Clock,
  MessageCircle,
  Sparkles,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/Logo"

const services = [
  {
    id: "led-walls",
    name: "LED Walls",
    description: "High-brightness, modular panels.",
    icon: MonitorPlay,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    id: "led-tvs",
    name: "LED TVs",
    description: "55–85\" displays for VIP/FOH.",
    icon: Tv2,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    id: "live-streaming",
    name: "Internet Live Streaming",
    description: "Multi-cam, RTMP/YouTube/Zoom.",
    icon: Radio,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  {
    id: "drone-coverage",
    name: "Drone Coverage",
    description: "Cinematic aerial shots (licensed pilots).",
    icon: Drone,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
]

const addOns = [
  "On-site tech team",
  "Backup internet",
  "Multi-camera switcher",
  "Stage lighting",
]

const trustBadges = [
  { icon: Clock, text: "Same-day Setup" },
  { icon: ShieldCheck, text: "Pan-India Ops" },
  { icon: Headphones, text: "24×7 Support" },
]

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    eventDate: "",
    venue: "",
    city: "",
    audience: "",
    notes: "",
  })
  const [errors, setErrors] = useState<{ name?: boolean; date?: boolean }>({})
  const [showWarning, setShowWarning] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
    setShowWarning(false)
  }

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn)
        ? prev.filter((item) => item !== addOn)
        : [...prev, addOn]
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const buildWhatsAppMessage = () => {
    const serviceNames = selectedServices
      .map((id) => services.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "None"

    const addOnsList =
      selectedAddOns.length > 0 ? selectedAddOns.join(", ") : "None"

    const message = `Hi JS Live Events! I'd like to book the following:
• Services: ${serviceNames}
• Date: ${formData.eventDate ? formatDate(formData.eventDate) : "—"}
• Venue/City: ${formData.venue || "—"}, ${formData.city || "—"}
• Audience: ${formData.audience || "—"}
• Add-ons: ${addOnsList}
• Notes: ${formData.notes || "—"}

My details:
• Name: ${formData.name || "—"}

Please share availability and a quick quote.`

    return message
  }

  const handleSimpleWhatsApp = () => {
    const message = "Hi JS Live Events! I'm interested in your services. Please share more information."
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919912322265?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCall = () => {
    window.location.href = "tel:+919912322265"
  }

  const handleBookWhatsApp = () => {
    // Validate
    const newErrors: { name?: boolean; date?: boolean } = {}
    let hasError = false

    if (!formData.name.trim()) {
      newErrors.name = true
      hasError = true
    }

    if (!formData.eventDate) {
      newErrors.date = true
      hasError = true
    }

    if (selectedServices.length === 0) {
      setShowWarning(true)
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      if (newErrors.name && nameInputRef.current) {
        nameInputRef.current.focus()
        // Shake animation
        const element = nameInputRef.current
        element.style.animation = "none"
        setTimeout(() => {
          element.style.animation = "shake 0.5s"
        }, 10)
      } else if (newErrors.date && dateInputRef.current) {
        dateInputRef.current.focus()
        const element = dateInputRef.current
        element.style.animation = "none"
        setTimeout(() => {
          element.style.animation = "shake 0.5s"
        }, 10)
      }
      return
    }

    setErrors({})
    const message = buildWhatsAppMessage()
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919912322265?text=${encodedMessage}`

    // Show toast
    const toast = document.createElement("div")
    toast.textContent = "Opening WhatsApp with your booking details…"
    toast.className =
      "fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm font-medium"
    document.body.appendChild(toast)
    setTimeout(() => {
      toast.remove()
    }, 3000)

    window.open(whatsappUrl, "_blank")
  }

  const scrollToServices = () => {
    const element = document.getElementById("services")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const heroVariants = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }

  const containerVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }

  const itemVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }

  const selectedCount = selectedServices.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={heroVariants.initial}
            animate={heroVariants.animate}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Logo />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                Premium Event Solutions
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 sm:mb-8 tracking-tight">
              JS Live Events
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
              Feel the vibe, watch it live
            </p>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto">
              LED Walls, LED TVs, Internet Live Streaming, Drone Coverage.
              <br className="hidden sm:block" /> End-to-end event solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleSimpleWhatsApp}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
              <Button
                size="lg"
                onClick={handleCall}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
              <motion.button
                onClick={scrollToServices}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="text-gray-700 hover:text-gray-900 font-semibold text-sm"
              >
                View services ↓
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Rentals Section */}
      <section id="services" className="px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12 text-center">
              Services & Rentals
            </h2>
          </motion.div>
          <AnimatePresence>
            {showWarning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md"
              >
                <p className="text-red-700 font-medium text-center">
                  Select at least one service to continue.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              const isSelected = selectedServices.includes(service.id)
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                >
                  <Card
                    className={cn(
                      "cursor-pointer transition-all duration-300 overflow-hidden border-2",
                      isSelected
                        ? "border-black shadow-xl scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                    )}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <CardContent className="p-6 bg-white relative">
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={
                            isSelected ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }
                          }
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "p-4 rounded-xl shadow-md relative overflow-hidden"
                          )}
                        >
                          {isSelected ? (
                            <div
                              className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-90",
                                service.gradient
                              )}
                            />
                          ) : (
                            <div className={cn("absolute inset-0", service.bgColor)} />
                          )}
                          <div className="relative z-10">
                            <Icon className={cn("h-7 w-7", isSelected ? "text-white" : "text-gray-600")} />
                          </div>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={cn("font-bold text-lg", isSelected ? "text-black" : "text-gray-900")}>
                              {service.name}
                            </h3>
                            <motion.div
                              animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Checkbox
                                checked={isSelected}
                                onChange={() => handleServiceToggle(service.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="h-6 w-6"
                              />
                            </motion.div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Quick Quote Form */}
      <section className="px-4 py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12 text-center">
              Quick Quote
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                ref={nameInputRef}
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={cn(errors.name && "border-red-500 ring-red-500")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Event Date <span className="text-red-500">*</span>
              </label>
              <Input
                ref={dateInputRef}
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
                className={cn(errors.date && "border-red-500 ring-red-500")}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Venue/Location
                </label>
                <Input
                  placeholder="Event venue"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  City
                </label>
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Expected Audience
              </label>
              <Input
                type="number"
                placeholder="Number of attendees"
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Notes
              </label>
              <Textarea
                placeholder="Any additional requirements or details"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Optional Add-ons
              </label>
              <div className="space-y-2">
                {addOns.map((addOn) => (
                  <div key={addOn} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedAddOns.includes(addOn)}
                      onChange={() => handleAddOnToggle(addOn)}
                    />
                    <label className="text-sm text-gray-700 cursor-pointer">
                      {addOn}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </motion.div>
          
          {/* Book Button after Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Button
              size="lg"
              onClick={handleBookWhatsApp}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-6 text-lg font-semibold"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Book on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="px-4 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12"
          >
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-3 bg-white rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {badge.text}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex justify-center">
              <Logo variant="light" />
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Live Production & Equipment Rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30 font-semibold"
                  onClick={handleSimpleWhatsApp}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 font-semibold"
                  onClick={handleCall}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Sticky CTA */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-white to-gray-50 backdrop-blur-lg border-t-2 border-gray-200 shadow-2xl z-50 px-4 py-4 sm:hidden"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {selectedCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold"
                >
                  {selectedCount}
                </motion.div>
              )}
              <span className="text-sm font-semibold text-gray-800">
                {selectedCount > 0
                  ? `${selectedCount} selected`
                  : "Pick services to build your booking."}
              </span>
            </div>
            <Button
              size="sm"
              onClick={handleBookWhatsApp}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom padding for sticky bar */}
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  )
}
