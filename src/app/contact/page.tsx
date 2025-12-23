import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/schema";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Visit El Meson de Pepe in Key West",
  description: "Contact El Meson de Pepe in Mallory Square, Key West. Call us at 305-295-2620 or visit us at 410 Wall Street. Open daily 11 AM - 10 PM.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Contact Us - Visit El Meson de Pepe in Key West",
    description: "Contact El Meson de Pepe in Mallory Square, Key West. Call us at 305-295-2620 or visit us at 410 Wall Street.",
    url: "https://www.elmesondepepe.com/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Contact Us", url: "/contact" },
            ]} />
            <div className="bg-white min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary font-serif mb-4">Contact Us</h1>
                    <p className="text-gray-600 text-lg">Get in touch or visit us in Mallory Square</p>
                    <div className="h-1 w-24 bg-secondary mx-auto mt-6" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Info */}
                    <div className="space-y-8 bg-gray-50 p-8 rounded-xl border border-gray-200">
                        <div className="flex items-start space-x-4">
                            <MapPin className="text-primary mt-1 w-6 h-6" aria-hidden="true" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Location</h2>
                                <address className="text-gray-600 not-italic">410 Wall Street<br />Key West, FL 33040</address>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Phone className="text-primary w-6 h-6" aria-hidden="true" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Phone</h2>
                                <p className="text-gray-600">305-295-2620</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Mail className="text-primary w-6 h-6" aria-hidden="true" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Email</h2>
                                <p className="text-gray-600">info@elmesondepepe.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Clock className="text-primary mt-1 w-6 h-6" aria-hidden="true" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Hours</h2>
                                <p className="text-gray-600">Open Daily 11:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <ContactForm />

                </div>
            </div>
        </div>
        </>
    );
}
