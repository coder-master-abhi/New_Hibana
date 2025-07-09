
import WhatsAppButton from "../components/WhatsAppButton";

const About = () => {
  return (
    <div className="min-h-screen w-full">
      <div
        className="relative h-[40vh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618403323851-e2ceb9401bb1?q=80&w=1800&auto=format&fit=crop')" }}  // need to change this image
      >
        <div className="absolute inset-0 bg-hibhana-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hibhana-ivory mb-4 font-playfair">
            About Hibhana
          </h1>
          <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-playfair">Our Story</h2>
              <div className="h-1 w-24 bg-hibhana-gold"></div>
              <p className="text-lg">
                Founded in the heart of Mumbai, Hibhana began as a passion project to create garments that celebrate India's rich cultural heritage while embracing contemporary design aesthetics.
              </p>
              <p>
                Our journey started with a simple vision: to craft clothing that honors traditional craftsmanship while catering to the modern individual's sensibilities. Over the years, we have evolved into a premium brand known for our meticulously crafted pieces that stand at the intersection of tradition and modernity.
              </p>
              <p>
                Today, Hibhana is proud to be a destination for those seeking exceptional Indian and Western wear for their special occasions. From weddings and festivities to formal gatherings, our collections reflect our commitment to quality, artistry, and timeless elegance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://plus.unsplash.com/premium_photo-1666299746871-46c49692381d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sbGVjdGlvbnMlMjBvZiUyMG1lbiUyMGNsb3RocyUyMGluJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Hibhana Collection"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4npVJzHQqXfl10K8BwcyN_RQl_U-iTjccsxqekzy9UJ-NbH73JqGSFULoNNIpLziQ2CN_6GkUK8jtN1X75yvLClYNYD1rmQYD5KMaXbaRkGPWBe9kfmerqK-_gMXyo_Jlwliv5PB=s1360-w1360-h1020-rw"
                  alt="Hibhana Collection"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-lg col-span-2">
                <img
                  src="https://plus.unsplash.com/premium_photo-1671469875519-944b48b1520e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sbGVjdGlvbnMlMjBvZiUyMG1lbiUyMGNsb3RocyUyMGluJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Hibhana Collection"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Our Craftsmanship</h2>
            <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="h-16 w-16 bg-hibhana-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-hibhana-gold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-playfair">Premium Materials</h3>
                <p className="text-muted-foreground">
                  We source the finest fabrics and materials from across India and around the world to ensure exceptional quality and comfort.
                </p>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="h-16 w-16 bg-hibhana-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-hibhana-gold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-playfair">Artisanal Techniques</h3>
                <p className="text-muted-foreground">
                  Our garments feature traditional embroidery and handwork techniques passed down through generations, preserving India's artistic heritage.
                </p>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="h-16 w-16 bg-hibhana-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-hibhana-gold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-playfair">Modern Design</h3>
                <p className="text-muted-foreground">
                  We blend traditional craftsmanship with contemporary silhouettes and designs to create pieces that are both timeless and modern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Visit Our Store</h2>
            <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-background p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 font-playfair">Store Location</h3>
                <address className="not-italic text-muted-foreground">
                  <p>Hibhana Couture</p>
                  <p>Hill Road, Bandra West</p>
                  <p>Mumbai, Maharashtra</p>
                  <p>India</p>
                </address>

                <h3 className="text-xl font-bold mt-8 mb-4 font-playfair">Store Hours</h3>
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

                <div className="mt-8">
                  <a href="/appointment" className="btn-primary block text-center">
                    Book an Appointment
                  </a>
                </div>
              </div>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden">
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
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default About;
