"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black/95 border-white/10 p-0">
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10 flex justify-end">
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <nav className="flex flex-col p-4 gap-4">
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-white text-lg py-2 hover:text-white/80 transition" onClick={handleClose}>
                About
              </Link>
              <Link href="/contact" className="text-white text-lg py-2 hover:text-white/80 transition" onClick={handleClose}>
                Contact
              </Link>
              <Link href="/#latest-sermons" className="text-white text-lg py-2 hover:text-white/80 transition" onClick={handleClose}>
                Latest Sermons
              </Link>
            </div>
          </nav>
          <div className="mt-auto p-4 flex flex-col gap-4">
            <Link href="/#latest-sermons" onClick={handleClose}>
              <Button className="w-full bg-amber-400 text-black hover:bg-amber-500">Watch Now</Button>
            </Link>
            <form action="https://www.paypal.com/donate" method="post" target="_top" className="w-full">
              <input type="hidden" name="hosted_button_id" value="Z4UPJDXNDFCQJ" />
              <Button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-black"
              >
                Give Now
              </Button>
              <Image 
                src="https://www.paypal.com/en_RW/i/scr/pixel.gif" 
                alt="" 
                width={1} 
                height={1} 
              />
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
