import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  Box, 
  Clock, 
  Send, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Clock3, 
  Phone,
  Users,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOGO_DARK_URL } from '../constants';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyf8zv4J16u5znEUpTBhs9yrWrCSQZlZtc-lwQVAN_oFVINpYQGqFAaLml4zI8m-do6/exec';

const QuotePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    quoteName: '',
    companyName: '',
    quotePhone: '',
    quoteEmail: '',
    contactMethod: '',
    shipRegularly: false,
    shipmentType: '',
    pickupLocation: '',
    deliveryLocation: '',
    pickupDate: '',
    deliveryDeadline: '',
    servicePriority: 'Standard',
    goodsType: '',
    weightKg: '',
    dimensions: '',
    totalPackages: '',
    specialRequirements: '',
    tracking: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: 'Your Details', description: 'Tell us about you' },
    { id: 2, title: 'Shipment Details', description: 'Tell us about your shipment' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.quoteName.trim()) newErrors.quoteName = 'Full Name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!formData.quotePhone.trim()) newErrors.quotePhone = 'Phone Number is required';
    if (!formData.quoteEmail.trim()) {
      newErrors.quoteEmail = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.quoteEmail)) {
      newErrors.quoteEmail = 'Please introduce a valid email address';
    }
    if (!formData.contactMethod) newErrors.contactMethod = 'Please select a contact method';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.shipmentType) newErrors.shipmentType = 'Shipment Type is required';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup Location is required';
    if (!formData.deliveryLocation.trim()) newErrors.deliveryLocation = 'Delivery Location is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup Date is required';
    if (!formData.goodsType.trim()) newErrors.goodsType = 'Type of Goods is required';
    if (!formData.weightKg.trim()) newErrors.weightKg = 'Weight is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 2) return;
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Send as FormData with no-cors to avoid CORS preflight issues with Google Apps Script
    const payload = new FormData();
    payload.append('formType', 'quote');                                          // routes to Quotes tab in Apps Script
    payload.append('quoteName', formData.quoteName);
    payload.append('companyName', formData.companyName);
    payload.append('quotePhone', formData.quotePhone);
    payload.append('quoteEmail', formData.quoteEmail);
    payload.append('contactMethod', formData.contactMethod);
    payload.append('shipRegularly', formData.shipRegularly ? 'Yes' : 'No');
    payload.append('shipmentType', formData.shipmentType);
    payload.append('pickupLocation', formData.pickupLocation);
    payload.append('deliveryLocation', formData.deliveryLocation);
    payload.append('pickupDate', formData.pickupDate);
    payload.append('deliveryDeadline', formData.deliveryDeadline);
    payload.append('servicePriority', formData.servicePriority);
    payload.append('goodsType', formData.goodsType);
    payload.append('weightKg', formData.weightKg);
    payload.append('dimensions', formData.dimensions);
    payload.append('totalPackages', formData.totalPackages);
    payload.append('specialRequirements', formData.specialRequirements);
    payload.append('tracking', formData.tracking);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload
      });

      setSubmitStatus('success');
      setFormData({
        quoteName: '',
        companyName: '',
        quotePhone: '',
        quoteEmail: '',
        contactMethod: '',
        shipRegularly: false,
        shipmentType: '',
        pickupLocation: '',
        deliveryLocation: '',
        pickupDate: '',
        deliveryDeadline: '',
        servicePriority: 'Standard',
        goodsType: '',
        weightKg: '',
        dimensions: '',
        totalPackages: '',
        specialRequirements: '',
        tracking: ''
      });
      setErrors({});
      setStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Quote submission failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      {/* Header */}
      <header className="bg-navy text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src={LOGO_DARK_URL} 
              alt="TFG Logo" 
              className="h-10 md:h-12 invert brightness-0" 
              loading="eager"
              decoding="async"
              width={224}
              height={56}
            />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-logisticsOrange transition-colors">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-navy text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-navy">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format,compress&fm=webp&w=1600&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1600}
            height={900}
          />
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Request a Quote</h1>
          <p className="text-xl text-gray-300 font-medium">Fast. Reliable. Transparent Freight Solutions.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl -mt-16 relative z-20">
        {/* Progress Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex justify-center items-center">
          <div className="flex items-center gap-4 md:gap-12 w-full max-w-2xl">
            {steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s.id ? 'bg-navy text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {s.id}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-bold uppercase tracking-wider ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>
                      {s.title}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">{s.description}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-grow h-[2px] bg-gray-100 relative">
                    <div className="absolute inset-0 bg-navy transition-all duration-500" style={{ width: step > 1 ? '100%' : '0%' }}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Success / Error banners */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-5 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-sm">
            ✓ Quote request submitted! One of our logistics specialists will contact you shortly.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-8 p-5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium text-sm">
            ✕ Submission failed. Please try again or contact us directly via WhatsApp.
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Content */}
          <div className="lg:col-span-2 space-y-8">
            <form id="quoteForm" onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ willChange: 'transform, opacity' }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
                >
                  <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-6">
                    <User className="text-logisticsOrange" size={24} />
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">1. Contact Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        id="quoteName"
                        name="quoteName"
                        value={formData.quoteName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name" 
                        className={`w-full bg-gray-50 border ${errors.quoteName ? 'border-red-500' : 'border-gray-200'} p-3.5 rounded-lg focus:border-logisticsOrange focus:ring-4 focus:ring-orange-50 outline-none transition-all placeholder:text-gray-400 font-medium`} 
                      />
                      {errors.quoteName && <p className="text-xs text-red-500 font-bold">{errors.quoteName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Company Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Enter your company name" 
                        className={`w-full bg-gray-50 border ${errors.companyName ? 'border-red-500' : 'border-gray-200'} p-3.5 rounded-lg focus:border-logisticsOrange focus:ring-4 focus:ring-orange-50 outline-none transition-all placeholder:text-gray-400 font-medium`} 
                      />
                      {errors.companyName && <p className="text-xs text-red-500 font-bold">{errors.companyName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        id="quotePhone"
                        name="quotePhone"
                        value={formData.quotePhone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number" 
                        className={`w-full bg-gray-50 border ${errors.quotePhone ? 'border-red-500' : 'border-gray-200'} p-3.5 rounded-lg focus:border-logisticsOrange focus:ring-4 focus:ring-orange-50 outline-none transition-all placeholder:text-gray-400 font-medium`} 
                      />
                      {errors.quotePhone && <p className="text-xs text-red-500 font-bold">{errors.quotePhone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        id="quoteEmail"
                        name="quoteEmail"
                        value={formData.quoteEmail}
                        onChange={handleInputChange}
                        placeholder="Enter email address" 
                        className={`w-full bg-gray-50 border ${errors.quoteEmail ? 'border-red-500' : 'border-gray-200'} p-3.5 rounded-lg focus:border-logisticsOrange focus:ring-4 focus:ring-orange-50 outline-none transition-all placeholder:text-gray-400 font-medium`} 
                      />
                      {errors.quoteEmail && <p className="text-xs text-red-500 font-bold">{errors.quoteEmail}</p>}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <label className="text-sm font-bold text-gray-700 block">How would you prefer we contact you? <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-6">
                      {['Phone', 'Email', 'WhatsApp'].map((method) => (
                        <label key={method} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="radio" 
                              name="contactMethod" 
                              value={method}
                              checked={formData.contactMethod === method}
                              onChange={handleInputChange}
                              className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-full checked:border-logisticsOrange transition-all" 
                            />
                            <div className="w-2.5 h-2.5 bg-logisticsOrange rounded-full absolute opacity-0 peer-checked:opacity-100 transition-all"></div>
                          </div>
                          <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-wider">{method}</span>
                        </label>
                      ))}
                    </div>
                    {errors.contactMethod && <p className="text-xs text-red-500 font-bold">{errors.contactMethod}</p>}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50">
                    <label className="flex items-start gap-4 cursor-pointer group p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox" 
                        name="shipRegularly"
                        checked={formData.shipRegularly}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 rounded border-gray-200 text-logisticsOrange focus:ring-logisticsOrange" 
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">Yes, I ship regularly</p>
                        <p className="text-xs text-gray-500 font-medium mt-1">Select if you requires consistent logistics services.</p>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ willChange: 'transform, opacity' }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
                  >
                    <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="text-logisticsOrange" size={24} />
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">2. Shipment Information</h2>
                      </div>
                      <button type="button" onClick={prevStep} className="text-logisticsOrange text-xs font-bold uppercase tracking-wider hover:underline">Edit Step 1</button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Shipment Type <span className="text-red-500">*</span></label>
                        <select 
                          id="shipmentType"
                          name="shipmentType"
                          value={formData.shipmentType}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium appearance-none"
                        >
                          <option value="">Select shipment type</option>
                          <option value="Road Freight">Road Freight</option>
                          <option value="Air Freight">Air Freight</option>
                          <option value="Sea Freight">Sea Freight</option>
                        </select>
                        {errors.shipmentType && <p className="text-xs text-red-500 font-bold">{errors.shipmentType}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Pickup Location <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="pickupLocation"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleInputChange}
                          placeholder="City or area" 
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium" 
                        />
                        {errors.pickupLocation && <p className="text-xs text-red-500 font-bold">{errors.pickupLocation}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Delivery Location <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="deliveryLocation"
                          name="deliveryLocation"
                          value={formData.deliveryLocation}
                          onChange={handleInputChange}
                          placeholder="City or area" 
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium" 
                        />
                        {errors.deliveryLocation && <p className="text-xs text-red-500 font-bold">{errors.deliveryLocation}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Pickup Date <span className="text-red-500">*</span></label>
                        <input 
                          type="date" 
                          id="pickupDate"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium text-gray-400" 
                        />
                        {errors.pickupDate && <p className="text-xs text-red-500 font-bold">{errors.pickupDate}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Delivery Deadline</label>
                        <input 
                          type="date" 
                          id="deliveryDeadline"
                          name="deliveryDeadline"
                          value={formData.deliveryDeadline}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium text-gray-400" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Service Priority</label>
                        <select 
                          id="servicePriority"
                          name="servicePriority"
                          value={formData.servicePriority}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium appearance-none"
                        >
                          <option value="Standard">Standard</option>
                          <option value="Expedited">Expedited</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ willChange: 'transform, opacity' }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
                  >
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-6">
                      <Box className="text-logisticsOrange" size={24} />
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight">3. Cargo Details</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Type of Goods <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="goodsType"
                          name="goodsType"
                          value={formData.goodsType}
                          onChange={handleInputChange}
                          placeholder="e.g. Electronics, Furniture" 
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium" 
                        />
                        {errors.goodsType && <p className="text-xs text-red-500 font-bold">{errors.goodsType}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Weight (kg) <span className="text-red-500">*</span></label>
                        <input 
                          type="number" 
                          id="weightKg"
                          name="weightKg"
                          value={formData.weightKg}
                          onChange={handleInputChange}
                          placeholder="Enter weight in kg" 
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium" 
                        />
                        {errors.weightKg && <p className="text-xs text-red-500 font-bold">{errors.weightKg}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Dimensions (L x W x H) (cm)</label>
                        <input 
                          type="text" 
                          id="dimensions"
                          name="dimensions"
                          value={formData.dimensions}
                          onChange={handleInputChange}
                          placeholder="e.g. 120 x 80 x 100" 
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Total Pieces / Packages</label>
                        <input 
                          type="number" 
                          id="totalPackages"
                          name="totalPackages"
                          value={formData.totalPackages}
                          onChange={handleInputChange}
                          placeholder="Number of packages" 
                          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium" 
                        />
                      </div>
                    </div>

                    <div className="mt-8 space-y-2">
                      <label className="text-sm font-bold text-gray-700 block">Special Requirements</label>
                      <textarea 
                        id="specialRequirements"
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        rows={4} 
                        placeholder="Fragile, Refrigerated, Hazardous, etc." 
                        className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg focus:border-logisticsOrange outline-none font-medium resize-none shadow-sm"
                      ></textarea>
                    </div>

                    <div className="mt-8 space-y-4">
                      <label className="text-sm font-bold text-gray-700 block uppercase tracking-widest">Do you need real-time tracking?</label>
                      <div className="flex gap-8">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 cursor-pointer">
                            <div className="relative flex items-center justify-center">
                              <input 
                                type="radio" 
                                name="tracking" 
                                value={opt}
                                checked={formData.tracking === opt}
                                onChange={handleInputChange}
                                className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-full checked:border-logisticsOrange transition-all" 
                              />
                              <div className="w-2.5 h-2.5 bg-logisticsOrange rounded-full absolute opacity-0 peer-checked:opacity-100 transition-all"></div>
                            </div>
                            <span className="text-sm font-bold text-gray-600">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
                <div className="flex items-center gap-3 text-gray-400 group">
                  <ShieldCheck className="group-hover:text-logisticsOrange transition-colors" size={20} />
                  <p className="text-xs font-medium leading-relaxed">
                    Your information is secure and <br /> will never be shared.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {step === 1 ? (
                    <button 
                      type="button"
                      onClick={nextStep}
                      className="bg-[#F37021] text-white px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 group w-full"
                    >
                      Next: Shipment Details
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <>
                      <button 
                        type="button" 
                        onClick={prevStep}
                        disabled={isSubmitting}
                        className="bg-white border-2 border-gray-100 text-gray-600 px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:border-gray-200 hover:bg-gray-50 transition-all disabled:opacity-50"
                      >
                        Previous Step
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-logisticsOrange text-white disabled:opacity-75 disabled:cursor-wait px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 group"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>

            <div className="text-center pt-8">
              <p className="text-xs text-gray-400 font-medium">
                By submitting this form, you agree to our <Link to="/privacy" className="text-logisticsOrange hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-logisticsOrange mb-6">
                <Send size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get a Fast, Free Quote</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">No obligations. Just fast, accurate pricing.</p>

              <div className="space-y-8">
                {[
                  { icon: Clock3, title: 'Quick Response', desc: "We'll get back to you within 15 minutes." },
                  { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Your cargo is safe with us.' },
                  { icon: Truck, title: 'Real-time Tracking', desc: 'Full visibility from pickup to delivery.' },
                  { icon: Users, title: 'Trusted by Businesses', desc: 'Proudly delivering across South Africa.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-logisticsOrange transition-all flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-logisticsOrange transition-colors">{item.title}</h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center bg-gradient-to-br from-white to-orange-50">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-logisticsOrange px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <CheckCircle2 size={12} />
                Or request via WhatsApp
              </div>
              <p className="text-xs text-gray-500 font-medium mb-6">Get a quote even faster</p>
              <button 
                className="w-full bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-100 hover:bg-[#22c35e] transition-all transform hover:-translate-y-1"
              >
                <div className="bg-white/20 p-1.5 rounded-lg border border-white/20">
                  <Phone size={18} fill="currentColor" className="text-white" />
                </div>
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;