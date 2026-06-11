
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deepNavy text-white py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <img 
              src={LOGO_URL} 
              alt="TFG Logo" 
              loading="lazy"
              decoding="async"
              width={224}
              height={56}
              className="h-14 mb-8 object-contain" 
            />
            <p className="text-gray-400 leading-relaxed mb-8">
              Titan Freight Group (TFG) is a premier logistics control and assurance partner, managing end-to-end freight ecosystems across South Africa with absolute accountability.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-logisticsOrange transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-logisticsOrange transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><Link to="/quote" className="hover:text-white transition-colors">Request a Quote</Link></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Specialties</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Road Freight</li>
              <li>Air Freight</li>
              <li>Sea Freight</li>
              <li>Customs Brokerage & Compliance</li>
              <li>Warehousing & Distribution</li>
              <li>AI & Automation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Get In Touch</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-logisticsOrange" />
                <span> 60 Galaxy Ave, Frankenwald, <br />Johannesburg, South Africa, 2090</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="w-6 h-6 text-logisticsOrange" />
                <span>+27 (0) 78 002 3950</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="w-6 h-6 text-logisticsOrange" />
                <span>info@titanfreightgroup.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Titan Freight Group. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
