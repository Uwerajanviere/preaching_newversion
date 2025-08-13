"use client";

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">

      {/* Navigation */}
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-16 pt-28 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Send us a message</h2>

              <form action="https://formspree.io/f/mdkgqvaq" method="POST" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-card-foreground">
                      First Name
                    </label>
                    <Input id="first-name" name="firstName" className="bg-input border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-card-foreground">
                      Last Name
                    </label>
                    <Input id="last-name" name="lastName" className="bg-input border-border text-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-card-foreground">
                    Email
                  </label>
                  <Input id="email" type="email" name="email" className="bg-input border-border text-foreground" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-card-foreground">
                    Subject
                  </label>
                  <Input id="subject" name="subject" className="bg-input border-border text-foreground" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-card-foreground">
                    Message
                  </label>
                  <Textarea id="message" rows={5} name="message" className="bg-input border-border text-foreground resize-none" />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Get in touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Our Address</h3>
                    <p className="text-muted-foreground">
                    KN 5 Rd, Plot 12, Remera
                      <br />
                      Gasabo District, Kigali, Rwanda
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Phone</h3>
                    <p className="text-muted-foreground">(250) 788354235
</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Email</h3>
                    <p className="text-muted-foreground"> martin.ntirushwa.martin@gmail.com</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium text-card-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary rounded-full p-2 hover:bg-primary/90 transition"
                    >
                      <Facebook className="h-5 w-5 text-primary-foreground" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary rounded-full p-2 hover:bg-primary/90 transition"
                    >
                      <Instagram className="h-5 w-5 text-primary-foreground" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium text-card-foreground mb-4">Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9am - 5pm
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>

                {/* Prayer Requests */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium text-card-foreground mb-4">Prayer Requests</h3>
                  <p className="text-muted-foreground">
                    We would be honored to pray for you. Please submit
                    your prayer requests through our contact form or email
                    us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
