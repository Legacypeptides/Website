import React, { useState } from 'react';
import { Mail, Send, CircleCheck as CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle COA request from button
  const handleCOARequest = () => {
    setFormData(prev => ({
      ...prev,
      subject: 'coa-request',
      message: 'I would like to request a Certificate of Analysis for a specific batch. Please provide the COA for batch number: [Please enter your batch number here]'
    }));
    
    // Scroll to the contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Expose the function globally so the COA section can use it
  React.useEffect(() => {
    (window as any).handleCOARequest = handleCOARequest;
    return () => {
      delete (window as any).handleCOARequest;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    globalThis.setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-gold-400">Research?</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team of experts. We're here to help you find the right peptides for your research needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div id="contact-form" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                <h4 className="text-xl font-bold text-green-400 mb-2">Message Sent Successfully!</h4>
                <p className="text-blue-100">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-gold-400 focus:bg-white/30 transition-all duration-200"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-gold-400 focus:bg-white/30 transition-all duration-200"
                      placeholder="john@university.edu"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-gold-400 focus:bg-white/30 transition-all duration-200"
                  >
                    <option value="" className="text-gray-900">Select a subject</option>
                    <option value="product-inquiry" className="text-gray-900">Product Inquiry</option>
                    <option value="bulk-order" className="text-gray-900">Bulk Order</option>
                    <option value="coa-request" className="text-gray-900">COA Request</option>
                    <option value="order-support" className="text-gray-900">Order Support</option>
                    <option value="technical-support" className="text-gray-900">Technical Support</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-gold-400 focus:bg-white/30 transition-all duration-200 resize-none"
                    placeholder="How can we help you today? Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-blue-900 py-4 px-6 rounded-lg font-bold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-gold-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-blue-100">orders@healthylegacypeptides.com</p>
                    <p className="text-blue-200 text-sm">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-400/30 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gold-400 mb-3">Quick Response Guarantee</h4>
              <p className="text-blue-100">
                We understand that research timelines are critical. Our team commits to responding to all inquiries within 24 hours, with most responses sent within 4 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};