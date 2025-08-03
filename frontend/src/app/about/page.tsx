import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-medium text-slate-900 mb-8 tracking-wide">
          About Modern Home
        </h1>

        {/* Company Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-slate-900 mb-4">Our Story</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              Founded in 2020, Modern Home began as a simple idea: to make beautiful, 
              functional home goods accessible to everyone. We believe that great design 
              shouldn't be reserved for the few, but should enhance the everyday lives 
              of many.
            </p>
            <p>
              What started in a small workshop has grown into a curated collection of 
              timeless pieces, each carefully selected for its quality, functionality, 
              and aesthetic appeal. We work directly with artisans and manufacturers 
              who share our commitment to craftsmanship and sustainability.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-600">
            To transform houses into homes through thoughtfully designed, sustainably 
            crafted furniture and decor that combines form, function, and affordability. 
            We believe everyone deserves to live beautifully.
          </p>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-slate-900 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Quality First</h3>
              <p className="text-sm text-slate-600">
                Every piece is built to last, using premium materials and time-tested 
                construction methods.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Sustainable Design</h3>
              <p className="text-sm text-slate-600">
                We prioritize eco-friendly materials and partner with suppliers who 
                share our environmental commitments.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Accessible Beauty</h3>
              <p className="text-sm text-slate-600">
                Great design should be attainable. We keep our margins fair and our 
                prices transparent.
              </p>
            </div>
          </div>
        </section>

        {/* Materials & Craftsmanship */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-slate-900 mb-4">
            Materials & Craftsmanship
          </h2>
          <div className="space-y-4 text-slate-600">
            <p>
              We source our materials responsibly, working with suppliers who meet our 
              high standards for quality and sustainability. From FSC-certified woods 
              to recycled metals and organic fabrics, every material is chosen with 
              care.
            </p>
            <p>
              Our products are crafted by skilled artisans who take pride in their work. 
              Whether it's a hand-finished oak bench or a thrown ceramic vase, each piece 
              reflects the human touch that makes it special.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-200 pt-12 text-center">
          <h2 className="text-2xl font-medium text-slate-900 mb-4">
            Start Your Journey
          </h2>
          <p className="text-slate-600 mb-6">
            Discover pieces that will transform your space and stand the test of time.
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-2xl">
              Browse Our Collection
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}