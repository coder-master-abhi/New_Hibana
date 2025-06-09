
import { useState } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

const Appointment = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
    notes: "",
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
        title: "Appointment request received!",
        description: "We'll contact you soon to confirm your appointment.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        purpose: "",
        notes: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const getMinDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    return threeMonthsLater.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen w-full">
      <div 
        className="relative h-[40vh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610508500445-a4592435e27e?q=80&w=1800&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-hibhana-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hibhana-ivory mb-4 font-playfair">
            Book an Appointment
          </h1>
          <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-playfair">Visit Our Store</h2>
              <p className="text-muted-foreground mb-8">
                Schedule a personalized appointment with our expert stylists for:
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-2 font-playfair">Custom Fittings</h3>
                  <p className="text-muted-foreground">
                    Get the perfect fit for your special occasion outfit with our expert tailors.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-2 font-playfair">Personal Shopping</h3>
                  <p className="text-muted-foreground">
                    Let our stylists help you find pieces that match your style and occasion.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-2 font-playfair">Custom Design</h3>
                  <p className="text-muted-foreground">
                    Create a unique piece tailored to your specifications and preferences.
                  </p>
                </div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6">
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
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm flex items-center">
                    <Calendar size={16} className="mr-2 text-hibhana-gold" />
                    <span>Appointments must be scheduled at least 1 day in advance</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-background rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 font-playfair">Request an Appointment</h2>
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
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block mb-2 text-sm font-medium">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={getMinDate()}
                        max={getMaxDate()}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block mb-2 text-sm font-medium">
                        Preferred Time
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="purpose" className="block mb-2 text-sm font-medium">
                      Purpose of Visit
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                      required
                    >
                      <option value="">Select purpose</option>
                      <option value="Custom Fitting">Custom Fitting</option>
                      <option value="Personal Shopping">Personal Shopping</option>
                      <option value="Custom Design">Custom Design Consultation</option>
                      <option value="Bridal/Groom Consultation">Bridal/Groom Consultation</option>
                      <option value="General Browse">General Browsing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block mb-2 text-sm font-medium">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us more about what you're looking for..."
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-hibhana-gold"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Appointment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-hibhana-black text-hibhana-ivory">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-playfair">Need Immediate Assistance?</h2>
          <p className="mb-8 text-hibhana-ivory/80 max-w-2xl mx-auto">
            If you need to speak with a stylist right away, reach out to us through WhatsApp or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://wa.me/919876543210"
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Contact via WhatsApp
            </a>
            <a 
              href="tel:+919876543210" 
              className="btn-primary"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
      
      <WhatsAppButton />
    </div>
  );
};

export default Appointment;
