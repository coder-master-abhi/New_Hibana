
import { useState } from "react";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full">
      <div 
        className="relative h-[40vh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599288683058-a4d0f2ba2c85?q=80&w=1800&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-hibhana-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hibhana-ivory mb-4 font-playfair">
            Contact Us
          </h1>
          <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-playfair">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                We'd love to hear from you. Contact us for inquiries about our collections, 
                custom design services, or to schedule an appointment.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 text-hibhana-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Visit Our Store</h3>
                    <address className="not-italic text-muted-foreground">
                      Hibhana Couture<br />
                      7, Boran Rd, opp. ELCO Arcade, Santosh Nagar, Hill road<br />
                       Bandra West, Mumbai, Maharashtra 400050
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 text-hibhana-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <a href="tel:+919819220622" className="text-muted-foreground hover:text-hibhana-gold">
                      +91 98192 20622
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 text-hibhana-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <a href="mailto:contact@hibhana.com" className="text-muted-foreground hover:text-hibhana-gold">
                      contact@hibhana.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Instagram className="mr-4 text-hibhana-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Follow Us</h3>
                    <a 
                      href="https://www.instagram.com/hibhana_/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-hibhana-gold"
                    >
                      @hibhana_
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 font-playfair">Store Hours</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>11:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>11:00 AM - 7:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-background rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 font-playfair">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 font-playfair">Visit Our Store</h2>
            <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
          </div>
          
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.193681441284!2d72.82232561490055!3d19.05534368709772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c3b4c05b15%3A0x2e83279560a0c4b6!2sHill%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650385124669!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Hibhana Store Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
