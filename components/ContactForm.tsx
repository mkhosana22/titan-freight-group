import React, { useState } from 'react';
import { ShieldCheck, Clock, Headphones, ChevronDown } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyf8zv4J16u5znEUpTBhs9yrWrCSQZlZtc-lwQVAN_oFVINpYQGqFAaLml4zI8m-do6/exec';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    serviceRequired: '',
    contactMessage: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const trustPoints = [
    { 
      title: "Peace of Mind", 
      desc: "Full liability coverage and cargo insurance options on every shipment.", 
      icon: <ShieldCheck className="w-5 h-5" /> 
    },
    { 
      title: "Accountability First", 
      desc: "When problems arise, we solve them. We don't just pass the blame to a carrier.", 
      icon: <Clock className="w-5 h-5" /> 
    },
    { 
      title: "Expert Support", 
      desc: "24/7 coordination support from real logistics professionals, not a chatbot", 
      icon: <Headphones className="w-5 h-5" /> 
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.contactName.trim()) newErrors.contactName = 'Full Name is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone Number is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    if (!formData.contactMessage.trim()) newErrors.contactMessage = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // FormData is the most reliable way to send data to Google Apps Script.
    // It avoids CORS preflight issues that occur with JSON or custom headers.
    const formPayload = new FormData();
    formPayload.append('formType', 'contact');
    formPayload.append('contactName', formData.contactName);
    formPayload.append('contactPhone', formData.contactPhone);
    formPayload.append('contactEmail', formData.contactEmail);
    formPayload.append('serviceRequired', formData.serviceRequired);
    formPayload.append('contactMessage', formData.contactMessage);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script — response will be opaque
        body: formPayload
      });

      // With no-cors we cannot read the response status, so any non-thrown
      // fetch is treated as a success. Errors in the script itself won't be
      // catchable here — verify in your Apps Script execution logs.
      setSubmitStatus('success');
      setFormData({
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        serviceRequired: '',
        contactMessage: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-stretch border border-gray-100 min-h-[750px]">
          
          {/* Left Side: Brand Value Proposition */}
          <div className="lg:w-1/2 bg-navy p-14 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-steelBlue/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-logisticsOrange/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
                Stop managing vendors. <br />
                <span className="text-steelBlue">Start scaling your businesses.</span>
              </h2>
              <p className="text-base text-gray-300/90 mb-10 leading-relaxed max-w-md">
                Every hour spent tracking a shipment is an hour lost on your core business. Let TFG take the weight of logistics assurance off your shoulders.
              </p>
              
              <div className="space-y-8">
                {trustPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-logisticsOrange/20 text-logisticsOrange rounded-xl p-2.5 transition-all duration-300 group-hover:bg-logisticsOrange group-hover:text-white">
                        {React.cloneElement(point.icon as React.ReactElement, { className: "w-5 h-5" })}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{point.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Professional Form */}
          <div className="lg:w-1/2 p-14 lg:p-16 bg-white flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-2">Get in touch with Us</h3>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-logisticsOrange"></span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trusted by growing South African businesses</p>
              </div>
            </div>

            {/* Success / Error banners */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                ✓ Message sent successfully! We'll be in touch shortly.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                ✕ Something went wrong. Please try again or email us directly.
              </div>
            )}
            
            <form id="contactForm" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-navy/60 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className={`w-full bg-gray-50 border ${errors.contactName ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-steelBlue'} p-3.5 rounded-lg focus:bg-white focus:ring-4 outline-none transition-all placeholder:text-gray-300 text-sm`}
                  />
                  {errors.contactName && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.contactName}</p>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-navy/60 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+27 (0) 12 345 6789"
                    className={`w-full bg-gray-50 border ${errors.contactPhone ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-steelBlue'} p-3.5 rounded-lg focus:bg-white focus:ring-4 outline-none transition-all placeholder:text-gray-300 text-sm`}
                  />
                  {errors.contactPhone && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.contactPhone}</p>}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-navy/60 ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="name@company.co.za"
                  className={`w-full bg-gray-50 border ${errors.contactEmail ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-steelBlue'} p-3.5 rounded-lg focus:bg-white focus:ring-4 outline-none transition-all placeholder:text-gray-300 text-sm`}
                />
                {errors.contactEmail && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.contactEmail}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-navy/60 ml-1">Services Required</label>
                <div className="relative">
                  <select 
                    id="serviceRequired"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-steelBlue focus:bg-white focus:ring-4 focus:ring-steelBlue/5 outline-none appearance-none transition-all cursor-pointer text-gray-500 text-sm"
                  >
                    <option value="">Select a Service</option>
                    <option value="Road Freight">Road Freight</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Sea Freight">Sea Freight</option>
                    <option value="Customs Clearing">Customs Clearing</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-navy/60 ml-1">Message</label>
                <textarea 
                  id="contactMessage"
                  name="contactMessage"
                  value={formData.contactMessage}
                  onChange={handleInputChange}
                  rows={6} 
                  placeholder="Tell us about your logistics challenges..."
                  className={`w-full bg-gray-50 border ${errors.contactMessage ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-steelBlue'} p-3.5 rounded-lg focus:bg-white focus:ring-4 outline-none transition-all resize-none placeholder:text-gray-300 text-sm`}
                ></textarea>
                {errors.contactMessage && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.contactMessage}</p>}
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-logisticsOrange hover:bg-orange-600 disabled:opacity-75 disabled:cursor-wait text-white font-bold uppercase tracking-widest py-4 rounded-full text-xs transition-all shadow-lg shadow-logisticsOrange/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : "Let's Get Started"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;